const chalk = require('chalk');
const pathUtil = require("path");

const VBoxProvider = require('../lib/provider/vbox');
const VirtualizationFrameworkProvider = require('../lib/provider/vf');

exports.command = 'up <image_dir>';
exports.desc = 'Provision and configure a new development environment';
exports.builder = yargs => {
    yargs.options({
        force: {
            alias: 'f',
            describe: 'Force the old VM to be deleted when provisioning',
            default: false,
            type: 'boolean'
        }
    });
};


exports.handler = async argv => {
    const { force, image_dir, processor } = argv;

    let provider = new VBoxProvider()

    if( processor === "Arm64" ) {
        provider = new VirtualizationFrameworkProvider();
    }

    let name = `V`;
    let image = pathUtil.basename( image_dir );

    console.log(chalk.keyword('pink')(`Bringing up machine ${name} using ${image} image`));

    try {
        await provider.up(name, image_dir, force);        
    } catch (err) {
        console.log( chalk.red( err.message ) );
    }
    
};
