const chalk = require('chalk');
const puts = require('putsjs');

async function intro() {
    puts(chalk.bold(chalk.blue('discordjs-cli')));
    puts(' is a command line interface for simplifying the creation of Discord.js bots.\n\n');
    puts('Run');
    puts(chalk.yellow(' djs --help'));
    puts(' for a list of commands.\n');
}

module.exports = intro;
