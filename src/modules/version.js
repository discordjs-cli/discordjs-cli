const chalk = require('chalk');
const puts = require('putsjs');
const compareVersion = require('./compare_version');

async function version() {
    var package = require('../../package.json');

    puts(chalk.bold(chalk.blue('discordjs-cli')));
    puts(' version:');
    puts(chalk.yellow(` ${package.version}\n`));

    compareVersion();
}

module.exports = version;
