var utils = require("util"),
    events = require("events");

function WorkerConstructor(callback) {
    this._callback = callback;
}

utils.inherits(WorkerConstructor, events.EventEmitter);

WorkerConstructor.prototype.spawn = function() {
    this.emit("task-started");
    this.process();
};

WorkerConstructor.prototype.handleNextLink = function(nextLink) {
    this.emit("next-link", nextLink);
};

WorkerConstructor.prototype.process = function() {
    var err = null;

    try {
        var lastTransactionId = this._callback();
        this.emit("task-finished", lastTransactionId);
    } catch(exception) {
        err = exception;
    }

    this.emit("die", err);
};

exports.Worker = WorkerConstructor;