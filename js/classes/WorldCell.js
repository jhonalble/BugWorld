class WorldCell extends Sprite {
    constructor(x, y, obstructed, bug, food, baseColor, imageSrc) {
        let pos = {x: x, y: y}
        super({position: pos, imageSrc: imageSrc, animations: null});

        this.x = x;

        this.y = y;

        // Whether or not the cell is obstructed
        this.obstructed = obstructed;

        // The bug occupying the cell
        this.bug = bug;

        // The amount of food in the cell
        this.food = food;

        // The base color of the cell
        this.baseColor = baseColor;

        // The marker in the cell
        this.marker = new Marker();

        this.position = pos;
    }

    isOccupied() {
        // Returns whether or not the cell has a bug occupying it
        return this.bug !== null;
    }

    isObstructed() {
        // Returns whether or not the cell is obstructed
        return this.obstructed;
    }

    hasFood() {
        // Returns whether or not the cell has food in it
        return this.food > 0;
    }

    isFriendlyBase(color) {
        // Returns true if a position belongs to bug of a given color
        return this.baseColor === color;
    }

    isEnemyBase(color) {
        // Returns true if is a base of a different color
        return this.baseColor !== null && this.baseColor !== color;
    }

    addMarker(color, i) {
        // Adds a marker at index i for the given color
        this.marker.setMarker(color, i);
    }

    removeMarker(color, i) {
        // Removes the marker at index i for the given color
        this.marker.clearMarker(color, i);
    }

    checkMarker(color, i) {
        // Checks if the marker at index i matches the given color
        return this.marker.checkMarker(color, i);
    }

    checkOtherMarkerAt(color) {
        // Checks if there is a marker of the opposite color at index i
        return this.marker.checkOtherMarkerAt(color);
    }

    clearMarkers() {
        // Clears all markers in the cell
        this.marker = new Marker();
    }

    toString() {
        // Returns a string representation of the cell
        let str = '';

        if (this.bug) {
            str += this.bug.toString();
        } else if (this.food) {
            str += 'food';
        } else if (this.obstructed) {
            str += 'rock';
        } else {
            str += 'empty';
        }

        if (this.marker.redBits || this.marker.blackBits) {
            str += ` [${this.marker.redBits},${this.marker.blackBits}]`;
        }

        return str;
    }
}