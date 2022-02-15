const chalk = require('chalk');
const pathUtil = require("path");

const builder = require('../lib/builder');

exports.command = 'build';
exports.desc = 'Build virtual machine image';
exports.builder = yargs => {
    yargs.options({
    });
};


exports.handler = async argv => {
    const { sign, image_dir, processor } = argv;

    console.log( chalk.gray( sign ));
    console.log(chalk.green("Building rootfs"));

    await builder.buildRootfs();

    console.log(chalk.green("Building iso"));
    await builder.packageAsIso();
   
};
