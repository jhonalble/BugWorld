// Enum for the different instruction types
// //export 
 
const InstructionType = {
    SENSE: 'sense',
    MARK: 'mark',
    UNMARK: 'unmark',
    PICKUP: 'pickup',
    DROP: 'drop',
    TURN: 'turn',
    MOVE: 'move',
    FLIP: 'flip',
    DIRECTION: 'direction',
    STOCK: 'stock'
};

// Enum for the different sense conditions
// //export 
 
const SenseCondition = {
    FRIEND: 'friend',
    FOE: 'foe',
    FRIEND_WITH_FOOD: 'friendwithfood',
    FOE_WITH_FOOD: 'foewithfood',
    FOOD: 'food',
    ROCK: 'rock',
    MARKER: 'marker',
    FOE_MARKER: 'foemarker',
    HOME: 'home',
    FOE_HOME: 'foehome'
};

// //export 
 
const SenseDirection = {
    HERE: 'here',
    LEFT_AHEAD: 'leftahead',
    RIGHT_AHEAD: 'rightahead',
    AHEAD: 'ahead'
};

// //export 
 
const TurnDirection = {
    LEFT: 'left',
    RIGHT: 'right'
}

// Base class for all instructions
// //export 
 
class Instruction {
    constructor(type) {
        this.type = type;
    }

    // Executes the instruction and returns the next instruction to execute
    execute(bug, world) {
        // This is the base implementation that every instruction should override
        return null;
    }
}

// //export 
 
class SenseInstruction extends Instruction {
    constructor(direction, s1, s2, cond) {
        super(InstructionType.SENSE);
        this.sensedir = direction;
        this.s1 = s1;
        this.s2 = s2;
        this.cond = cond;
    }

    equals(other) {
        return other instanceof SenseInstruction &&
            this.sensedir === other.sensedir &&
            this.s1 === other.s1 &&
            this.s2 === other.s2 &&
            this.cond === other.cond;
    }

    // Executes the sense instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        let sensedCell;
        switch (this.sensedir) {
            case SenseDirection.HERE:
                sensedCell = position;
                break;
            case SenseDirection.AHEAD:
                sensedCell = world.sensedCell(position, bug.direction, 0);
                break;
            case SenseDirection.LEFT_AHEAD:
                sensedCell = world.sensedCell(position, bug.direction, -1);
                break;
            case SenseDirection.RIGHT_AHEAD:
                sensedCell = world.sensedCell(position, bug.direction, 1);
                break;
        }
        if (sensedCell && this.cond(sensedCell, bug.color)) {
            return this.s1;
        } else {
            return this.s2;
        }
    }
}

// //export 
 
class MarkInstruction extends Instruction {
    constructor(m, s) {
        super(InstructionType.MARK);
        this.m = m;
        this.s = s;
    }

    equals(other) {
        return other instanceof MarkInstruction &&
            this.m === other.m &&
            this.s === other.s;
    }

    // Executes the mark instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        world.setMarkerAt(position, bug.color, this.m);
        return this.s;
    }
}

// //export 
 
class UnmarkInstruction extends Instruction {
    constructor(m, s) {
        super(InstructionType.UNMARK);
        this.m = m;
        this.s = s;
    }

    equals(other) {
        return other instanceof UnmarkInstruction &&
            this.m === other.m &&
            this.s === other.s;
    }

    // Executes the unmark instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        world.clearMarkerAt(position, bug.color, this.m);
        return this.s;
    }
}

//export 
 class PickupInstruction extends Instruction {
    constructor(s1, s2) {
        super(InstructionType.PICKUP);
        this.s1 = s1;
        this.s2 = s2;
    }

    equals(other) {
        return other instanceof PickupInstruction &&
            this.s1 === other.s1 &&
            this.s2 === other.s2;
    }

    // Executes the pickup instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        if (world.getFoodAt(position) > 0 && !bug.hasFood) {
            bug.hasFood = true;
            world.setFoodAt(position, world.getFoodAt(position) - 1);
            return this.s1;
        } else {
            return this.s2;
        }
    }
}

//export 
 class DropInstruction extends Instruction {
    constructor(s) {
        super(InstructionType.DROP);
        this.s = s;
    }

    equals(other) {
        return other instanceof DropInstruction &&
            this.s === other.s;
    }

    // Executes the drop instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        if (bug.hasFood) {
            bug.hasFood = false;
            world.setFoodAt(position, world.getFoodAt(position) + 1);
        }
        return this.s;
    }
}

//export 
 class TurnInstruction extends Instruction {
    constructor(lr, s) {
        super(InstructionType.TURN);
        this.lr = lr;
        this.s = s;
    }

    equals(other) {
        return other instanceof TurnInstruction &&
            this.lr === other.lr &&
            this.s === other.s;
    }

    // Executes the turn instruction and returns the next instruction to execute
    execute(bug, world) {
        bug.direction = world.turn(bug.direction, this.lr === 'left' ? -1 : 1);
        return this.s;
    }
}

//export 
 class MoveInstruction extends Instruction {
    constructor(s1, s2) {
        super(InstructionType.MOVE);
        this.s1 = s1;
        this.s2 = s2;
    }

    equals(other) {
        return other instanceof MoveInstruction &&
            this.s1 === other.s1 &&
            this.s2 === other.s2;
    }

    // Executes the move instruction and returns the next instruction to execute
    execute(bug, world) {
        const position = world.getBugPosition(bug);
        const nextCell = world.adjacent(position, bug.direction);
        if (nextCell && !nextCell.isObstructed()) {
            world.setBugAt(nextCell, bug);  // This removes the bug if there was one at this cell.
            world.setBugAt(position, null);
            return this.s1;
        } else {
            return this.s2;
        }
    }
}

//export 
 class FlipInstruction extends Instruction {
    constructor(p, s1, s2) {
        super(InstructionType.FLIP);
        this.p = p;
        this.s1 = s1;
        this.s2 = s2;
    }

    equals(other) {
        return other instanceof FlipInstruction &&
            this.p === other.p &&
            this.s1 === other.s1 &&
            this.s2 === other.s2;
    }

    // Executes the flip instruction and returns the next instruction to execute
    execute(bug, world) {
        if (Math.floor(Math.random() * this.p) === 0) {
            return this.s1;
        } else {
            return this.s2;
        }
    }
}

//export 
 class DirectionInstruction extends Instruction {
    constructor(d, s1, s2) {
        super(InstructionType.DIRECTION);
        this.d = d;
        this.s1 = s1;
        this.s2 = s2;
    }

    equals(other) {
        return other instanceof DirectionInstruction &&
            this.d === other.d &&
            this.s1 === other.s1 &&
            this.s2 === other.s2;
    }

    // Executes the direction instruction and returns the next instruction to execute
    execute(bug, world) {
        if (bug.direction === this.d) {
            return this.s1;
        } else {
            return this.s2;
        }
    }
}

// export
class StockInstruction extends Instruction {
    constructor(s) {
        super(InstructionType.STOCK);
        this.s = s;
    }

    equals(other) {
        return other.s === this.s;
    }

    execute(bug, world) {
        return this.s;
    }
}