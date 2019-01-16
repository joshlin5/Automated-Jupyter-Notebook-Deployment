Provison Workshop
===============

You must get into pairs.  And there is a *twist*.

### Before you start

`git clone https://github.com/CSC-DevOps/Provision`

##### Using package manager, install dependencies

`cd Provision` then `npm install`

##### Set your token

```
# Mac/Linux
export DOTOKEN="xxx"
# Windows
setx DOTOKEN xxx
```

##### Run the node program

`node main.js`

If everything is set correctly, you should see output like the following:

```
Your token is: xxxxxx
Calls remaining 4931
```

### Workshop

You will be experimenting with code for provisioning a new server from a cloud provider at a particular region, that is initialized with a specified virtual machine image, using the [digitalocean api v2](https://developers.digitalocean.com/v2/).

The code makes use of the [got api](https://github.com/sindresorhus/got#readme) for making http requests, suitable for interacting with a REST API.

Complete the remaining 7 steps specified in the code comments of [`main.js`](main.js).

1. List regions.
2. List VM images.
3. Create droplet.
4. Get droplet ip
5. Ping ip
6. Destroy droplet
7. Ping ip, make sure dead.

**Bonus**: The first 3 pairs to finish workshop will receive +5 points on their final workshop grade. *But*,
if the rate-limit hits 0, everyone will loose 5 points on their workshop final grade. 

<img src="https://cloud.githubusercontent.com/assets/742934/9525410/ff96de96-4cb1-11e5-84af-19b70cbae957.png" alt="Saw" width="500px;"/>

## REST Refresher

A very brief overview on REST APIs:

A *RESTful architecture*, is an architectural style ([Fielding](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)) for providing resources to clients using a set of request verbs and resource locations. A REST API allows a client to access resources provided by a service.

A useful [workshop on using the GitHub REST APIs](https://github.com/CSC-510/REST-SELENIUM) can be done for more practice.

### Concepts

The goal of REST APIs is to provide painless communication and interoperability between applications and services. REST APIs typically allow (often with some sort of authentication) a manipulation of the various types of entities associated with a service.

For example, if an API was created to enable an application to get information about user accounts, create new ones, update them, or delete them, the REST API could simply be defined by combining the following HTTP VERBS (GET, POST, PUT, DELETE), with resource paths, such as /users/.

| HTTP Verb	| Action             |	Example	       |Result  | 
| --------- | ------------------ | --------------- |------- |
| GET	    | Retrieve record(s) | GET /users/	   | Retrieves all users|
| POST	    | Create record	     | POST /users/	   | Creates a new user|
| PUT	    | Update record	     | PUT /users/6	   | Updates user 6|
| DELETE	| Delete record(s)	 | DELETE /users/1 | Deletes user with id 1|

Query parameters can be provided to provide additional information to the request. For example, `GET /users?country=France` would return a list of all users in France.

A [response](https://www.tutorialspoint.com/http/http_message_examples.htm) typically is composed of several parts: including headers, status code, and body.

Headers will may useful information, such as rate-limits quotas, or properties of the response, such as whether it is encoded or compressed in a particular format.

The [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) will allow you to verify the success of an operation or indicate different types of failures. Additional error information may be sent via the request body.

The body will typically contain a JSON-formated object or an array. Some actions, such as deleting an object, may not return any data in the response body.

When sending a request, a JSON-formatted object is sent attached via the request body to the server.



