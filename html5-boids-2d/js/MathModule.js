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

  function normalize(A) {
    var lengthA = vectorLength(A);

    return {
      x: A.x / lengthA,
      y: A.y / lengthA
    };
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

    getAngleBetweenVectors: getAngleBetweenVectors,

    createZeroVector: createZeroVector,
    createStartingVelocityVector: createStartingVelocityVector,
    createVectorForAxisX: createVectorForAxisX,

    TwoPi: TwoPi,
    ToRadians: ToRadians
  };

} ());