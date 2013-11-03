(function(window, MathModule, Entity, Boid, Predator, Obstacle) {
  "use strict";

  var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),

      width = canvas.width,
      height = canvas.height,

      boids,
      predators,
      obstacles,

      debugMode,
      performStep,
      last;

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

  // TODO: Collision detection with obstacles.
  // TODO: Predators logic and mechanisms.
  // TODO: Collect data only from closest ones.
  // TODO: Performance and visual issues (GC, redrawing whole screen, smooth move, no collisions etc.).
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

  function render(dt) {
    boids.forEach(function(boid) {
      boid.calculate(boids, dt);
      boid.update(dt);
      boid.draw();
    });
  }

  function renderWithDebugMode(dt) {
    boids.forEach(function(boid) {
      boid.calculate(boids, dt);
      boid.update(dt);
      boid.drawDebug();
    });
  }

  function initialization(context) {
    last = null;

    // Setup drawing mode.
    debugMode = false;
    performStep = render;

    // Setup drawing constraints.
    Entity.setDrawingArea(width, height);

    // Initialize entities.

    boids = Boid.initialize(context);
    predators = Obstacle.initialize(context);

    obstacles = Predator.initialize(context);
  }

  function handleKeyboard(event) {
    // "D" or "d" enables debug mode.
    if (event.keyCode === 68 || event.keyCode === 100) {
      if (debugMode) {
        performStep = renderWithDebugMode;
      } else {
        performStep = render;
      }

      debugMode = !debugMode;
    }
  }

  function renderLoop(timestamp) {
    var dt;

    window.requestAnimationFrame(renderLoop);

    if (last != null) {
      dt = (timestamp - last) / 100;

      clearCanvas();
      performStep(dt);
    }

    last = timestamp;
  }

  // Attaching events.

  canvas.addEventListener("mousemove", function(event) {
    boids.forEach(function(boid) {
      boid.velocity.x = event.offsetX - boid.position.x;
      boid.velocity.y = event.offsetY - boid.position.y;

      MathModule.normalize(boid.velocity);
      MathModule.multiplyByScalar(boid.velocity, 10);
    });
  });

  document.addEventListener("keypress", handleKeyboard);

  // Starting rendering loop.

  initialization(context);
  renderLoop();

} (window, window.MathModule, window.Entity, window.Boid, window.Predator, window.Obstacle));