#!/bin/bash

mongod --fork --syslog & \
su - nodejs -c cd app && npm start & \
/bin/bash