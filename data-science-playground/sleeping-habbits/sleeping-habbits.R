#!/usr/bin/env Rscript

library(ggplot2)
library(reshape)
library(plyr)

sleep <- read.csv('sleep.csv', header = TRUE)
fluids <- read.csv('fluids.csv', header = TRUE)

df = data.frame(x = sleep$date, y = sleep$inbed / 60, z = sleep$asleep / 60, w = fluids$coffees)

ggplot(melt(df), aes(x, value, color = variable, fill = variable)) +
  geom_bar(subset = .(variable == "y"), stat = "identity") +
  geom_line(subset = .(variable == "z"), aes(x, sleep$asleep / 60, group = 1)) +
  geom_line(subset = .(variable == "w"), aes(x, fluids$coffees, group = 1))

ggsave(file = "bed-vs-coffee.png")