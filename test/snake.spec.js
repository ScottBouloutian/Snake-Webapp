var expect = require("chai").expect,
    companion = require('companion');

var CellType = companion.require('../src/snake.js').CellType,
    GameState = companion.require('../src/snake.js').GameState
    Direction = companion.require('../src/snake.js').Direction;

describe("the cell type", function() {

    it("should use the correct values", function() {
      expect(CellType.EMPTY).to.equal(0);
      expect(CellType.SNAKE).to.equal(1);
      expect(CellType.FOOD).to.equal(2);
    });

})

describe("the direction", function() {

  it("should use the correct values", function() {
    expect(Direction.LEFT).to.equal(0);
    expect(Direction.RIGHT).to.equal(1);
    expect(Direction.UP).to.equal(2);
    expect(Direction.DOWN).to.equal(3);
  });

});

describe("the game state", function() {

    var gameState;

    beforeEach(function(){
      gameState = new GameState(2,2);
    });

    it("should correctly initialize", function() {
      expect(gameState.state[0][0]).to.equal(CellType.SNAKE);
    });

    describe('the moveHead method', function(){

      it('should not alter the snake head as a side effect', function() {
        var expected = {
          x: 0,
          y: 0
        };
        gameState.moveHead(Direction.RIGHT);
        expect(gameState.snakeHead).to.deep.equal(expected);
      });

      it('should correctly move the head of the snake to the right',function(){
        var expected = {
          x: 1,
          y: 0
        }
        expect(gameState.moveHead(Direction.RIGHT)).to.deep.equal(expected);
      });

    });
})
