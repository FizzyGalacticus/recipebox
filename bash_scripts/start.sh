#!/bin/bash

mongod --fork --syslog & \
su - nodejs -c cd app && npm run serve-prod & \
/bin/bash