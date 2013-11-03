window.Obstacle = (function(MathModule) {
  "use strict";

  var ObstacleMinSize = 20,
      ObstacleMaxSize = 50,

      ObstacleColor = "#EAEAEA";

  function Obstacle(context) {
    this.context = context;

    this.position = MathModule.createZeroVector();
    this.color = ObstacleColor;

    this.size = MathModule.randomFromRange(ObstacleMinSize, ObstacleMaxSize);
  }

  Obstacle.prototype.draw = function() {
    this.context.fillStyle = this.color;

    this.context.beginPath();
      this.context.arc(this.position.x, this.position.y, this.size, 0, MathModule.TwoPi);
    this.context.closePath();

    this.context.fill();
  };

  // Static methods.

  Obstacle.initialize = function() {
    return [];
  };

  return Obstacle;

} (window.MathModule));