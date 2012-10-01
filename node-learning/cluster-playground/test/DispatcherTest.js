var QueueAbstraction = require("../lib/queues/QueueAbstraction.js").QueueAbstraction,
    Dispatcher = require("../lib/Dispatcher.js").Dispatcher;

exports.DispatcherTests = {
  setUp: function(done) {
    done();
  },

  "Creating Dispatcher": function(test) {
    test.expect(5);

    var dispatcher = new Dispatcher("MOCKED_TRANSACTION_MANAGER", "MOCKED_CARD_MANAGER", 10);

    test.equal("MOCKED_TRANSACTION_MANAGER", dispatcher.transactionManager, "transaction manager address should be valid");
    test.equal("MOCKED_CARD_MANAGER", dispatcher.cardManager, "card manager address should be valid");
    test.equal(10, dispatcher._workerMaxAmount, "workers amount should be valid");

    test.equal(true, dispatcher._pending instanceof QueueAbstraction, "dispatcher should have pending queue");
    test.equal(true, dispatcher._processed instanceof QueueAbstraction, "dispatcher should have processed queue");

    test.done();
  }

};
