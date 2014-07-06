// The cell type describes what can be located in a given cell.
var CellType = {
  EMPTY: 0,
  SNAKE_HEAD: 1,
  SNAKE_BODY: 2,
  FOOD: 3
};

// The directions in which the snake can travel
var Direction = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};

// The game state object represents the current state of the snake game.
//  This includes the location of the snake segments and food on the game board.
function GameState(width, height) {
  // Initialize the dimensions of the board
  this.width = width;
  this.height = height;

  // Initialize the state of the board
  this.state = new Array(width * height);
  for (var i = 0; i < this.state.length; i++) {
    this.state[i] = CellType.EMPTY;
  }

  // Initialize the snake head
  this.snakeHead = {
    x: 0,
    y: 0
  };
  this.state[0] = CellType.SNAKE_HEAD;

  // Initialize the snake body
  this.snakeBody = [];

  // Add food to the board
  this.food = null;
  this.addFood();
}
GameState.prototype = {
  getCell: function(cell) {
    return this.state[cell.x + cell.y * this.width];
  },
  setCell: function(cell, value) {
    this.state[cell.x + cell.y * this.width] = value;
  },
  convertIndex: function(i) {
    return {
      x: i % this.width,
      y: Math.floor(i / this.width)
    };
  },
  move: function(direction) {
    // Get position of new head
    var newHead = this.moveHead(direction);

    // Check if snake can move in the direction
    if (!newHead) {
      return false;
    }

    // If the snake is eating food
    if (this.getCell(newHead) === CellType.FOOD) {
      // Grow the snake
      this.snakeBody.push(this.snakeHead);
      this.setCell(this.snakeHead, CellType.SNAKE_BODY);
      this.addFood();
    } else {
      // Move the snake body
      if (this.snakeBody.length != 0) {
        var tail = this.snakeBody.shift();
        this.setCell(tail, CellType.EMPTY);
        this.snakeBody.push(this.snakeHead);
        this.setCell(this.snakeHead, CellType.SNAKE_BODY);
      } else {
        this.setCell(this.snakeHead, CellType.EMPTY);
      }
    }

    // Move the snake head
    this.snakeHead = newHead;
    this.setCell(this.snakeHead, CellType.SNAKE_HEAD);

    // Movement was a success
    return true;
  },
  moveHead: function(direction) {
    var newHead = false;

    switch (direction) {
      case Direction.LEFT:
        if (this.snakeHead.x !== 0) {
          newHead = {
            x: this.snakeHead.x - 1,
            y: this.snakeHead.y
          }
        }
        break;
      case Direction.RIGHT:
        if (this.snakeHead.x !== this.width - 1) {
          newHead = {
            x: this.snakeHead.x + 1,
            y: this.snakeHead.y
          }
        }
        break;
      case Direction.UP:
        if (this.snakeHead.y !== 0) {
          newHead = {
            x: this.snakeHead.x,
            y: this.snakeHead.y - 1
          }
        }
        break;
      case Direction.DOWN:
        if (this.snakeHead.y !== this.height - 1) {
          newHead = {
            x: this.snakeHead.x,
            y: this.snakeHead.y + 1
          }
        }
        break;
    }

    if (!newHead || this.getCell(newHead) === CellType.SNAKE_BODY) {
      return false;
    }

    return newHead;
  },
  addFood: function() {
    var numEmpty = this.width * this.height - this.snakeBody.length - 1;
    var randomIndex = Math.floor(Math.random() * (numEmpty - 1));
    var emptyIndex = 0;
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === CellType.EMPTY) {
        if (randomIndex == emptyIndex) {
          this.state[i] = CellType.FOOD;
          this.food = this.convertIndex(i);
        }
        emptyIndex++;
      }
    }
  }
};
