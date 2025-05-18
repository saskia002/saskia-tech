#!/bin/bash

# This is used on linux vps to deploy the latest code from git repository and restart the web service
# Usage: ./deploy.sh
# Make sure to give execute permission to the script before running it
# chmod +x deploy.sh


# some shell commnad
# if [ $? -eq 0 ] <-- if 0 then success else failed

# Ensure the script is run as root
#if [ "$(id -u)" -ne 0 ]; then
#    echo "Please run this script as root or using sudo."
#    exit 1
#fi


set -e
set -o pipefail


if git pull; then
	echo "Git pull completed successfully."
else
	echo "Git pull failed."
	exit 1
fi


if npm run build; then
	echo "Build completed successfully."
else
	echo "Build failed."
	service web restart
	exit 1
fi


if service web restart; then
	echo "Service restarted successfully."
else
	echo "Failed to restart the service."
	exit 1
fi
