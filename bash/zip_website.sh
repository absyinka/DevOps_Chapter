#!/bin/bash

#Installing Packages.

echo "Installing packages."

echo "##############################"

sudo apt install wget unzip httpd -y > /dev/null

echo



#Start & Enable Service

echo "#############################"

echo "Start & Enable HTTPD Service"

echo "#############################"

sudo systemctl start httpd

sudo systemctl enable httpd

echo

 

#Creating Temp Directory

echo "#############################"

echo "Starting Artifact Deployment"

echo "############################"

mkdir -p /tmp/webfiles

cd /tmp/webfiles

echo

 

wget https://www.tooplate.com/zip-templates/2106_soft_landing.zip > /dev/null

unzip 2106_soft_landing.zip > /dev/null

sudo cp -r 2106_soft_landing.zip /var/www/html/

echo

 

#Bounce Service

echo "##########################"

echo "Restarting HTTPD Service"

echo "##########################"

systemctl restart httpd

echo

 

#Clean Up

echo "########################"

echo "Removing Temporary Files"

echo "########################"

rm -rf /tmp/webfiles