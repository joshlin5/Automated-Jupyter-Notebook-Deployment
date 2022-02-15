const chalk = require('chalk');
const pathUtil = require("path");

const builder = require('../lib/builder');

exports.command = 'init';
exports.desc = 'Prepare tool';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    const { processor } = argv;

    console.log(chalk.green("Preparing docker builder image"));
    await builder.buildPackageImage();
   
};
