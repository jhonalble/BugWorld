class Bug extends Sprite {
    constructor(id, color, state, resting, direction /*, brain*/, x, y, imageSrc , animations = null, cells = []) {
        let pos = {x: x, y: y}
        super({position: pos, imageSrc: imageSrc, animations: animations});    // The ID of the bug
        this.id = id;

        this.state = state;

        // The color of the bug
        this.color = color;

        // The amount of time the bug needs to rest before it can move again
        this.resting = resting;

        // The current direction the bug is facing
        this.direction = direction;

        // The bug's brain
        // this.brain = brain;

        // Whether or not the bug is carrying food
        this.hasFood = false;
        this.position = {x: x, y: y};

        this.cells = cells;
    }

    /**function to check if the bug can move in its current direction
     *
     * @returns {boolean}
     */
    canMove() {
        if (this.cells)
            return true;

        else {
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i].obstructed) {
                    if (this.cells[i].x <= this.position.x && this.position.x <= this.cells[i].x + 60 && this.cells[i].y <= this.position.y && this.position.y <= this.cells[i].y + 60) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    /**function to change the bug's appearance based on its direction
     *
     * @param name
     */
    switchSprite(name) {
        if (this.image === this.animations[name].image)
            return;
        this.image = this.animations[name].image;
    }

    /**
     * this function update bug
     */
    update() {
        // TODO: write logic
        if (this.position.x >= 60 && this.position.x <= (canvas.width - this.width - 60) && this.position.y >= 60 && this.position.y <= (canvas.height - this.height - 60)) {
            if (this.direction === 0) {
                this.switchSprite("dir0");
                this.position.x = this.position.x + 1;
                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            } else if (this.direction === 1) {
                this.switchSprite("dir1");
                this.position.x = this.position.x + (this.position.y % 2);
                this.position.y = this.position.y + 1;
                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            } else if (this.direction === 2) {
                this.switchSprite("dir2");
                this.position.x = this.position.x - ((this.position.y + 1) % 2);
                this.position.y = this.position.y + 1;
                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            } else if (this.direction === 3) {
                this.switchSprite("dir3");
                this.position.x = this.position.x - 1;
                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            } else if (this.direction === 4) {
                this.switchSprite("dir4");
                this.position.x = this.position.x - ((this.position.y + 1) % 2);
                this.position.y = this.position.y - 1;
                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            } else if (this.direction === 5) {
                this.switchSprite("dir5");

                this.position.x = this.position.x + (this.position.y % 2);
                this.position.y = this.position.y - 1;

                if (!this.canMove()) {
                    this.direction = (this.direction + 3) % 6;
                }
            }
            if (!this.canMove()) {
                this.direction = (this.direction + 3) % 6;
            }
        } else {
            if (this.position.x < 60)
                this.position.x = 62;
            if (this.position.x >= canvas.width - this.width - 60)
                this.position.x = canvas.width - this.width - 62;
            if (this.position.y < 60)
                this.position.y = 62;
            if (this.position.y >= canvas.height - this.height - 60)
                this.position.y = canvas.height - this.height - 62;
            this.direction = (this.direction + 3) % 6;
        }
    }

    /**
     * For debugging, a to_string() function with every class which outputs
     * the current internal object state in a human-readable format.
     * Returns a string representation of the bug
     *
     * @return {String}
     */

    toString() {
        // Returns a string representation of the bug
        return `Bug ${this.id} (${this.color})`;
    }
}