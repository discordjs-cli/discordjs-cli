const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { writeFile, mkdir, readFile, readFileSync } = require('fs');

async function slashCommand(options) {

    if (options.component === undefined) {
        stdout.write('Command usage: ');

        stdout.write(chalk.yellow('djs g c <command-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    };

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

    var cmd = {
        version: djsconfig.version,
        name: options.component,
        format: djsconfig.format,
        fw: null
    }

    if (cmd.format === 'JavaScript') { cmd.fw = 'js' }
    else if (cmd.format === 'TypeScript') { cmd.fw = 'ts' }
    else console.log(chalk.red(`\nUnknown djsconfig format "${cmd.format}". Valid options are JavaScript and Typescript\n`)) && process.exit(1);

    console.log(cmd);

    download(`github:discordjs-cli/${fw}-boilerplate-command#${cmd.version}`, `interactions/${cmd.name}`, {}, (err, suc) => {
        console.log(err);
        console.log(suc);
        console.log('finished');
    })
};

module.exports = slashCommand;