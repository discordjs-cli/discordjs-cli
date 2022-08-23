const chalk = require('chalk');
const { stdout } = require('process');

async function help() {
    stdout.write(chalk.bold(chalk.blue('\ndiscordjs-cli')));
    stdout.write(chalk.bold(chalk.white(' commands:\n\n')));

    var commands = [
        {
            command: 'djs --help',
            description: 'Get a list of commands',
        },
        {
            command: 'djs --version',
            description: 'Check discordjs-cli version',
            alias: 'djs -v'
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

        if ((stdout.columns - (`[${c.alias}]`.length + `${c.command}`.length + ` // ${c.description}`.length) - 1) > 0) repeat = (stdout.columns - (`[${c.alias}]`.length + `${c.command}`.length + ` // ${c.description}`.length) - 1);

        stdout.write(chalk.yellow(`${c.command}`));
        stdout.write(chalk.white(` // ${c.description}`));
        stdout.write(' '.repeat(repeat));
        if (c.alias) stdout.write(chalk.yellow(` [${c.alias}]`));
        stdout.write('\n\n');
    });

};

module.exports = help;