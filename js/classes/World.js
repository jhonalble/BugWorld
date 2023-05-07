//import {Color} from "./Color.js";
//import {Position} from "./Position.js";
//import {WorldCell} from "./WorldCell.js";

class World {
    constructor(width, height, map) {
        this.width = width;
        this.height = height;
        this.map = map;
    }

    cellAt(position) {
        // Return the cell at position
        return this.map[position.x][position.y]
    }

    adjacent(position, direction) {
        // return the adjacent cell in the given absolute direction from the given position
        let dx;
        if (position.x % 2 === 1) {
            dx = [1, 1, 0, -1, 0, 1][direction];
        } else {
            dx = [1, 0, -1, -1, -1, 0][direction];
        }
        const dy = [0, 1, 1, 0, -1, -1][direction];
        const x = position.x + dx;
        const y = position.y + dy;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null; // out of bounds
        } else {
            return this.map[x][y]
        }
    }

    turn(direction, turn) {
        // Return the absolute direction after turning left or right from the given direction
        return (direction + turn + 6) % 6;
    }

    sensedCell(position, absolute_direction, direction) {
        // Determines the target position from position p and relative heading dir
        return this.adjacent(position, this.turn(absolute_direction, direction))
    }

    isObstructedAt(position) {
        // Return true if the cell at the given position is obstructed, false otherwise
        return this.cellAt(position).isObstructed();
    }

    isOccupiedAt(position) {
        // return true if the cell at the given position is occupied by a bug, false otherwise
        return this.cellAt(position).isOccupied();
    }

    setBugAt(position, bug) {
        // place the given bug at the given position in the world
        const cell = this.cellAt(position);
        if (!cell.isObstructed()) {
            bug.direction = Direction.EAST;
            this.cellAt(position).bug = bug;
        }
    }

    getBugAt(position) {
        // return the bug occupying the cell at the given position, or null if the cell is empty
        const cell = this.cellAt(position);
        return cell.bug;
    }

    getBugPosition(bug) {
        // Return the position of the bug in the world, or null if the bug is not found.
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.map[x][y].bug === bug) {
                    return new Position(x, y);
                }
            }
        }
        // Bug not found.
        return null;
    }

    setFoodAt(position, food_count) {
        // set the amount of food in the cell at the given position to the given count
        this.cellAt(position).food = food_count;
    }

    getFoodAt(position) {
        // return the amount of food in the cell at the given position
        return this.cellAt(position).food;
    }

    isFriendlyBaseAt(position, color) {
        // return true if the cell at the given position is a friendly base of the given color, false otherwise
        return this.cellAt(position).isFriendlyBase(color);
    }

    isEnemyBaseAt(position, color) {
        // return true if the cell at the given position is an enemy base of the given color, false otherwise
        return this.cellAt(position).isEnemyBase(color);
    }

    setMarkerAt(position, color, markerIndex) {
        // set the marker at the given position and index to the given color
        this.cellAt(position).marker.setMarker(color, markerIndex);
    }

    clearMarkerAt(position, color, markerIndex) {
        // clear the marker at the given position and index for the given color
        this.cellAt(position).marker.clearMarker(color, markerIndex);
    }

    isFriendlyMarkerAt(position, color, markerIndex) {
        // return true if the marker at the given position and index matches the given color, false otherwise
        return this.cellAt(position).marker.checkMarker(color, markerIndex);
    }

    isEnemyMarkerAt(position, color) {
        // return true if there is a marker of the given color at the given position, false otherwise
        return this.cellAt(position).marker.checkOtherMarkerAt(color);
    }

    toString() {
        // return a string representation of the world
        let result = "";
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.map[x][y];
                if (cell.isObstructed()) {
                    result += "#";
                } else if (cell.baseColor === Color.RED) {
                    result += "+";
                } else if (cell.baseColor === Color.BLACK) {
                    result += "-";
                } else if (cell.food > 0) {
                    result += cell.food.toString();
                } else {
                    result += ".";
                }
            }
            result += "\n";
        }
        return result;
    }
}

/**
 * process the file and create World
 *
 * @param {String} fileName
 * @returns {World}
 */
/*function loadWorldFromFile(fileName) {
    if (!fileChecker(fileName)) {
        throw Error("Problems with file");
    }
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const lines = fileContent.split('\n').map(line => line.trim());
    const width = parseInt(lines[0]);
    const height = parseInt(lines[good1]);

    let newMap = new Array(height);
    for (let i = 0; i < height; i++) {
        newMap[i] = new Array(width);
    }

    for (let i = 0; i < height; i++) {
        const row = lines[i + 2].split(' ').map(cell => cell.trim());
        for (let j = 0; j < width; j++) {
            const cellValue = row[j];
            if (cellValue === '#') {
                newMap[i][j] = new WorldCell(true, "None", 0);
            } else if (cellValue === '.') {
                newMap[i][j] = new WorldCell(false, "None", 0);
            } else if (cellValue === '-') {
                newMap[i][j] = new WorldCell(false, "Black", 0);
            } else if (cellValue === '+') {
                newMap[i][j] = new WorldCell(false, "Red", 0);
            } else {
                if (!('0' <= cellValue && cellValue <= '9')) {
                    throw Error("Unknown symbol");
                }
                newMap[i][j] = new WorldCell(false, "None", parseInt(cellValue));
            }
        }
    }

    return new World(newMap);
}

function fileChecker(fileName) {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const lines = fileContent.split('\n').map(line => line.trim());
    if (isNaN(lines[0]) && isNaN(lines[good1])) {
        return false;
    }
    const width = parseInt(lines[0]);
    const height = parseInt(lines[good1]);
    if (lines.length !== height + 2) {
        return false;
    }
    for (let i = 0; i < height; i++) {
        const row = lines[i + 2].split(' ').map(cell => cell.trim());
        if (row.length !== width) {
            return false;
        }
        for (let j = 0; j < width; j++) {
            const cellValue = row[j];
            if (!((cellValue === '#') ||
                (cellValue === '.') ||
                (cellValue === '-') ||
                (cellValue === '+') ||
                ('0' <= cellValue && cellValue <= '9'))
            ) {
                return false;
            }
        }
    }
    return true;
}

 */