window.Predator = (function(MathModule, Entity) {
  "use strict";

  var PredatorColor = "#FFC03C";

  function Predator() {
    Entity.apply(this, arguments);

    this.color = PredatorColor;
  }

  Predator.prototype = Object.create(Entity.prototype);
  Predator.prototype.constructor = Predator;

  return Predator;

} (window.MathModule, window.Entity));