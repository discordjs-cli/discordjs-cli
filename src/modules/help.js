const chalk = require('chalk');
const { stdout } = require('process');

function help() {
    stdout.write(chalk.bold(chalk.blue('\ndiscordjs-cli')));
    stdout.write(chalk.bold(chalk.white(' commands:\n\n')));

    var commands = [
        {
            command: 'djs new <project-name>',
            description: 'Create a new Discord.js bot',
        },
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