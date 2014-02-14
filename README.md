Installing OAE on Ubuntu from Packages
======================================

This method of installing OAE has been deprecated and is no longer maintained.
The prefered method of getting a local instance of OAE is to use [our Vagrant and puppet scripts](https://github.com/oaeproject/puppet-hilary#environments).

Building new package versions
=============================

  * To push an update, you'll have to download the original sources from which to generate a diff. See the Hilary update section below as an example. If you perform an update of a project that is not documented here, please document it!
  * Copy the code that should go into the package into the appropriate source directory
  * cd in and run something like `debchange -v <package name>_<version>` to add an entry to the changelog
  * run `debuild -S` to build the changes file (if your package has binary files, this will be more difficult. See Hilary section below for an example of dealing with binary files)
  * cd up to the parent directory and run `dput ppa:oae/deps <package name>_<version>_source.changes` to put it in the PPA.
