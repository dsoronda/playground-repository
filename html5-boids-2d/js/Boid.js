window.Boid = (function(MathModule, Entity) {
  "use strict";

  var BoidColor = "#52A617",
      BoidsCount = 50,

      VelocityLimit = 10,

      FactorForAlignmentVector = 8,
      FactorForCohesionVector = 100,

      BoidNumber,

      SeparationVector = MathModule.createZeroVector(),
      AlignmentVector = MathModule.createZeroVector(),
      CohesionVector = MathModule.createZeroVector(),
      DistanceVector = MathModule.createZeroVector();

  // Private methods.

  function fillVectorWithZeros(vector) {
    vector.x = 0;
    vector.y = 0;
  }

  function boidCalculation(boid, index) {
    if (this.number !== index) {
      MathModule.addToVector(CohesionVector, boid.position);

      DistanceVector = MathModule.vectorsSubstraction(boid.position, this.position);

      if (MathModule.vectorLength(DistanceVector) < this.neighbourhood) {
        MathModule.substractFromVector(SeparationVector, DistanceVector);
      }

      MathModule.addToVector(AlignmentVector, boid.velocity);
    }
  }

  // Boid prototype.

  function Boid() {
    Entity.apply(this, arguments);

    this.color = BoidColor;
    this.number = BoidNumber++;
  }

  Boid.prototype = Object.create(Entity.prototype);
  Boid.prototype.constructor = Boid;

  // Public methods.

  Boid.prototype.calculate = function(boids, dt) {
    fillVectorWithZeros(SeparationVector);
    fillVectorWithZeros(AlignmentVector);
    fillVectorWithZeros(CohesionVector);
    fillVectorWithZeros(DistanceVector);

    boids.forEach(boidCalculation.bind(this));

    MathModule.divideVectorByScalar(CohesionVector, BoidsCount - 1);
    MathModule.substractFromVector(CohesionVector, this.position);
    MathModule.divideVectorByScalar(CohesionVector, FactorForCohesionVector);

    MathModule.divideVectorByScalar(AlignmentVector, BoidsCount - 1);
    MathModule.substractFromVector(AlignmentVector, this.velocity);
    MathModule.divideVectorByScalar(AlignmentVector, FactorForAlignmentVector);

    MathModule.multiplyByScalar(CohesionVector, dt);
    MathModule.multiplyByScalar(SeparationVector, dt);
    MathModule.multiplyByScalar(AlignmentVector, dt);

    MathModule.addToVector(this.velocity, CohesionVector);
    MathModule.addToVector(this.velocity, SeparationVector);
    MathModule.addToVector(this.velocity, AlignmentVector);

    if (MathModule.vectorLength(this.velocity) > VelocityLimit) {
      MathModule.normalize(this.velocity);
      MathModule.multiplyByScalar(this.velocity, VelocityLimit);
    }
  };

  // Static methods.

  Boid.initialize = function(context) {
    var boids = [],
        boid,
        i;

    BoidNumber = 0;

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