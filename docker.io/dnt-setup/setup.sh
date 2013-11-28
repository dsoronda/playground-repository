#!/bin/bash

# Provisioning container with specified Node.js version.
#
# Inspired by scripts provided here:
#   https://github.com/rvagg/nan/blob/master/test/docker

docker run ubuntu /bin/bash -c "apt-get update; apt-get install -y make gcc g++ python git"
docker commit `docker ps -l -q` dev_base

docker run dev_base /bin/bash -c "git clone https://github.com/joyent/node.git /usr/src/node/"
docker commit `docker ps -l -q` nodejs_base

NODE_VERSION="0.10.22"

docker run nodejs_base /bin/bash -c "   \
        cd /usr/src/node/;              \
        git checkout $NODE_VERSION;     \
        git pull origin $NODE_VERSION;  \
        ./configure                     \
        make -j 2;                      \
        make install"

docker commit `docker ps -l -q` "nodejs_$NODE_VERSION"