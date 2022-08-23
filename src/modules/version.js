const chalk = require('chalk');
const { exec } = require('child_process');
const { readFile } = require('fs/promises');
const { stdout } = require('process');

async function version() {

    var package = require('../../package.json');

    stdout.write(chalk.bold(chalk.blue('discordjs-cli')));
    stdout.write(chalk.bold(chalk.white(' version:')));
    stdout.write(chalk.yellow(` ${package.version}\n`));
};

module.exports = version;