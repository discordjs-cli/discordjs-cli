const chalk = require('chalk');
const { stdout } = require('process');
const puts = require('putsjs');

async function help() {
    puts(chalk.bold(chalk.blue('\ndiscordjs-cli')));
    puts(chalk.bold(' commands:\n\n'));

    var commands = [
        {
            command: 'djs new <project-name>',
            description: 'Create a new Discord.js bot',
        },
        {
            command: 'djs run',
            description: 'Runs Discord.js bot',
        },
        {
            command: 'djs init',
            description: 'Makes an existing bot djs compatible',
        },
        {
            command: 'djs generate command <command>',
            description: 'Generate a slash command',
            alias: 'djs g c <data>',
        },
        {
            command: 'djs generate subcommand <path/to/cmd/subcmd>',
            description: 'Generate a slash command sub-command',
            alias: 'djs g s <data>',
        },
        {
            command: 'djs generate button <button>',
            description: 'Generate a button',
            alias: 'djs g b <data>',
        },
        {
            command: 'djs generate menu <menu-name/option-id>',
            description: 'Generate a menu',
            alias: 'djs g menu <data>',
        },
        {
            command: 'djs generate legacy <command>',
            description: 'Generate a legacy command',
            alias: 'djs g l <data>',
        },
        {
            command: 'djs deploy',
            description: 'Deploy slash commands and subcommands. Specify the "-g" flag to deploy globally',
        },
        {
            command: 'djs update',
            description: 'Updates slash commands and subcommands, removing ones the files no longer exist for. Specify the "-g" flag to update globally',
        },
        {
            command: 'djs delete',
            description: 'Remove all slash commands and subcommands form the Discord API [does NOT delete the files]. Specify the "-g" flag to delete globally',
        },
        {
            command: 'djs --help',
            description: 'Get a list of commands',
        },
        {
            command: 'djs --version',
            description: 'Check discordjs-cli version',
            alias: 'djs -v',
        },
        {
            command: 'djs --update',
            description: 'Update discordjs-cli',
        },
    ];

    commands.forEach((c) => {
        var repeat = 0;

        if (stdout.columns - (`[${c.alias}]`.length + `${c.command}`.length + ` // ${c.description}`.length) - 1 > 0) repeat = stdout.columns - (`[${c.alias}]`.length + `${c.command}`.length + ` // ${c.description}`.length) - 1;

        puts(chalk.yellow(`${c.command}`));
        puts(` // ${c.description}`);
        puts(' '.repeat(repeat));
        if (c.alias) puts(chalk.yellow(` [${c.alias}]`));
        puts('\n\n');
    });
}

module.exports = help;
