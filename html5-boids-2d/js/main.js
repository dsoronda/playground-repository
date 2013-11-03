(function(window, MathModule, Entity, Boid, Predator, Obstacle) {
  "use strict";

  var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),

      width = canvas.width,
      height = canvas.height,

      boids = [],

      debugMode = false,
      last = null;

  // Polyfills.

  window.requestAnimFrame = (function() {
    function polyfill(callback) {
      window.setTimeout(callback, 1000 / 60);
    }

    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           polyfill;
  } ());

  // TODO: Collision detection (obstacles and walls).
  // TODO: Boids logic and mechanisms.
  // TODO: Predators logic and mechanisms.
  // TODO: Mobile view.
  // TODO: Prepare skeleton for 3D (three.js).

  // Utilities.

  function clearCanvas() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.restore();
  }

  // Application logic.

  function initialization(context) {
    Entity.setDrawingArea(width, height);

    boids = Boid.initialize(context);
  }

  function handleKeyboard(event) {
    // "D" or "d" enables debug mode.
    if (event.keyCode === 68 || event.keyCode === 100) {
      debugMode = !debugMode;
    }
  }

  function renderLoop(timestamp) {
    var dt;

    window.requestAnimationFrame(renderLoop);

    if (last != null) {
      dt = (timestamp - last) / 100;

      clearCanvas();
      boids.forEach(function(boid) {
        boid.update(dt);
        debugMode ? boid.drawDebug() : boid.draw();
      });
    }

    last = timestamp;
  }

  // Attaching events.

  canvas.addEventListener("mousemove", function(event) {
    boids.forEach(function(a) {
      a.velocity.x = event.offsetX - a.position.x;
      a.velocity.y = event.offsetY - a.position.y;

      a.velocity = MathModule.normalize(a.velocity);

      a.velocity.x *= 10;
      a.velocity.y *= 10;
    });
  });

  document.addEventListener("keypress", handleKeyboard);

  // Starting rendering loop.

  initialization(context);
  renderLoop();

} (window, window.MathModule, window.Entity, window.Boid, window.Predator, window.Obstacle));