ServersWorkshop
===============

You must get into pairs.  And there is a *twist*.

### Help

Typing out javascript code here:
http://www.pythontutor.com/javascript.html#mode=edit

Editors:

* http://www.sublimetext.com/2
* https://macromates.com/download
* https://atom.io/
* https://code.visualstudio.com/

### Setup

1. Make sure you have [git](http://git-scm.com/) installed, as well as [node.js](http://nodejs.org/)
2. Start with **forking** this repository.
3. Clone local copy 

`git clone https://github.ncsu.edu/YOUR REPO`

##### Using package manager, install dev dependencies

`npm install`

##### Run the node program

`node main.js`

You will see, output:
`Calls remaining 4995`

**Bonus**: The first 3 pairs to finish workshop will receive +5 points on their final workshop grade. *But*,
if the rate-limit hits 0, everyone will loose 5 points on their workshop final grade. 

<img src="https://cloud.githubusercontent.com/assets/742934/9525410/ff96de96-4cb1-11e5-84af-19b70cbae957.png" alt="Saw" width="500px;"/>

### Workshop

Complete the remaining 7 steps specified in the code comments of [`main.js`](https://github.ncsu.edu/CSC-DevOps-Spring2015/ServersWorkshop/blob/master/main.js).

1. List datacenters.
2. List VM images.
3. Create droplet.
4. Get droplet ip
5. Ping ip
6. Destroy drop
7. Ping ip, make sure dead.

You will be experimenting with code for provisioning a new server in a particular data center, that is initialized with a specified virtual machine image, using the [digitalocean api v2](https://developers.digitalocean.com/v2/).

The code makes use of the [needle api](https://github.com/tomas/needle#needle) for making http requests.

##### Final Step

Create a new branch, remove api token from `main.js`, checkout new branch, commit change, and push to your REPO.
