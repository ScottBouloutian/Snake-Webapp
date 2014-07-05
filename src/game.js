Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width: 10,
    height: 10,
    tile: {
      width: 64,
      height: 64
    }
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    var gameState = new GameState(Game.map_grid.width, Game.map_grid.height);

    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(230, 126, 34)');
    Crafty.e('Keyboard').bind('KeyDown', function(e) {
      if (e.key == Crafty.keys.LEFT_ARROW) {
        gameState.move(Direction.LEFT);
        Game.draw(gameState);
      } else if (e.key == Crafty.keys.RIGHT_ARROW) {
        gameState.move(Direction.RIGHT);
        Game.draw(gameState);
      } else if (e.key == Crafty.keys.UP_ARROW) {
        gameState.move(Direction.UP);
        Game.draw(gameState);
      } else if (e.key == Crafty.keys.DOWN_ARROW) {
        gameState.move(Direction.DOWN);
        Game.draw(gameState);
      }
    });

    Game.draw(gameState);

  },

  draw: function(gameState) {
    // Destroy all active snake entities
    var arr = Crafty('2D, Canvas').get().forEach(function(e) {
      e.destroy();
    });

    //Display the snake's head
    Crafty.e('2D, Canvas, Color')
      .attr({
        x: gameState.snakeHead.x * Game.map_grid.tile.width,
        y: gameState.snakeHead.y * Game.map_grid.tile.height,
        w: Game.map_grid.tile.width,
        h: Game.map_grid.tile.height
      })
      .color('rgb(241, 100, 0)');

    // Display each segment of the snake's body
    gameState.snakeBody.forEach(function(segment) {
      Crafty.e('2D, Canvas, Color')
        .attr({
          x: segment.x * Game.map_grid.tile.width,
          y: segment.y * Game.map_grid.tile.height,
          w: Game.map_grid.tile.width,
          h: Game.map_grid.tile.height
        })
        .color('rgb(241, 196, 15)');
    });

    // Display the food
    Crafty.e('2D, Canvas, Color')
      .attr({
        x: gameState.food.x * Game.map_grid.tile.width,
        y: gameState.food.y * Game.map_grid.tile.height,
        w: Game.map_grid.tile.width,
        h: Game.map_grid.tile.height
      })
      .color('rgb(231, 76, 60)');
  }

};
