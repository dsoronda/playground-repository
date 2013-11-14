import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(host = "localhost"))
channel = connection.channel()
message = " ".join(sys.argv[1:]) or "info: Hello World!"

channel.exchange_declare(exchange = "logs", type = "fanout")
channel.basic_publish(exchange = "logs", routing_key = "", body = message)

print " [x] Sent message with body %r" % message

connection.close()