ServersWorkshop
===============

You must get into pairs.  Place your names  and github repos [here](https://docs.google.com/spreadsheets/d/1y_9WYfoBJqkUF93yonDE8payQnEwrIrGxlrIWOWSv-U/edit#gid=0):

### Setup

1. Make sure you have [git](http://git-scm.com/) installed, as well as [node.js](http://nodejs.org/)
2. Start with forking this repository.
3. Clone local copy 

`git clone https://github.ncsu.edu/YOUR REPO`

* \#3 Using package manager, install dev dependencies

`npm install`

* \#4 Run the node program

`node main.js`

Nothing should appear, that's a good thing.

### Workshop

Complete the remaining 7 steps specified in the code comments of `main.js`.
You will be experimenting with code for provisioning a new server in a particular data center, that is initialized with a specified virtual machine image, using the [digitalocean api v2](https://developers.digitalocean.com/v2/).

The code makes use of the [needle api](https://github.com/tomas/needle#needle) for making http requests.

