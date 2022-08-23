const chalk = require('chalk');
const { exec } = require('child_process');
const { readFile } = require('fs/promises');
const { stdout } = require('process');

async function compareVersion() {
    exec('npm view @discordjs-cli/discordjs-cli', async (err, out, stderr) => {
        if (err) return;

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
                .replace(':', '')

            var package = require('../../package.json');

            if (latest === package.version) return;

            stdout.write(`\nA new version exists:`);
            stdout.write(chalk.blue(` ${package.version}`));
            stdout.write(` =>`);
            stdout.write(chalk.yellow(` ${latest}\n\n`));
        }
    });
}

module.exports = compareVersion;
