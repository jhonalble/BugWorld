const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let scalingFactor = 60;

function parseMap(mapString) {
// Parse the map data and extract relevant information
  const map = mapString.trim().split('\n').map(line => line.trim().split(' '));
  let cwidth = parseInt(map[0][0]);
  let cheight = parseInt(map[1][0]);

// Set the canvas height and width based on the dimensions in the map file

// Create an array to hold the list of cells
  let listOfCells = [];

// Create a 2D array to hold the cells
  let fcells = new Array(cwidth);
  for (let x = 0; x < cwidth; x++) {
    fcells[x] = new Array(cheight);

    for (let y = 2; y < cheight + 2; y++) {
// Check for borders and dimensions
      if (x === 0 || y === 2 || x === cwidth - 1 || y === cheight + 1) {
        if (map[y][x] !== '#') {
          window.alert("Borders not closed.");
          fail;
        }
      }
      if (typeof map[cheight + 1] === 'undefined' || typeof map[cheight + 1][cwidth - 1] === 'undefined' || typeof map[cheight + 2] != 'undefined' || typeof map[cheight + 1][cwidth] != 'undefined') {
        window.alert("Wrong Dimensions.");
        fail;
      }
      let trueY = y - 2;
      // Create cells based on the characters in the map data
      if (map[y][x] === '#') {
        let cell = new WorldCell(x * scalingFactor, trueY * scalingFactor, null, null, 0, Color.RED, "../img/60/block1.jpg");
        cell.obstructed = true;
        listOfCells.push(cell);
      } else if (map[y][x] === '.') {
        let cell = new WorldCell(x * scalingFactor, trueY * scalingFactor, null, null, 0, Color.RED, "");
        listOfCells.push(cell);
      } else if (map[y][x] === '-') {
        let cell = new WorldCell(x * scalingFactor, trueY * scalingFactor, null, null, 0, Color.RED, "../img/60/black.png");
        listOfCells.push(cell);
      } else if (map[y][x] === '+') {
        let cell = new WorldCell(x * scalingFactor, trueY * scalingFactor, null, null, 0, Color.RED, "../img/60/red.png");
        listOfCells.push(cell);
      } else if (map[y][x] >= '0' && map[y][x] <= '9') {
        let cell = new WorldCell(x * scalingFactor, trueY * scalingFactor, null, null, 0, Color.RED, "../img/60/food.png");
        listOfCells.push(cell);
      } else {
        window.alert("Invalid character in the map");
        fail;
      }
    }
  }
  return {listOfCells, cwidth, cheight};
}

function display() {
  const {listOfCells, cheight, cwidth} = parseMap(localStorage.getItem("map"));
  canvas.width = cwidth * scalingFactor;
  canvas.height = cwidth * scalingFactor;

  // document.getElementById("mapfile-contents").textContent = cheight;

  let world = new World(listOfCells);

// Create an array to hold the bugs
  let bugArray = [];

// Create 10 bugs with random positions, directions, and colors
  for (let i = 0; i < 10; ++i) {
    let xpos = Math.floor(Math.random() * (cwidth * scalingFactor));
    let ypos = Math.floor(Math.random() * (cheight * scalingFactor));

    let dirc = Math.floor(Math.random() * 6);

    let colorr = Math.floor(Math.random() * 2) + 1;

    let animationss = "";
    let imgSr = "";

    if (colorr === 1) {
      animationss = {
        dir0: {imageSrc: "../img/red0.jpg"},
        dir1: {imageSrc: "../img/red1.png"},
        dir2: {imageSrc: "../img/red2.png"},
        dir3: {imageSrc: "../img/red3.png"},
        dir4: {imageSrc: "../img/red4.png"},
        dir5: {imageSrc: "../img/red5.png"}
      };
      imgSr = "../img/red0.jpg";
    } else {
      animationss = {
        dir0: {imageSrc: "../img/black0.png"},
        dir1: {imageSrc: "../img/black1.png"},
        dir2: {imageSrc: "../img/black2.png"},
        dir3: {imageSrc: "../img/black3.png"},
        dir4: {imageSrc: "../img/black4.png"},
        dir5: {imageSrc: "../img/black5.png"}
      };
      imgSr = "../img/black0.png";
    }
    const bug = new Bug(i, colorr, 1, 1, dirc, xpos, ypos, imgSr, animationss,
        listOfCells);
    bugArray.push(bug);
  }

//Create the background Sprite
  const backgroundSprite = new Sprite({position: {x: 0, y: 0}, imageSrc: "../img/preview.jpg"});


//function to animate the bugs and render the sprites
  function animate() {
    window.requestAnimationFrame(animate);
    //draw background sprite
    backgroundSprite.draw();
    //draw other objects
    for (let i = 0; i < listOfCells.length; i++) {
      listOfCells[i].draw();
    }
    //draw and update bugs
    for (let i = 0; i < bugArray.length; i++) {
      bugArray[i].draw();
      bugArray[i].update();
    }
  }

  animate();
}



function showOptions() {
  window.location.href = "../routes/options.html";
}

function showEnding() {
  if (confirm("Do you really want to quit?")) {
    window.location.href = "../routes/restart.html";
  }
}
