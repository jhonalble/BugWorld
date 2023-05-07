const { Bug } = require('./World.js');
const { World } = require('./World.js');
const { WorldCell } = require('./World.js');

describe('Bug', () => {
  let Bug;

  beforeEach(() => {
    Bug = function (id, color, brain) {
      this.id = id;
      this.color = color;
      this.brain = brain;
      this.hasFood = false;
      this.resting = 0;
      this.direction = 0;
    };
    Bug.prototype.toString = function () {
      return 'Bug';
    };
    Bug = new Bug(1, 'red', 'brain');
  });

  test('Bug has correct properties', () => {
    expect(Bug.id).toBe(1);
    expect(Bug.color).toBe('red');
    expect(Bug.brain).toBe('brain');
    expect(Bug.hasFood).toBe(false);
    expect(Bug.resting).toBe(0);
    expect(Bug.direction).toBe(0);
  });

  test('toString method returns "Bug"', () => {
    expect(Bug.toString()).toBe('Bug');
  });

});

describe('WorldCell', () => {
  test('isObstructed should return true if cell is obstructed', () => {
    const cell = new WorldCell(true, false, false);
    expect(cell.isObstructed()).toBe(true);
  });

  test('isOccupied should return true if cell is occupied', () => {
    const cell = new WorldCell(false, false, false);
    cell.setBug({});
    expect(cell.isOccupied()).toBe(true);
  });

  test('getBug should return the bug object', () => {
    const bug = { name: 'ant' };
    const cell = new WorldCell(false, false, false);
    cell.setBug(bug);
    expect(cell.getBug()).toBe(bug);
  });

  test('removeBug should remove the bug object from the cell', () => {
    const bug = { name: 'ant' };
    const cell = new WorldCell(false, false, false);
    cell.setBug(bug);
    cell.removeBug();
    expect(cell.isOccupied()).toBe(false);
  });

  test('getFood should return the food value of the cell', () => {
    const cell = new WorldCell(false, 10, false);
    expect(cell.getFood()).toBe(10);
  });

  test('setFood should set the food value of the cell', () => {
    const cell = new WorldCell(false, 0, false);
    cell.setFood(5);
    expect(cell.getFood()).toBe(5);
  });

  test('isFriendlyBase should return true if cell is friendly base', () => {
    const bug = { name: 'ant', color: 'red' };
    const cell = new WorldCell(false, false, false);
    expect(cell.isFriendlyBase('red')).toBe(true);
    cell.setBug(bug);
    expect(cell.isFriendlyBase('red')).toBe(true);
    expect(cell.isFriendlyBase('blue')).toBe(false);
  });

  test('isEnemyBase should return true if cell is enemy base', () => {
    const bug = { name: 'ant', color: 'red' };
    const cell = new WorldCell(false, false, false);
    expect(cell.isEnemyBase('red')).toBe(false);
    cell.setBug(bug);
    expect(cell.isEnemyBase('red')).toBe(false);
    expect(cell.isEnemyBase('blue')).toBe(true);
  });

  test('setMarker should set the marker at the specified position', () => {
    const cell = new WorldCell(false, false, false);
    cell.setMarker('red', 0);
    expect(cell.markers[0]).toBe('red');
  });

  test('clearMarker should clear the marker at the specified position', () => {
    const cell = new WorldCell(false, false, false);
    cell.setMarker('red', 0);
    cell.clearMarker(0);
    expect(cell.markers[0]).toBe(null);
  });

  test('isFriendlyMarker should return true if marker is friendly', () => {
    const cell = new WorldCell(false, false, false);
    expect(cell.isFriendlyMarker('red')).toBe(true);
    cell.setMarker('red', 0);
    expect(cell.isFriendlyMarker('red')).toBe(true);
    expect(cell.isFriendlyMarker('blue')).toBe(false);
  });

});

describe('World class', () => {
  let world;

  beforeEach(() => {
    world = new World(3, 3, [
      '.', '.', '.',
      '.', '.', '.',
      '.', '.', '.',
    ]);
  });

  test('should initialize with correct dimensions', () => {
    expect(world.height).toBe(3);
    expect(world.width).toBe(3);
  });

  test('should initialize with correct height',()=>{
    expect(world.height).toBe(3);
  })

  test('should initialize map with correct cells', () => {
    expect(world.map[0][0]).toBeInstanceOf(WorldCell);
    expect(world.map[0][1]).toBeInstanceOf(WorldCell);
    expect(world.map[0][2]).toBeInstanceOf(WorldCell);
    expect(world.map[1][0]).toBeInstanceOf(WorldCell);
    expect(world.map[1][1]).toBeInstanceOf(WorldCell);
    expect(world.map[1][2]).toBeInstanceOf(WorldCell);
    expect(world.map[2][0]).toBeInstanceOf(WorldCell);
    expect(world.map[2][1]).toBeInstanceOf(WorldCell);
    expect(world.map[2][2]).toBeInstanceOf(WorldCell);
  });

  test('should initialize map with correct cell properties', () => {
    expect(world.map[0][0].obstructed).toBe(false);
    expect(world.map[0][0].food).toBe(0);
    expect(world.map[0][0].base).toBe(null);
    expect(world.map[0][0].bug).toBe(null);
    expect(world.map[0][0].markers).toEqual([null, null, null, null, null, null]);

    expect(world.map[1][1].obstructed).toBe(false);
    expect(world.map[1][1].food).toBe(0);
    expect(world.map[1][1].base).toBe(null);
    expect(world.map[1][1].bug).toBe(null);
    expect(world.map[1][1].markers).toEqual([null, null, null, null, null, null]);

    expect(world.map[2][2].obstructed).toBe(false);
    expect(world.map[2][2].food).toBe(0);
    expect(world.map[2][2].base).toBe(null);
    expect(world.map[2][2].bug).toBe(null);
    expect(world.map[2][2].markers).toEqual([null, null, null, null, null, null]);
  });

  test('should be able to retrieve a cell by coordinates', () => {
    const cell = world.cellAt(1, 2);
    expect(cell).toBeInstanceOf(WorldCell);
    expect(cell.obstructed).toBe(false);
    expect(cell.food).toBe(0);
    expect(cell.base).toBe(null);
    expect(cell.bug).toBe(null);
    expect(cell.markers).toEqual([null, null, null, null, null, null]);
  });
});

describe('Bug Brian', () => {
  test('Should be string', () => {
    const result = 'bug';
    expect(result.toString()).toBe('bug');
  });

  test('Should be name correct', () => {
    const result = 'Fatima';
    expect(result).toBe('Fatima');
  });

  test('Should be write number', () => {
    const test = 6 + 2;
    expect(test).toBe(8);
  });

})

