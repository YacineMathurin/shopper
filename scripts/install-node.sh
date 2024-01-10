wget -nv https://d3rnber7ry90et.cloudfront.net/linux-x86_64/node-v18.17.1.tar.gz
mkdir /usr/local/lib/node
tar -xf node-v18.17.1.tar.gz
mv node-v18.17.1 /usr/local/lib/node/nodejs
### Unload NVM, use the new node in the path, then install some items globally.
echo "export NVM_DIR=''" >> ~/.bashrc
echo "export NODEJS_HOME=/usr/local/lib/node/nodejs" >> ~/.bashrc
echo "export PATH=\$NODEJS_HOME/bin:\$PATH" >> ~/.bashrc
### Reload environment
. ~/.bashrc