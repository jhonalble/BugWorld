const DIRECTIONS = {
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP: [0, 1],
    DOWN: [0, -1],
    UP_RIGHT: [1, 1],
    UP_LEFT: [-1, 1],
  };
  
  const COLORS = {
    RED: 1,
    BLACK: 2,
  };
  
  const COLOR_NAMES = {
    [COLORS.RED]: 'Red',
    [COLORS.BLACK]: 'Black',
  };
    
   class WorldCell {
    constructor(obstructed, food, base) {
      this.obstructed = obstructed;
      this.food = food;
      this.base = base;
      this.bug = null;
      this.markers = new Array(6).fill(null);
    }
  
    isObstructed() {
      return this.obstructed;
    }
  
    isOccupied() {
      return this.bug != null;
    }
  
    setBug(bug) {
      this.bug = bug;
    }
  
    getBug() {
      return this.bug;
    }
  
    removeBug() {
      this.bug = null;
    }
  
    getFood() {
      return this.food;
    }
  
    setFood(food) {
      this.food = food;
    }
  
    isFriendlyBase(color) {
      return this.bug == null || this.bug.color == color;
    }
  
    isEnemyBase(color) {
      return !this.isFriendlyBase(color);
    }
  
    setMarker(color, pos) {
      this.markers[pos] = color;
    }
  
    clearMarker(pos) {
      this.markers[pos] = null;
    }
  
    isFriendlyMarker(color) {
      return this.marker == null || this.marker.bugColor == color;
    }
  
    isEnemyMarker(color) {
      return !this.isFriendlyMarker(color);
    }
    
  }
  
   class World {
    constructor(height, width, worldContent) {
      this.height = height;
      this.width = width;
      this.map = new Array(height);
      for (let i = 0; i < height; ++i) {
        this.map[i] = new Array(width);
        for (let j = 0; j < width; ++j) {
          let c = worldContent[i * width + j];
          switch (c) {
            case '#':
              this.map[i][j] = new WorldCell(true, 0, null);
              break;
            case '.':
              this.map[i][j] = new WorldCell(false, 0, null);
              break;
            case '-':
              this.map[i][j] = new WorldCell(false, 0, COLORS.BLACK);
              break;
            case '+':
              this.map[i][j] = new WorldCell(false, 0, COLORS.RED);
              break;
            default:
              this.map[i][j] = new WorldCell(false, parseInt(c, 10), null);
              break;
          }
        }
      }
    }
  
      cellAt(i, j) {
          return this.map[i][j];
    }
  }

  module.exports = {
    World
  
  };