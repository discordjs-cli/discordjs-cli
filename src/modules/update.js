const chalk = require('chalk');
const { execSync, exec } = require('child_process');
const { readFile } = require('fs/promises');
const { createSpinner } = require('nanospinner');
const { stdout } = require('process');
const compareVersion = require('./compare_version');

async function update() {
    exec('npm view @discordjs-cli/discordjs-cli', async (err, out, stderr) => {
        if (err) return console.log('An error occurred checking for updates');

        if (out) {
            var latest = out
                .toString()
                .split('\n')
                .filter((x) => x.includes('latest'))
                .join('')
                .replace(' ', '')
                .replace('latest', '')
                .replace('\x1B[1m\x1B[32m', '')
                .replace('\x1B[39m\x1B[22m', '')
                .replace(':', '');

            var package = require('../../package.json');

            if (latest === package.version) return  stdout.write(chalk.blue('discordjs-cli')) && stdout.write(' is up to date!\n') && process.exit(0);

            stdout.write(`\nA new version exists:`);
            stdout.write(chalk.blue(` ${package.version}`));
            stdout.write(` =>`);
            stdout.write(chalk.yellow(` ${latest}\n`));

            stdout.write('\nProceeding to update:');
            stdout.write(chalk.yellow(' sudo npm i -g @discordjs-cli/discordjs-cli\n\n'));

            execSync('sudo npm i -g @discordjs-cli/discordjs-cli', { stdio: 'inherit' });
        }
    });
}

module.exports = update;
