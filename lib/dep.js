const hasbin = require("hasbin");
const child  = require("child_process");
const chalk  = require("chalk")
const os     = require("os");
const { sign } = require("crypto");

const mustBin = (bin, hint) => {
    hint = hint || '';    
    if (!hasbin.sync(bin)) throw new Error(`You must have ${bin} installed to run a vm. ${hint}`);
}

const signature = () => {
    let interfaces = os.networkInterfaces();
    let names = Object.keys(interfaces);
    let cards = names.filter( n => interfaces[n][0].mac && !interfaces[n][0].mac.startsWith("00:") );
    let macs = cards.map( c => interfaces[c][0].mac ).join(';');

    return `${os.arch} ${os.hostname} ${os.cpus()[0].speed} ${os.userInfo().username} ${macs}`;
}

exports.check = async argv => {
    let cmd = argv._[0];

    let processor = "Intel/Amd64";
    let sign = signature();

    try { 
        let output = child.execSync("uname -a").toString();
        if( output.match(/Darwin.*arm64/) ) {
            console.log( chalk.yellow("Mac M1 detected") );
            processor = "Arm64";
        } else {
        }

        mustBin("docker", "Ensure you follow one of recommended steps for having docker installed on your system.")

    } catch ( err ) {
        console.log( chalk.red( err.message ));
        process.exit(1);
    }

    return {processor, sign};
}