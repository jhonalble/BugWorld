class Marker {
    constructor() {
        // The red bits of the marker
        this.redBits = 0;

        // The black bits of the marker
        this.blackBits = 0;
    }

    setMarker(color, i) {
        // Sets the marker at index i for the given color
        if (color === Color.RED) {
            this.redBits |= (1 << i);
        } else {
            this.blackBits |= (1 << i);
        }
    }

    clearMarker(color, i) {
        // Clears the marker at index i for the given color
        if (color === Color.RED) {
            this.redBits &= ~(1 << i);
        } else {
            this.blackBits &= ~(1 << i);
        }
    }

    checkMarker(color, i) {
        // Checks if the marker at index i matches the given color
        if (color === Color.RED) {
            return (this.redBits & (1 << i)) !== 0;
        } else {
            return (this.blackBits & (1 << i)) !== 0;
        }
    }

    checkOtherMarkerAt(color) {
        // Checks if there is a marker of the opposite color at index i
        if (color === Color.RED) {
            return this.blackBits !== 0;
        } else {
            return this.redBits !== 0;
        }
    }
}