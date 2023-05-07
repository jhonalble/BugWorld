// Define a class named Sprite
class Sprite {
    // Constructor function which takes an object with the following properties:
    // position: an object with x and y properties for the sprite's starting position
    // imageSrc: a string with the URL of the image used for the sprite
    // animations: an object containing information for any animations associated with the sprite
    constructor({position, imageSrc, animations}) {
        // Set the sprite's position to the provided position
        this.position = position;
        // Create a new image object to hold the sprite's image
        this.image  = new Image();
        // Set the source of the image object to the provided image source
        this.image.src = imageSrc;
        // Set the animations property to the provided animations object
        this.animations = animations;

        // If there are animations, loop through each one
        if(this.animations) {
            for(let key in this.animations) {
                // Create a new image object for the current animation
                const image = new Image();
                // Set the source of the new image object to the image source for the current animation
                image.src = this.animations[key].imageSrc;
                // Set the image property for the current animation to the new image object
                this.animations[key].image = image;
            }
        }

        // Set a loaded property to false initially
        this.loaded = false;

        // When the sprite's image finishes loading, set the loaded property to true and set the width and height properties
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width;
            this.height = this.image.height;
        }
    }

    // Define a draw method for the Sprite class
    draw() {
        // If the sprite's image is not loaded yet, return
        if(!this.loaded) {
            return;
        }
        
        // Draw the sprite's image on the canvas at its current position
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
