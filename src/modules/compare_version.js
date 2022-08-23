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
                .filter((x) => x.startsWith('latest'))
                .join('')
                .replace('latest: ', '');

            var package = require('../../package.json');

            if (latest === package.version) return;

            stdout.write(`\n\nA new version exists:`);
            stdout.write(chalk.yellow(` ${package.version}`));
            stdout.write(` =>`);
            stdout.write(chalk.green(` ${latest}\n\n`));
        }
    });
}

module.exports = compareVersion;
