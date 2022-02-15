const hasbin = require("hasbin");
const child  = require("child_process");
const chalk  = require("chalk")


const mustBin = (bin, hint) => {
    hint = hint || '';    
    if (!hasbin.sync(bin)) throw new Error(`You must have ${bin} installed to run a vm. ${hint}`);
}


exports.check = async argv => {
    let cmd = argv._[0];

    let processor = "Intel/Amd64";

    try { 
        let output = child.execSync("uname -a").toString();
        if( output.match(/Darwin.*arm64/) ) {
            console.log( chalk.yellow("Mac M1 detected") );
            processor = "Arm64";
        } else {
            mustBin('VBoxManage');
        }

    } catch ( err ) {
        console.log( chalk.red( err.message ));
        process.exit(1);
    }

    return {processor};
}
