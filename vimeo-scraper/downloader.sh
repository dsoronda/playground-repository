#!/bin/bash

while read in; do wget "$in"; done < urls.txt