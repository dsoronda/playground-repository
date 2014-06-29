CC = gcc
CFLAGS = -Wall -g

SOURCE := $(filter-out object.c, $(wildcard *.c))
BINARIES := $(patsubst %.c, %, $(SOURCE))

all: object $(BINARIES)

object:
	$(CC) $(CFLAGS) -c -o object.o object.c

ex19:
	$(CC) $(CFLAGS) ex19.c object.o -o ex19

%: %.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(BINARIES) object.o