// The cell type describes what can be located in a given cell.
var CellType = {
  EMPTY: 0,
  SNAKE: 1,
  FOOD: 2
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
  this.state = new Array(width);
  for (var x = 0; x < width; x++) {
    this.state[x] = new Array(height);
    for (var y = 0; y < height; y++) {
      this.state[x][y] = CellType.EMPTY;
    }
  }

  // Initialize the snake head
  this.snakeHead = {
    x: 0,
    y: 0
  };
  this.state[0][0] = CellType.SNAKE;

  // Initialize the snake body
  this.snakeBody = [];

  // Add food to the board
  this.addFood();
}
GameState.prototype = {
  move: function(direction) {
    // Get position of new head
    var newHead = this.moveHead(direction);

    // Check if snake can move in the direction
    if (!newHead) {
      return false;
    }

    // If the snake is eating food
    if (this.state[newHead.x][newHead.y] === CellType.FOOD) {
      // Grow the snake
      this.snakeBody.push(this.snakeHead);
      this.state[this.snakeHead.x][this.snakeHead.y] = CellType.SNAKE;
      this.addFood();
    } else {
      // Move the snake body
      if (this.snakeBody.length != 0) {
        var tail = this.snakeBody.shift();
        this.state[tail.x][tail.y] = CellType.EMPTY;
        this.snakeBody.push(this.snakeHead);
      } else {
        this.state[this.snakeHead.x][this.snakeHead.y] = CellType.EMPTY;
      }
    }

    this.snakeHead = newHead;
    this.state[this.snakeHead.x][this.snakeHead.y] = CellType.SNAKE;

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

    if (!newHead || this.state[newHead.x][newHead.y] === CellType.SNAKE) {
      return false;
    }

    return newHead;
  },
  addFood: function() {
    var numEmpty = this.width * this.height - this.snakeBody.length - 1;
    var randomIndex = Math.floor(Math.random() * (numEmpty - 1));
    var i = 0;
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        if (this.state[x][y] === CellType.EMPTY) {
          if (randomIndex == i) {
            this.state[x][y] = CellType.FOOD;
            this.food = {
              x: x,
              y: y
            };
          }
          i++;
        }
      }
    }

  }
};
