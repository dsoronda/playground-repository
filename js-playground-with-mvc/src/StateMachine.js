/*globals jQuery*/

(function($, exports) {

  exports.StateMachine = function() {};

  exports.StateMachine.fn = exports.StateMachine.prototype;
  $.extend(exports.StateMachine.fn, exports.Events);

  exports.StateMachine.fn.add = function(controller) {
    if (!!controller) {
      this.bind("change", function(e, current) {
        if (controller === current) {
          controller.activate();
        } else {
          controller.deactivate();
        }
      });

      controller.active = $.proxy(function() { this.trigger("change", controller); }, this);
    }
  };

} (jQuery, window));