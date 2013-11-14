import pika
import time

connection = pika.BlockingConnection(pika.ConnectionParameters(host = "localhost"))
channel = connection.channel()

channel.queue_declare(queue = "hello")

print " [*] Waiting for messages. To exit press CTRL+C."

def onMessageReceive(channel, method, properties, body):
    print " [x] Received message with body %r" % body

    time.sleep(body.count("."))
    print " [x] Done"

    channel.basic_ack(delivery_tag = method.delivery_tag)

channel.basic_consume(onMessageReceive, queue = "hello")
channel.start_consuming()