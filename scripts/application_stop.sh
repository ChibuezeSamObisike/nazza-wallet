#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
npm run stop
pkill node