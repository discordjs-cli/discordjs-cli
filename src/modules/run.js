const puts = require('putsjs');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { readFile } = require('fs/promises');
const { createSpinner } = require('nanospinner');

async function run() {
    try {
        var script = await JSON.parse(await readFile('./djsconfig.json', 'utf8'));
    } catch (err) {
        if (err.toString().includes("no such file or directory, open './djsconfig.json'")) {
            console.log(chalk.bold(chalk.red('Error: This command is not available when running the discordjs-cli outside a workspace.')));
            puts('\nTo initiate a djs workspace in an existing directory, run');
            puts(chalk.yellow(' djs init\n'));
            return;
        }
        console.log(err);
    }

    var runSpinner = createSpinner(`Starting ${script.project}...`, { color: 'white' }).start();
    try {
        execSync(script.run.default, { stdio: 'inherit' });
        runSpinner.success();
    } catch (err) {
        runSpinner.error();
        console.log(err);
    }
}

module.exports = run;
