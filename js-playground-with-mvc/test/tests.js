/*globals jQuery, module, test, ok*/

(function($, global) {

  module("Events");

  test("Extendning simple object by Events prototype", function() {
    var testObject = {};

    $.extend(testObject, global.Events);

    ok(typeof(testObject.bind) === "function", "Object inherrited from Events hasn't got a bind method");
    ok(typeof(testObject.trigger) === "function", "Object inherrited from Events hasn't got a trigger method");
  });

  module("Controller");

  test("Controller creation test", function() {
    var testObject = global.Controller.create();

    ok(typeof(testObject) === "function", "Controller wasn't created properly");
  });

  test("Controller creation test - with include", function() {
    var TestObject = global.Controller.create({
      includedValue : 1,
      included : function() { return this.includedValue; }
    }),
    testObject = new TestObject();

    ok(typeof(testObject.included) === "function", "Controller with includes wasn't created properly");
    ok(testObject.included() === 1, "Controller with includes wasn't created properly");
  });

  test("Controller additional method existance test", function() {
    var TestObject = global.Controller.create(),
      testObject = new TestObject();

    testObject.refreshElements();
    testObject.delegateEvents();

    ok(typeof(testObject) === "object", "Controller wasn't created properly");
  });

  module("State Machine");

  test("Testing existance of add method for State Machine", function() {
    var testObject = new global.StateMachine();

    ok(typeof(testObject.add) === "function", "StateMachine hasn't got an add method" );
  });

  test("State Machine should have methods from Events", function() {
    var testObject = new global.StateMachine();

    ok(typeof(testObject.bind) === "function", "Object inherrited from StateMachine hasn't got a bind method");
    ok(typeof(testObject.trigger) === "function", "Object inherrited from StateMachine hasn't got a trigger method");
  });

} (jQuery, window));