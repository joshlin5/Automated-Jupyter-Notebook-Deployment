const fs = require("fs");
const path = require("path");
const child = require("child_process");
const chalk = require("chalk");

const virtcrud = require("virtcrud");

const OUT_LOG = "/tmp/V-out.log"
const ERR_LOG = "/tmp/V-err.log"
const Tail = require('tail').Tail;

const sshExe = require('../exec/ssh');

class VirtualizationFrameworkProvider {

    constructor() {
        this.vf = virtcrud.getProvider('vf');

        this.sshConfig = {
            host: null,
            port: 22,
            user: 'ubuntu',
            identifyFile: path.join( path.dirname(require.main.filename), 'keys', 'slim_rsa')
        };

        try {
            fs.unlinkSync(OUT_LOG);
            fs.unlinkSync(ERR_LOG);
        } catch (err ) { /* ignore*/ }
    }

    async up(name, image_dir, force)
    {

        let baseDir = image_dir;
        let options = {
            outLog: OUT_LOG,
            errLog: ERR_LOG,
            initrd :  path.join( baseDir, 'initrd' ),
            kernel: path.join( baseDir, 'vmlinuz' ), 
            rootfs: path.join( baseDir, 'rootfs' ),
            kernel_cmdline: "console=hvc0 root=/dev/vda",
            tty: "tty1"
        }

        try {
            let vm = await this.vf.create(name, options);
            console.log("Spawned child VM process", vm.pid)

            let macAddress = await this.waitForVM(vm, OUT_LOG, ERR_LOG);
            console.log( `Looking up ip of ${macAddress}` );
            let ip = await this._macToIP(macAddress);
            this.sshConfig.host = ip;
            console.log( chalk.green(`VM is started... ${ip}`) );

            await this.postcustomize();

        } catch( err ) {
            console.log( chalk.red( err.message ) )
        }
        
    }

    async postcustomize() {
        console.log(chalk.keyword('pink')(`Customizing machine`));

	await sshExe("sudo apt update", this.sshConfig);
	await sshExe("sudo apt install -y nodejs", this.sshConfig);
        await sshExe("sudo apt install -y git-all", this.sshConfig);
	await sshExe("git clone https://github.com/CSC-DevOps/App.git", this.sshConfig);
	await sshExe("sudo apt install -y npm", this.sshConfig);
	await sshExe("npm install --prefix App", this.sshConfig);

    }

    waitForVM(vm, outLog, errLog) {

        return new Promise( (resolve, reject) => {
            let macAddress = null;

            // Check for error in underlying VM process.
            vm.on('error', (err) => {
                console.error( chalk.red( err.message ) );
                reject( err );
            });
            
            vm.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                reject( code )
            });

            // We read from files written to by detached child process
            let tail = new Tail( errLog );
            tail.on("line", function(data) {
                // Look for macaddress output line.
                // 2022-01-25 13:33:55.362 vftool[5076:264951] +++ Network Mac Address|f2:d8:8f:cb:ee:6a
                console.log( chalk.grey(data) )
                if( data.toString().includes("+++ Network Mac Address|") ) {
                    macAddress = data.toString().split("|")[1];
                    tail.unwatch();
                    resolve(macAddress.trim());
                }
            });
            tail.on("error", function(error) {
                console.log('ERROR: ', error);
            });

            // tail.on("line", function(data) {
            //   console.log(data);
            //   if( data.includes("login:") ) {
            //     resolve(macAddress.trim());
            //   }
            // });

        });

    }

    //  Search the macaddress of our VM in host's dhcpd lease file.
    //  Example entry:
    //  {
	//    ip_address=192.168.64.22
	//    hw_address=1,9a:ff:bf:63:ec:2f
	//    identifier=1,9a:ff:bf:63:ec:2f
	//    lease=0x61f18182
    //  }
    async _macToIP(macAddress) {

        // for some reason the leading zeros in numbers are stripped in db file.
        macAddress = macAddress.split(':').map(v => v.replace(/^0/, '')).join(':');

        let ip;
        do {
            ip = child.execSync(`cat /var/db/dhcpd_leases | \
                            grep ${macAddress} -B 1 | \
                            cut -d"=" -f2 | \
                            head -1`).toString().trim();
            if (!ip) await new Promise(resolve => setTimeout(resolve, 1000));
        } while (!ip);

        return ip;
    }
}

module.exports = VirtualizationFrameworkProvider;
