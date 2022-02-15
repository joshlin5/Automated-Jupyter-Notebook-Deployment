const chalk = require('chalk');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');
const waitssh = require('waitssh');

const VBoxManage = require('../exec/VBoxManage');
const sshExec = require('../exec/ssh');

class VBoxProvider {

    constructor() {
        this.sshConfig = {
            host: '127.0.0.1',
            port: 2800,
            user: 'vagrant',
            identifyFile: path.join( path.dirname(require.main.filename), 'keys', 'insecure_private_key')
        };
    }

    async up(name, image_dir, force)
    {
        // We will use the image we've pulled down with bakerx.
        let image = path.join(image_dir, 'box.ovf');
        if( !fs.existsSync(image) )
        {
            console.log(chalk.red(`Could not find ${image}. Please download with 'bakerx pull ${path.basename(image)} cloud-images.ubuntu.com'.`))
        }

        // We check if we already started machine, or have a previous failed build.
        let state = await VBoxManage.show(name);
        console.log(`VM is currently: ${state}`);
        if( state == 'poweroff' || state == 'aborted' || force) {
            console.log(`Deleting powered off machine ${name}`);
            // Unlock
            await VBoxManage.execute("startvm", `${name} --type emergencystop`).catch(e => e);
            await VBoxManage.execute("controlvm", `${name} --poweroff`).catch(e => e);
            // We will delete powered off VMs, which are most likely incomplete builds.
            await VBoxManage.execute("unregistervm", `${name} --delete`);
        }
        else if( state == 'running' )
        {
            console.log(`VM ${name} is running. Use 'V up --force' to build new machine.`);
            return;
        }

        // Import the VM using the box.ovf file and register it under new name.
        await VBoxManage.execute("import", `"${image}" --vsys 0 --vmname ${name}`);
        // Set memory size in bytes and number of virtual CPUs.
        await VBoxManage.execute("modifyvm", `"${name}" --memory 1024 --cpus 1`);
        // Disconnect serial port
        await VBoxManage.execute("modifyvm", `${name}  --uart1 0x3f8 4 --uartmode1 disconnected`);

        // Run your specific customizations for the Virtual Machine.
        await this.customize(name);

        // Start the VM.
        console.log(chalk.keyword('pink')(`Starting VM...`));
        // Unlock any session.
        await VBoxManage.execute("startvm", `${name} --type emergencystop`).catch(e => e);
        // Real start.
        await VBoxManage.execute("startvm", `${name} --type headless`);

        // Explicit wait for boot on port forward.
        // Note: This will never complete until you complete port forward step.
        let sshInfo = {port: this.sshConfig.port, hostname: this.sshConfig.host}
        try {
            console.log(`Waiting for ssh to be ready on localhost:2800...`);        
            await waitssh(sshInfo);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }    
        console.log(`ssh is ready`);
        
        // Run your post-configuration customizations for the Virtual Machine.
        await this.postconfiguration();

    }

    async customize(name)
    {
        console.log(chalk.keyword('pink')(`Running VM customizations...`));
    }

    async postconfiguration(name)
    {
        console.log(chalk.keyword('pink')(`Running post-configurations...`));
        
        sshExec("ls /", this.sshConfig);
    }

}

module.exports = VBoxProvider;
