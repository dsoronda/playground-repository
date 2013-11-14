import pika
import uuid

class FibonacciRPCClient(object):
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host = "localhost"))
        self.channel = self.connection.channel()

        result = self.channel.queue_declare(exclusive = True)

        self.callback_queue = result.method.queue
        self.channel.basic_consume(self.onResponse, no_ack = True, queue = self.callback_queue)

    def onResponse(self, channel, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, n):
        self.response = None
        self.corr_id = str(uuid.uuid4())

        properties = pika.BasicProperties(reply_to = self.callback_queue, correlation_id = self.corr_id)
        body = str(n)

        self.channel.basic_publish(exchange = "", routing_key = "rpc_queue", properties = properties, body = body)

        while self.response is None:
            self.connection.process_data_events()

        return int(self.response)

fibonacciRPC = FibonacciRPCClient()

print " [x] Requesting fibonacci(30)."

response = fibonacciRPC.call(30)

print " [.] Got %r." % response