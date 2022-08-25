const chalk = require('chalk');
const { execSync, exec } = require('child_process');
const puts = require('putsjs');

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

            if (latest === package.version) return  puts(chalk.blue('discordjs-cli')) && puts(' is up to date!\n') && process.exit(0);

            puts(`\nA new version exists:`);
            puts(chalk.blue(` ${package.version}`));
            puts(` =>`);
            puts(chalk.yellow(` ${latest}\n`));

            puts('\nProceeding to update:');
            puts(chalk.yellow(' sudo npm i -g @discordjs-cli/discordjs-cli\n\n'));

            execSync('sudo npm i -g @discordjs-cli/discordjs-cli', { stdio: 'inherit' });
        }
    });
}

module.exports = update;
