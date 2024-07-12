#!/bin/bash

# Define variables
DB_NAME="wordpress"
DB_USER="wp_user"
DB_PASSWORD="linux_wordpress2024"
WP_DIR="/var/www/html/mitc"
APACHE_USER="www-data"
ROOT_PASSWORD="html5001#"

# Function to check if a package is installed
function is_installed {
    dpkg -l | grep -q "$1"
}

# Function to check if a service is running
function is_running {
    systemctl is-active --quiet "$1"
}

# Prompt for MySQL root password and confirmation
# while true; do
#     read -sp "Enter the MySQL root password: " ROOT_PASSWORD
#     echo
#     read -sp "Confirm the MySQL root password: " ROOT_PASSWORD_CONFIRM
#     echo
#     if [ "$ROOT_PASSWORD" == "$ROOT_PASSWORD_CONFIRM" ]; then
#         break
#     else
#         echo "Passwords do not match. Please try again."
#     fi
# done

# Prompt for MySQL user password and confirmation
# while true; do
#     read -sp "Enter the MySQL user password: " DB_PASSWORD
#     echo
#     read -sp "Confirm the MySQL user password: " DB_PASSWORD_CONFIRM
#     echo
#     if [ "$DB_PASSWORD" == "$DB_PASSWORD_CONFIRM" ]; then
#         break
#     else
#         echo "Passwords do not match. Please try again."
#     fi
# done

# Install Apache if not installed
if ! is_installed apache2; then
    sudo apt-get update
    sudo apt-get install -y apache2
    sudo systemctl enable apache2
    sudo systemctl start apache2
else
    echo "Apache is already installed."
fi

# Install MySQL if not installed
if ! is_installed mysql-server; then
    sudo apt-get install -y mysql-server
    sudo systemctl enable mysql
    sudo systemctl start mysql
else
    echo "MySQL is already installed."
fi

# Install PHP if not installed
if ! is_installed php; then
    sudo apt-get install -y php libapache2-mod-php php-mysql
else
    echo "PHP is already installed."
fi

# Secure MySQL installation
sudo mysql_secure_installation <<EOF

Y
$ROOT_PASSWORD
$ROOT_PASSWORD
Y
Y
Y
Y
EOF

# Create WordPress database and user
sudo mysql -u root -p"$ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Download and configure WordPress
if [ ! -d "$WP_DIR" ]; then
    sudo mkdir -p $WP_DIR
    cd $WP_DIR
    sudo wget https://wordpress.org/latest.tar.gz
    sudo tar -xzvf latest.tar.gz --strip-components=1
    sudo rm latest.tar.gz
    sudo cp wp-config-sample.php wp-config.php
else
    echo "WordPress directory already exists."
fi

# Set WordPress configuration
sudo sed -i "s/database_name_here/$DB_NAME/" $WP_DIR/wp-config.php
sudo sed -i "s/username_here/$DB_USER/" $WP_DIR/wp-config.php
sudo sed -i "s/password_here/$DB_PASSWORD/" $WP_DIR/wp-config.php

# Set directory permissions
sudo chown -R $APACHE_USER:$APACHE_USER $WP_DIR
sudo chmod -R 755 $WP_DIR

# Enable Apache rewrite module and restart Apache
sudo a2enmod rewrite
sudo systemctl restart apache2

# Output the local IP address
IP_ADDRESS=$(hostname -I | awk '{print $1}')
echo "WordPress is now installed. You can access it at http://$IP_ADDRESS/$WP_DIR"

exit 0
