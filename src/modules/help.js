const chalk = require('chalk');
const puts = require('putsjs');

async function help() {
    puts(chalk.bold(chalk.blue('\ndiscordjs-cli')));
    puts(chalk.bold(' commands:\n\n'));

    var commands = [
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
            command: 'djs update',
            description: 'Update discordjs-cli',
        },
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
        // {
        //     command: 'djs generate button <button>',
        //     description: 'Generate a button',
        //     alias: 'djs g b <data>',
        // },
        // {
        //     command: 'djs generate menu <menu>',
        //     description: 'Generate a menu',
        //     alias: 'djs g m <data>',
        // },
        // {
        //     command: 'djs generate menu-option <path/to/menu/option>',
        //     description: 'Generate a menu option',
        //     alias: 'djs g mo <data>',
        // },
        // {
        //     command: 'djs generate legacy <command>',
        //     description: 'Generate a legacy command',
        //     alias: 'djs g l <data>',
        // },
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
