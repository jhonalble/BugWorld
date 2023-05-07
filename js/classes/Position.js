class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    /**
     * check the equivalence of 2 position
     * @param {Position} other
     * @returns {boolean}
     */
    equals(other) {
        return other.x === this.x && other.y === this.y;
    }

    /**
     * For debugging, a to_string() function with every class which outputs
     * the current internal object state in a human-readable format.
     *
     * @return {String}
     */
    toString() {
        return `Position(${this.x}, ${this.y})`
    }
}