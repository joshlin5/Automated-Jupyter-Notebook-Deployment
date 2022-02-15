const chalk = require('chalk');
const pathUtil = require("path");

const VBoxProvider = require('../lib/provider/vbox');
const VirtualizationFrameworkProvider = require('../lib/provider/vf');
const { spawn } = require('child_process');

exports.command = 'ssh <ip_addr>';
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
    const { force, ip_addr} = argv;
    try {
        await ssh(ip_addr);
	console.log('Logged in');
    } catch (err) {
        console.log( chalk.red( err.message ) );
    }

};

async function ssh(ip_addr2) {

    const ssh = spawn('ssh', ['-i', '/Users/Joshua/Desktop/DevOps/V/keys/slim_rsa', '-tt', 'ubuntu@'+ip_addr2], { stdio: 'inherit' });
    //let sshExe = `ssh -i "/Users/Joshua/Desktop/DevOps/V/keys/slim_rsa" ubuntu@${ip_addr2}`;
    
    //let sshExe = 'cat keys/slim_rsa';
   /* return new Promise(function (resolve, reject) {
        console.log( chalk.yellow(`${ssh}`) );
        exec(`${sshExe}`, (error, stdout, stderr) => {

            console.log(error || stderr);
            console.log(stdout);
            resolve()

        });
    });*/
    ssh.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    ssh.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ssh.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

