const chalk = require('chalk');
const puts = require('putsjs');
const buttonBuilder = require('./components/button');
const legacyCommand = require('./components/legacy_command');
const menuBuilder = require('./components/menu');
const slashCommand = require('./components/slash_command');
const subCommand = require('./components/sub_command');

async function generate(options) {
    if (options.type === undefined) {
        puts('Specify a type. Run the "');
        puts(chalk.yellow('djs --help'));
        puts('" command for more.\n');
        return;
    };

    if (options.type === 'command' || options.type === 'c') return slashCommand(options);
    if (options.type === 'subcommand' || options.type === 's') return subCommand(options);
    if (options.type === 'legacy' || options.type === 'l') return legacyCommand(options);
    if (options.type === 'button' || options.type === 'b') return buttonBuilder(options);
    if (options.type === 'menu') return menuBuilder(options);
    if (options.type === 'modal') return buttonBuilder(options);
    else {
        puts(`"`);
        puts(chalk.blue(`${options.type}`));
        puts(`" is an unknown command. For a list of all commands, run "`);
        puts(chalk.yellow('djs --help'));
        puts('"\n')
        return;
    }
};

module.exports = generate;