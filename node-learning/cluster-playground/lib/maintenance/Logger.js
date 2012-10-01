var colors = require("colors");

function Logger(enabled) {
    this._enabled = !!enabled;
}

Logger.prototype.log = function(value) {
    if (this._enabled) {
        console.log(value.blue);
    }
};

Logger.prototype.err = function(value) {
    if (this._enabled) {
        console.log(value.red);
    }
};

Logger.prototype.warn = function(value) {
    if (this._enabled) {
        console.log(value.yellow);
    }
};

exports.instance = new Logger(process.env.NODE_ENV === "development");