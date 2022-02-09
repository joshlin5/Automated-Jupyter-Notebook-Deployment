const axios    = require("axios");
const chalk  = require('chalk');
const os     = require('os');

var config = {};
// Retrieve our api token from the environment variables.
config.token = process.env.NCSU_DOTOKEN;

if( !config.token )
{
	console.log(chalk`{red.bold NCSU_DOTOKEN is not defined!}`);
	console.log(`Please set your environment variables with appropriate token.`);
	console.log(chalk`{italic You may need to refresh your shell in order for your changes to take place.}`);
	process.exit(1);
}

console.log(chalk.green(`Your token is: ${config.token.substring(0,4)}...`));

// Configure our headers to use our token when making REST api requests.
const headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};


class DigitalOceanProvider
{
	async listRegions()
	{
		let response = await axios.get('https://api.digitalocean.com/v2/regions', { headers: headers })
							 .catch(err => console.error(`listRegions ${err}`));
							 
		if( !response ) return;

		// console.log( response.data );
		
		if( response.data.regions )
		{
			for( let region of response.data.regions)
			{
				
			}
		}

		if( response.headers )
		{
			console.log( chalk.yellow(`Calls remaining ${response.headers["ratelimit-remaining"]}`) );
		}
	}

	async listImages( )
	{
		// HINT: Add this to the end to get better filter results: ?type=distribution&per_page=100
	}

	async createDroplet (dropletName, region, imageName )
	{
		if( dropletName == "" || region == "" || imageName == "" )
		{
			console.log( chalk.red("You must provide non-empty parameters for createDroplet!") );
			return;
		}

		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"s-1vcpu-1gb",
			"image":imageName,
			"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		console.log("Attempting to create: "+ JSON.stringify(data) );

		let response = await axios.post("https://api.digitalocean.com/v2/droplets", 
		data,
		{
			headers:headers,
		}).catch( err => 
			console.error(chalk.red(`createDroplet: ${err}`)) 
		);

		if( !response ) return;

		console.log(response.status);
		console.log(response.data);

		if(response.status == 202)
		{
			console.log(chalk.green(`Created droplet id ${response.data.droplet.id}`));
		}
	}

	async dropletInfo (id)
	{
		if( typeof id != "number" )
		{
			console.log( chalk.red("You must provide an integer id for your droplet!") );
			return;
		}

		// Make REST request
		let response = null; /// await axios.get

		if( !response ) return;

		if( response.data.droplet )
		{
			let droplet = response.data.droplet;
			//console.log(droplet);

			// Print out IP address
		}

	}

	async deleteDroplet(id)
	{
		if( typeof id != "number" )
		{
			console.log( chalk.red("You must provide an integer id for your droplet!") );
			return;
		}

		// HINT, use the DELETE verb.

		if( !response ) return;

		// No response body will be sent back, but the response code will indicate success.
		// Specifically, the response code will be a 204, which means that the action was successful with no returned body data.
		if(response.status == 204)
		{
			console.log(`Deleted droplet ${id}`);
		}

	}

};


async function provision()
{
	let client = new DigitalOceanProvider();

	// #############################################
	// #1 Print out a list of available regions
	// Comment out when completed.
	// https://developers.digitalocean.com/documentation/v2/#list-all-regions
	// use 'slug' property
	await client.listRegions();

	// #############################################
	// #2 Extend the client object to have a listImages method
	// Comment out when completed.
	// https://developers.digitalocean.com/documentation/v2/#images
	// - Print out a list of available system images, that are AVAILABLE in a specified region.
	// - use 'slug' property or id if slug is null
	// await client.listImages();

	// #############################################
	// #3 Create an droplet with the specified name, region, and image
	// Comment out when completed. ONLY RUN ONCE!!!!!
	// var name = "UnityId"+os.hostname();
	// var region = ""; // Fill one in from #1
	// var image = ""; // Fill one in from #2
	// await client.createDroplet(name, region, image);

	// Record the droplet id that you see print out in a variable.
	// We will use this to interact with our droplet for the next steps.
	//var dropletId = ;

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// BEFORE MOVING TO STEP FOR, REMEMBER TO COMMENT OUT THE `createDroplet()` call!!!

	// #############################################
	// #4 Extend the client to retrieve information about a specified droplet.
	// Comment out when done.
	// https://developers.digitalocean.com/documentation/v2/#retrieve-an-existing-droplet-by-id
	// REMEMBER POST != GET
	// Most importantly, print out IP address!
	// await client.dropletInfo(dropletId);
	
	// #############################################
	// #5 In the command line, ping your server, make sure it is alive!
	// ping xx.xx.xx.xx

	// #############################################
	// #6 Extend the client to DESTROY the specified droplet.
	// https://developers.digitalocean.com/documentation/v2/#delete-a-droplet
	// await client.deleteDroplet(dropletId);

	// #############################################
	// #7 In the command line, ping your server, make sure it is dead!
	// ping xx.xx.xx.xx
}


// Run workshop code...
(async () => {
	await provision();
})();
