window.Entity = (function(MathModule) {
  "use strict";

  var GuidelinesColor = "#FA5F0C",
      VelocityVector = "#FAFF00",
      EntitiesSideSize = 10,

      EntitySeeingAngle = 290 * MathModule.ToRadians,

      EntityNeighbourhoodDistance = 12,
      EntitySeeingDistance = 25,

      axisX = MathModule.createVectorForAxisX(),

      halfHeight = (EntitiesSideSize * (Math.sqrt(3) / 2.0)) / 2.0,
      halfSide = EntitiesSideSize / 2,

      width = 0,
      height = 0;

  // Private methods.

  function clamp(vector) {
    if (vector.x >= width) {
      vector.x = 0;
    }

    if (vector.x < 0) {
      vector.x = width;
    }

    if (vector.y >= height) {
      vector.y = 0;
    }

    if (vector.y < 0) {
      vector.y = height;
    }
  }

  function drawEntity() {
    this.context.fillStyle = this.color;

    this.context.beginPath();
      this.context.moveTo(halfHeight, 0);
      this.context.lineTo(-halfSide, halfSide);
      this.context.lineTo(-halfSide, -halfSide);
    this.context.closePath();

    this.context.fill();
  }

  function drawGuides() {
    this.context.strokeStyle = GuidelinesColor;

    this.context.beginPath();
      this.context.arc(0, 0, this.distance, -this.angle, this.angle);
      this.context.lineTo(0, 0);

      this.context.arc(0, 0, this.neighbourhood, -this.angle, this.angle);
      this.context.lineTo(0, 0);
    this.context.closePath();

    this.context.stroke();
  }

  function drawVelocity() {
    this.context.strokeStyle = VelocityVector;

    this.context.beginPath();
      this.context.moveTo(0, 0);
      this.context.lineTo(this.velocity.x, this.velocity.y);
    this.context.closePath();

    this.context.stroke();
  }

  // Entities.

  function Entity(context) {
    this.context = context;

    this.position = MathModule.createZeroVector();
    this.velocity = MathModule.createStartingVelocityVector();

    this.angle = EntitySeeingAngle / 2;
    this.distance = EntityNeighbourhoodDistance;
    this.neighbourhood = EntitySeeingDistance;
  }

  Entity.prototype.calculate = function() {};

  Entity.prototype.update = function(dt) {
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    clamp(this.position);
  };

  Entity.prototype.drawDebug = function() {
    this.context.save();
      this.context.translate(this.position.x, this.position.y);

      this.context.save();
        this.context.rotate(MathModule.getAngleBetweenVectors(axisX, this.velocity));

        drawEntity.call(this);
        drawGuides.call(this);
      this.context.restore();

      drawVelocity.call(this);
    this.context.restore();
  };

  Entity.prototype.draw = function() {
    this.context.save();
      this.context.translate(this.position.x, this.position.y);
      this.context.rotate(MathModule.getAngleBetweenVectors(axisX, this.velocity));

      drawEntity.call(this);
    this.context.restore();
  };

  // Static methods.
  Entity.setDrawingArea = function(clientWidth, clientHeight) {
    width = clientWidth;
    height = clientHeight;
  };

  return Entity;

} (window.MathModule));