const chalk = require('chalk');
const child = require('child_process');

class DockerProvider {



    async build(tag, DockerfilePath) {

        let cmd = `docker build --progress=plain -t ${tag} ${DockerfilePath}`;
        return this._exec(cmd);
    }

    run(tag, volumes, containerCmd) {
        let cmd = `docker run -t ${volumes} ${tag} ${containerCmd}`;
        return this._exec(cmd);
    }


    _exec(cmd) {
        console.log( chalk.yellowBright(`Running ${cmd}` ));
        return new Promise( (resolve, reject) => {

            let subprocess = child.exec(cmd);

            // Subscribe to stdout, stderr events
            subprocess.stdout.on('data', stdout => {
                console.log( chalk.gray(stdout.toString() ));
            });
            subprocess.stderr.on('data', stderr => {
                console.log( chalk.gray(stderr.toString() ));
            });

            // Subscribe to error starting process or process exiting events.
            subprocess.on('error', err => {
                console.log( chalk.red( err.message ) );
                reject(err);
            });
            subprocess.on('exit', code => {
                resolve(code);
            });
        });
    }
}

module.exports = new DockerProvider();
