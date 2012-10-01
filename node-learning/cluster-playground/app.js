/*jshint es5: true*/
var Dispatcher = require("./lib/Dispatcher.js").Dispatcher,
    Logger = require("./lib/maintenance/Logger.js"),
    cmdLineArguments = require("optimist")
                            .usage('Usage: $0\n' +
                                   '\t-t [TRANSACTION MANAGER GATEWAY ADDRESS]\n' +
                                   '\t-c [CARD MANAGER GATEWAY ADDRESS]\n' +
                                   '\t-n [WORKER AMOUNT]' +
                                   '\t-i [INTERVAL DURATION]')
                            .default("t", "MOCKED")
                            .default("c", "MOCKED")
                            .default("n", 20)
                            .default("i", 2000)
                            .argv,

    mainDispatcher = new Dispatcher(
                            cmdLineArguments.t,
                            cmdLineArguments.c,
                            cmdLineArguments.n,
                            cmdLineArguments.i,
                            Logger.instance);

mainDispatcher.eventLoop();