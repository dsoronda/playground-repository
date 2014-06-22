#!/bin/bash

# Preparing the file header.
echo "date,coffees,teas,yerbas,carbs_g,water_ml" > fluids.csv

# Cleaning up the data set.
cat food.csv                                                                                       \
  | awk 'NF > 0'                                                                                   \
  | sed -e 's/food_log_\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/"\1-\2-\3",/g'                   \
  | grep --color=none ','                                                                          \
  | grep --color=none '"'                                                                          \
  | grep --color=none -Ew '"[0-9]{4}-[0-9]{2}-[0-9]{2}"|*Water*|*Coffee*|*Yerba*|*Tea*|*"Carbs"*'  \
  | sed -e 's/"",//g'                                                                              \
  | sed -e 's/"\(.*\?\)Coffee\(.*\?\)"/"Coffee"/g'                                                 \
  | sed -e 's/"\(.*\?\)Tea\(.*\?\)"/"Tea"/g'                                                       \
  | sed -e 's/"\(.*\?\)Yerba\(.*\?\)"/"Yerba"/g'                                                   \
  | sed -e 's/"Carbs","\(.*\) g"/\1,/g'                                                            \
  | sed -e 's/"Water","\(.*\) ml"/\1/g'                                                            \
  | sed -e 's/\(1\),\([0-9]\{3\}\(.[0-9]*\)\?\)/\1\2/g'                                            \
  > temporary_fluids.csv

# Summing up the results in sections and delivering it line by line.
python processor.py temporary_fluids.csv >> fluids.csv

# Removing temporary files.
rm temporary_fluids.csv