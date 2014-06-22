import re
import sys

if len(sys.argv) < 2:
    sys.stderr.write('Usage: %s <INPUT_FILE>' % sys.argv[0])
    sys.exit(1)

def sanitize(value):
    return value.replace("\n", "")

def match(what, fragment):
    fragment = re.compile('"%s*"' % fragment)
    return fragment.match(what)

with open(sys.argv[1]) as file:
    content = file.readlines()
    is_a_date = re.compile('"[0-9]{4}-[0-9]{2}-[0-9]{2}"')

    coffees = 0
    yerbas = 0
    teas = 0
    date = ""

    previous_line = ""
    rest = ""

    for line in content:
        if is_a_date.match(line):
            if date == "":
                date = sanitize(line)
                continue
            else:
                previous_line = "%s%s,%s,%s,%s" % (date, coffees, teas, yerbas, rest)

                coffees = 0
                yerbas = 0
                teas = 0
                rest = ""
                date = sanitize(line)

                print(previous_line)
                continue

        if match(line, 'Coffee'):
            coffees += 1
        elif match(line, 'Yerba'):
            yerbas += 1
        elif match(line, 'Tea'):
            teas += 1
        else:
            rest += sanitize(line)

    # Last line.
    previous_line = "%s%s,%s,%s,%s" % (date, coffees, teas, yerbas, rest)
    print(previous_line)