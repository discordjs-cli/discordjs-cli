const puts = require('putsjs');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { readFile } = require('fs/promises');
const { createSpinner } = require('nanospinner');

async function scripts(options) {
    try {
        var djsconfig = await JSON.parse(await readFile('./djsconfig.json', 'utf8'));
    } catch (err) {
        if (err.toString().includes("no such file or directory, open './djsconfig.json'")) {
            console.log(chalk.bold(chalk.red('Error: This command is not available when running the discordjs-cli outside a workspace.')));
            puts('\nTo initiate a djs workspace in an existing directory, run');
            puts(chalk.yellow(' djs init\n'));
            return;
        }
        console.log(err);
    }

    // console.log(options);

    const scriptExists = (script) => {
        if (!djsconfig.scripts[`${script}`]) {
            console.log(chalk.red(`Error: Unable to find a "${script}" scripts in the djsconfig.json file. Process exited.`));
            process.exit(1);
        }
    };

    const globally = options.global;

    switch (options.operation) {
        case 'deploy':
            if (globally) {
                var script = 'deploy-global';
                scriptExists(script);
                console.log('Running deploy script');
                execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
            } else {
                var script = 'deploy-dev';
                scriptExists(script);
                console.log('Running deploy script');
                execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
            }
            break;

        case 'update':
            if (globally) {
                var script = 'update-global';
                scriptExists(script);
                console.log('Running update script');
                try {
                    execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
                } catch (err) {
                    console.log(err);
                }
            } else {
                var script = 'update-dev';
                scriptExists(script);
                console.log('Running update script');
                try {
                    execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
                } catch (err) {
                    console.log(err);
                }
            }
            break;

        case 'delete':
            if (globally) {
                var script = 'delete-global';
                scriptExists(script);
                console.log('Running delete script');
                try {
                    execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
                } catch (err) {
                    console.log(err);
                }
            } else {
                var script = 'delete-dev';
                scriptExists(script);
                console.log('Running delete script');
                try {
                    execSync(`${djsconfig.scripts[script]}`, { stdio: 'inherit' });
                } catch (err) {
                    console.log(err);
                }
            }
            break;

        default:
            break;
    }
}

module.exports = scripts;
