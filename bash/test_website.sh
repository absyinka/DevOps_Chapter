#!/bin/bash

# Update package lists
echo "Updating package lists..."
sudo apt update

# Install Apache
echo "Installing Apache..."
sudo apt install -y apache2

# Create a basic HTML file
echo "Setting up a basic website..."
sudo bash -c 'cat > /var/www/html/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <title>Welcome to My Website</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a basic web page served by Apache on Ubuntu.</p>
</body>
</html>
EOF'

# Open firewall for HTTP traffic
echo "Configuring firewall to allow HTTP traffic..."
sudo ufw allow 'Apache'
sudo ufw reload

# Enable and start Apache service
echo "Enabling and starting Apache service..."
sudo systemctl enable apache2
sudo systemctl start apache2

# Print the status of Apache service
echo "Apache service status:"
sudo systemctl status apache2

# Get an print the IP Address to access the website
ip_address=$(hostname -I | awk '{print $1}')
echo "Website setup complete! You can now visit your server's IP address:$ip_address in a web browser."