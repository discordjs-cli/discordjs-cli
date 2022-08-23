const chalk = require('chalk');
const { exec } = require('child_process');
const { readFile } = require('fs/promises');
const { stdout } = require('process');

async function compareVersion() {
    exec('npm view @discordjs-cli/discordjs-cli', async (err, out, stderr) => {
        if (err) return;

        var res = out.toString()
            .split('\x1B[39m\x1B[22m')
            .join('')
            .split('\x1B[1m\x1B[32m')[2]
            .toString()
            .split('by')[0]
            .split('\n\n')
            .join('%%')
            .replace('\x1B[33m', '')
            .replace('\x1B[39m ', '')
            .replace('latest: ', '')
            .split('%%');

        var currentVersion = {
            version: res[0],
            published: res[1]
        }

        var package = require('../../package.json');

        if (currentVersion.version === package.version) return;

        stdout.write(`\n\nA new version exists:`);
        stdout.write(chalk.yellow(` ${package.version}`));
        stdout.write(chalk.white(` =>`));
        stdout.write(chalk.green(` ${currentVersion.version}\n\n`));
    });
};

module.exports = compareVersion;