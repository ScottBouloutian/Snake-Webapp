var expect = require("chai").expect,
    companion = require('companion');

var CellType = companion.require('../src/snake.js').CellType,
    GameState = companion.require('../src/snake.js').GameState
    Direction = companion.require('../src/snake.js').Direction;

describe('the cell type', function() {

  it('should use the correct values', function() {
    expect(CellType.EMPTY).to.equal(0);
    expect(CellType.SNAKE_HEAD).to.equal(1);
    expect(CellType.SNAKE_BODY).to.equal(2);
    expect(CellType.FOOD).to.equal(3);
  });

})

describe('the direction', function() {

  it('should use the correct values', function() {
    expect(Direction.LEFT).to.equal(0);
    expect(Direction.RIGHT).to.equal(1);
    expect(Direction.UP).to.equal(2);
    expect(Direction.DOWN).to.equal(3);
  });

});

describe('the game state', function() {

  var gameState;

  beforeEach(function() {
    // Initialize the game state
    gameState = new GameState(2, 4);

    // Put the food in a non-random location
    gameState.setCell(gameState.food, CellType.EMPTY);
    gameState.food = {
      x: 1,
      y: 1
    };
    gameState.setCell(gameState.food, CellType.FOOD);
  });

  it('should correctly initialize', function() {
    expect(gameState.width).to.equal(2);
    expect(gameState.height).to.equal(4);
    expect(gameState.state[0][0]).to.equal(CellType.SNAKE);

    var n = [0, 0, 0, 0];
    for (var i = 0; i < gameState.state.length; i++) {
      n[gameState.state[i]]++;
    }

    expect(n[0]).to.equal(2 * 4 - 2); // Empty cells
    expect(n[1]).to.equal(1); // Snake head cells
    expect(n[2]).to.equal(0); // Snake body cells
    expect(n[3]).to.equal(1); // Food cells
    expect(gameState.snakeHead).to.deep.equal({
      x: 0,
      y: 0
    });
    expect(gameState.snakeBody).to.have.length(0);
    expect(gameState.food).to.exist;
  });

  describe('the getCell method', function() {

    it('should return the correct cell value', function() {
      expect(gameState.getCell({
        x: 0,
        y: 0
      })).to.equal(CellType.SNAKE_HEAD);
      expect(gameState.getCell({
        x: 1,
        y: 1
      })).to.equal(CellType.FOOD);
    });

  });

  describe('the setCell method', function() {

    beforeEach(function() {
      gameState.setCell({
        x: 1,
        y: 3
      }, CellType.FOOD);
    });

    it('should set the correct cell value', function() {
      expect(gameState.getCell({
        x: 1,
        y: 3
      })).to.equal(CellType.FOOD);
    });

  });

  describe('the convertIndex method', function() {

    it('should return the correct index', function() {
      expect(gameState.convertIndex(0)).to.deep.equal({
        x: 0,
        y: 0
      });
      expect(gameState.convertIndex(7)).to.deep.equal({
        x: 1,
        y: 3
      });
    });

  });

  describe('the moveHead method', function() {

    it('should not alter the snake head as a side effect', function() {
      var expected = {
        x: 0,
        y: 0
      };
      gameState.moveHead(Direction.RIGHT);
      expect(gameState.snakeHead).to.deep.equal(expected);
    });

    it('should correctly move the head of the snake to the right', function() {
      var expected = {
        x: 1,
        y: 0
      }
      expect(gameState.moveHead(Direction.RIGHT)).to.deep.equal(expected);
    });

    it('should return false on collision with a wall', function() {
      expect(gameState.moveHead(Direction.UP)).to.not.be.ok;
    });

  });

});
