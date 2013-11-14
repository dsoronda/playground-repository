import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host = "localhost"))
channel = connection.channel()

channel.queue_declare(queue = "rpc_queue")

def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

def onRequest(channel, method, props, body):
    n = int(body)

    print " [.] fibonacci(%s)" % n

    response = fibonacci(n)
    properties = pika.BasicProperties(correlation_id = props.correlation_id, body = str(response))

    channel.basic_publish(exchange = "", routing_key = props.reply_to, properties = properties)
    channel.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_qos(prefetch_count = 1)
channel.basic_consume(onRequest, queue = "rpc_queue")

print " [x] Awaiting RPC requests."

channel.start_consuming()