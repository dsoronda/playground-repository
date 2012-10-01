var Worker = require("../lib/workers/Worker.js").Worker,
    EventEmitter = require("events").EventEmitter;

exports.WorkerPrototypeTests = {
  setUp: function(done) {
    done();
  },

  "Worker has a EventEmitter in prototype chain": function(test) {
    test.expect(1);

    var worker = new Worker(function() {});

    test.equal(worker instanceof EventEmitter, true, "should inherits from EventEmitter");

    test.done();
  },

  "Worker should have events on start and finish" : function(test) {
    test.expect(2);

    var started = false,
        finished = false,
        worker = new Worker(function() {});

    worker.once("task-started", function() { started = true ; });
    worker.once("task-finished", function() { finished = true ; });
    worker.spawn();

    test.equal(started, true, "task-started event should be invoked");
    test.equal(finished, true, "task-finished event should be invoked");

    test.done();
  },

  "Worker should return last transaction ID from task-finished" : function(test) {
    test.expect(1);

    var lastTransactionId = -1,
        worker = new Worker(function() { return 667; });

    worker.once("task-finished", function(result) { lastTransactionId = result; });
    worker.spawn();

    test.equal(lastTransactionId, 667, "task-finished event should return last transaction Id");

    test.done();
  },

  "Worker should invoke die event always - successful case" : function(test) {
    test.expect(1);

    var die = false,
        worker = new Worker(function() { return 667; });

    worker.once("die", function() { die = true; });
    worker.spawn();

    test.equal(die, true, "die event should occure after successful execution");

    test.done();
  },

  "Worker should invoke die event always - invalid case" : function(test) {
    test.expect(2);

    var error = null,
        die = false,
        worker = new Worker(function() { throw "Error"; });

    worker.once("die", function(err) {
        die = true;
        error = err;
    });

    worker.spawn();

    test.equal(die, true, "die event should occure after invalid execution");
    test.equal(error, "Error", "die event should return exception object");

    test.done();
  }

};