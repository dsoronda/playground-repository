window.MathModule = (function() {
  "use strict";

  var TwoPi = 2.0 * Math.PI,
      ToRadians = Math.PI / 180;

  // Random numbers.

  function randomFromRange(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  // Vectors.

  function vectorLength(A) {
    return Math.sqrt(A.x * A.x  + A.y * A.y);
  }

  function vectorsSubstraction(A, B) {
    return {
      x: A.x - B.x,
      y: A.y - B.y
    };
  }

  function addToVector(A, B) {
    A.x += B.x;
    A.y += B.y;
  }

  function substractFromVector(A, B) {
    A.x -= B.x;
    A.y -= B.y;
  }

  function divideVectorByScalar(A, s) {
    A.x /= s;
    A.y /= s;
  }

  function multiplyByScalar(A, s) {
    A.x *= s;
    A.y *= s;
  }

  function normalize(A) {
    divideVectorByScalar(A, vectorLength(A));
  }

  function getAngleBetweenVectors(A, B) {
    var x = B.x - A.x,
        y = B.y - A.y;

    return Math.atan2(y, x) + TwoPi;
  }

  // Factories.

  function createZeroVector() {
    return { x: 0, y: 0 };
  }

  function createStartingVelocityVector() {
    return { x: 10, y: 10 };
  }

  function createVectorForAxisX() {
    return { x: 1, y: 0 };
  }

  // API.

  return {
    randomFromRange: randomFromRange,

    vectorLength: vectorLength,
    normalize: normalize,

    vectorsSubstraction: vectorsSubstraction,

    substractFromVector: substractFromVector,
    addToVector: addToVector,

    divideVectorByScalar: divideVectorByScalar,
    multiplyByScalar: multiplyByScalar,

    getAngleBetweenVectors: getAngleBetweenVectors,

    createZeroVector: createZeroVector,
    createStartingVelocityVector: createStartingVelocityVector,
    createVectorForAxisX: createVectorForAxisX,

    TwoPi: TwoPi,
    ToRadians: ToRadians
  };

} ());