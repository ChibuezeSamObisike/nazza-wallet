#!/bin/bash

#download node and npm
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install 16
sudo yum install npm -y

#create our working directory if it doesnt exist
DIR="/home/ec2-user/mynazza-webapp"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi