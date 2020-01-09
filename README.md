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
export NCSU_DOTOKEN="xxx"
# Windows
setx NCSU_DOTOKEN xxx
```

##### Run the node program

`node index.js`

If everything is set correctly, you should see output like the following:

```
Your token is: xxxxxx
Calls remaining 4931
```

## REST Refresher

A very brief overview on REST APIs:

A *RESTful architecture*, is an architectural style ([Fielding](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)) for providing resources to clients using a set of request verbs and resource locations. A REST API allows a client to access resources provided by a service.

A useful [workshop on using the GitHub REST APIs](https://raw.githubusercontent.com/CSC-510/REST) can be done for more practice.

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

### HTTP

![http](https://github.com/CSC-510/REST/blob/master/img/http.png?raw=true)


## Practicting with a REST Client

Let's see how a javascript client application can communicate with a server using a REST API call.

### Sending a GET request from inside the browser

In a browser, visit http://httpbin.org/

Open the developer's tool console (in your Web browser) and execute this code inside of the console.

*Note:* If you try this same code from a different page, you'll get a Cross-Origin Resource Sharing (CORS) error.

```Javascript
fetch("https://httpbin.org/anything")
    .then(data => data.json())
    .then(result => console.log(result));
```

This constructs as simple `GET` request to `/https://httpbin.org/anything` and returns a copy of what was sent.

### Sending a PUT request from inside the browser

```javascript
// The data we are going to send in our request
data = {
    coffee: 1, milk: 1, sugar: 1, chocolate: 1
}
// Headers describing how the request body is formatted.
headers = new Headers();
headers.append('Content-Type', 'application/json');
// Request information
fetchData = { 
    method: 'PUT', 
    body: JSON.stringify(data),
    headers: headers
}
fetch('https://httpbin.org/anything', fetchData)
    .then(data => data.json())
    .then(result => console.log(result));
```

### Sending request using curl

Here are the same examples as above, but written to work with curl:

```bash
curl --request GET https://httpbin.org/anything
```

```bash
curl --request PUT -H "Content-Type: application/json" --data '{"coffee":1,"milk":1,"sugar":1,"chocolate":1}' https://httpbin.org/anything
```

## Workshop

You will be experimenting with code for provisioning a new server from a cloud provider at a particular region, that is initialized with a specified virtual machine image, using the [digitalocean api v2](https://developers.digitalocean.com/v2/).

The code makes use of the [got api](https://github.com/sindresorhus/got#readme) for making http requests, suitable for interacting with a REST API.

Complete the remaining 7 steps specified in the code comments of [`index.js`](index.js).

1. List regions.
2. List VM images.
3. Create droplet.
4. Get droplet ip
5. Ping ip
6. Destroy droplet
7. Ping ip, make sure dead.

You can use `curl` to help debug your calls:

```bash
curl -X GET -H 'Content-Type: application/json' -H "Authorization: Bearer $NCSU_DOTOKEN" "https://api.digitalocean.com/v2/images"
```

_Note: For Windows, use `%NCSU_DOTOKEN%` in your curl command to expand the environment variable._


**Bonus**: The first 3 pairs to finish workshop will receive 1 bonus point on their final workshop/class activities. *But*, if the rate-limit hits 0, everyone will loose 1 point on their workshop final grade. 

<img src="https://cloud.githubusercontent.com/assets/742934/9525410/ff96de96-4cb1-11e5-84af-19b70cbae957.png" alt="Saw" width="500px;"/>






