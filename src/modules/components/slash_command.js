const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const clone = require('git-clone/promise');
const { writeFile, mkdir, readFile, readFileSync } = require('fs');

async function slashCommand(options) {

    if (options.component === undefined) {
        stdout.write('Command usage: ');

        stdout.write(chalk.yellow('djs g c <command-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    };

    var commandName = options.component;

    try {
        var djsconfig = JSON.parse(readFileSync('./djsconfig.json', 'utf8'));
    } catch (err) {
        if (err.toString().includes('no such file or directory, open \'./djsconfig.json\'')) {
            console.log(chalk.bold(chalk.red('Error: This command is not available when running the discordjs-cli outside a workspace.')));
            stdout.write(chalk.white('\nTo initiate a djs workspace in an existing directory, run'));
            stdout.write(chalk.yellow(' djs init\n'));
            return;
        }
        console.log(err);
    }

    console.log(djsconfig);

};

module.exports = slashCommand;