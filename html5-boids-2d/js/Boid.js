window.Boid = (function(MathModule, Entity) {
  "use strict";

  var BoidColor = "#52A617",
      BoidsCount = 10;

  function Boid() {
    Entity.apply(this, arguments);

    this.color = BoidColor;
  }

  Boid.prototype = Object.create(Entity.prototype);
  Boid.prototype.constructor = Boid;

  Boid.initialize = function(context) {
    var boids = [],
        boid,
        i;

    for (i = 0; i < BoidsCount; ++i) {
      boid = new Boid(context);

      boid.position.x = MathModule.randomFromRange(20, 400);
      boid.position.y = MathModule.randomFromRange(20, 400);

      boids.push(boid);
    }

    return boids;
  };

  return Boid;

} (window.MathModule, window.Entity));