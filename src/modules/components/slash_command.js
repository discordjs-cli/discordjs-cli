const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const clone = require('git-clone/promise');
const { writeFile, mkdir } = require('fs');

async function slashCommand(options) {

    console.log(options)

    if (options.type === undefined) {
        stdout.write('Command usage: ');

        stdout.write(chalk.yellow('djs new <project-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    };

    
};

module.exports = slashCommand;