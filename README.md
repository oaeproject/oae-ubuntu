Installing OAE on Ubuntu from Packages
======================================

You can use a few PPAs and manually download a single .deb to install OAE and its dependencies on Ubuntu:

    wget https://download.elasticsearch ^M.org/elasticsearch/elasticsearch/elasticsearch-0.90.2.deb
    sudo dpkg -i elasticsearch-0.90.2.deb
    sudo sh -c "echo 'deb http://debian.datastax.com/community stable main' > /etc/apt/sources.list.d/cassandra.sources.list"
    curl -L http://debian.datastax.com/debian/repo_key | sudo apt-key add -
    sudo add-apt-repository ppa:oae/deps
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install oae-full
    # bunyan isn't strictly necessary, but will make the logs more readable
    sudo apt-get install build-essential make
    sudo npm install -g bunyan

You'll now have to configure nginx and hilary. See the instructions in the `Configuration` section of https://github.com/oaeproject/Hilary/blob/master/README.md the nginx template is in `/opt/3akai-ux/optimized/nginx` and the hilary `config.js` is in `/opt/oae`.

Building new package versions
=============================

  * Copy the code that should go into the package into the appropriate directory
  * cd in and run something like `debchange -v package_0.2.0-1` to add an entry to the changelog
  * run `debuild -S` to build the changes file
  * cd up to the parent directory and run `dput ppa:oae/deps package_0.2.0-1_source.changes` to put it in the PPA.
