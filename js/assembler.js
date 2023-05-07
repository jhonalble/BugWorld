// import {
//     DirectionInstruction,
//     DropInstruction, FlipInstruction,
//     InstructionType,
//     MarkInstruction, MoveInstruction,
//     PickupInstruction, SenseCondition,
//     SenseInstruction, TurnInstruction,
//     UnmarkInstruction
// } from "./instructions.js";

// Parses a single line of assembler code and returns the corresponding instruction
function parseInstruction(tokens, labels) {
    const type = tokens[0];
    switch (type) {
        case InstructionType.SENSE:
            return new SenseInstruction(tokens[1], labels[tokens[2]],
                labels[tokens[3]], parseSenseCondition(tokens[4]));
        case InstructionType.MARK:
            return new MarkInstruction(parseInt(tokens[1]), labels[tokens[2]]);
        case InstructionType.UNMARK:
            return new UnmarkInstruction(parseInt(tokens[1]), labels[tokens[2]]);
        case InstructionType.PICKUP:
            return new PickupInstruction(labels[tokens[1]], labels[tokens[2]]);
        case InstructionType.DROP:
            return new DropInstruction(labels[tokens[1]]);
        case InstructionType.TURN:
            return new TurnInstruction(tokens[1], labels[tokens[2]]);
        case InstructionType.MOVE:
            return new MoveInstruction(labels[tokens[1]], labels[tokens[2]]);
        case InstructionType.FLIP:
            return new FlipInstruction(parseInt(tokens[1]), labels[tokens[2]], labels[tokens[3]]);
        case InstructionType.DIRECTION:
            return new DirectionInstruction(parseInt(tokens[1]), labels[tokens[2]], labels[tokens[3]]);
        default:
            throw new Error(`Unknown instruction type: ${type}`);
    }
}

// Parses a sense condition from a list of tokens
function parseSenseCondition(token) {
    switch (token) {
        case SenseCondition.FRIEND:
            return (cell, color) => cell.bug && cell.bug.color === color;
        case SenseCondition.FOE:
            return (cell, color) => cell.bug && cell.bug.color !== color;
        case SenseCondition.FRIEND_WITH_FOOD:
            return (cell, color) => cell.bug && cell.bug.color === color && cell.bug.hasFood;
        case SenseCondition.FOE_WITH_FOOD:
            return (cell, color) => cell.bug && cell.bug.color !== color && cell.bug.hasFood;
        case SenseCondition.FOOD:
            return (cell, _) => cell.hasFood();
        case SenseCondition.ROCK:
            return (cell, _) => cell.isObstructed();
        case SenseCondition.FOE_MARKER:
            return (cell, color) => cell.checkOtherMarkerAt(color);
        case SenseCondition.HOME:
            return (cell, color) => cell.isFriendlyBase(color);
        case SenseCondition.FOE_HOME:
            return (cell, color) => cell.isEnemyBase(color);
        default:
            throw new Error(`Unknown sense condition: ${tokens[0]}`);
    }
}

function splitToTokens(source) {
    // simple token -- token that can contain ":" inside
    let simpleTokens = source.toLowerCase().replaceAll(/;[^\n\r]*\n/g, "").split(/\s+/);
    let ans = [];
    for (const simpleToken of simpleTokens) {
        if (simpleToken.includes(":")) {
            simpleToken.split(/(:)/g)
                .forEach(value => ans.push(value));
        } else {
            ans.push(simpleToken);
        }
    }
    return ans.filter((token) => token.length > 0);
}

const keywords = {
    "sense": 5,
    "mark": 3,
    "unmark": 3,
    "pickup": 3,
    "drop": 2,
    "turn": 3,
    "move": 3,
    "flip": 4,
    "direction": 4,
    ":": -1
};


// Assembles the given source code and returns the instructions
//export
function assemble(source) {
    const tokens = splitToTokens(source);
    // First pass: assign addresses to labels
    const labels = {};
    let address = 0;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        if (i + 1 < tokens.length && tokens[i + 1] === ":") {
            if (token in labels) {
                throw new Error(`Duplicate label: ${token}`);
            }
            if (token in keywords) {
                throw new Error(`Keyword can't be a label: ${token}`);
            }
            if (!/(([A-Za-z])+|([0-9])+)/.test(token)) {
                throw new Error(`Wrong label name: ${token}`);
            }
            labels[token] = address++;
        }
    }
    // Second pass: translate instructions to objects
    const instructions = [];
    while (tokens.length > 0) {
        let token = tokens[0];
        if (token in labels) {
            // Skip label
            tokens.shift();
            tokens.shift();
            instructions.push(new StockInstruction(labels[token]))
        } else if (token in keywords) {
            // how many tokens in current bug operation
            let opSize = keywords[token];
            if (opSize > 0) {
                instructions[instructions.length - 1] = parseInstruction(tokens, labels);
                for (let i = 0; i < opSize; i++) {
                    // we processed these tokens
                    tokens.shift();
                }
            } else {
                throw new Error(`Wrong operation name: ${token}`);
            }
        }
    }

    return instructions;
}
