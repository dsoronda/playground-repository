CC = gcc
CFLAGS = -Wall -g

SOURCE := $(wildcard *.c)
BINARIES := $(patsubst %.c, %, $(SOURCE))

all: $(BINARIES)

%: %.c
	$(CC) $(CFLAGS) -o $@ $<

clean:
	rm -f $(BINARIES)