const { stdout } = require('process');
const chalk = require('chalk');

async function intro() {
    stdout.write(chalk.bold(chalk.blue('discordjs-cli')));
    stdout.write(chalk.white(' is a command line interface for simplifying the creation of Discord.js bots.\n\n'));
    stdout.write('Run');
    stdout.write(chalk.yellow(' djs --help'));
    stdout.write(' for a list of commands.\n');
};

module.exports = intro;