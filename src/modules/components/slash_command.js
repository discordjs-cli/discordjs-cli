const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { writeFile, mkdir, readFile, readFileSync, writeFileSync } = require('fs');
const { rename, readdir } = require('fs/promises');

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
            stdout.write('\nTo initiate a djs workspace in an existing directory, run');
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

    var dir = await readdir(`./src/interactions/slash_commands/${cmd.name.split('/')[0]}`).catch((err) => false);
    
    if (dir !== false) stdout.write(chalk.bold(chalk.red('\nERROR:'))) & stdout.write(` "${cmd.name}" does not exists. Process exited.\n\n`) && process.exit(1);
    
    download(`github:discordjs-cli/${cmd.fw}-boilerplate-slash-command#${cmd.version}`, `src/interactions/slash_commands/${cmd.name}`, {}, async (err) => {
        if (err) console.log(err) && process.exit(1);
        try {
            var buildCommand = createSpinner(chalk.blue(`Creating the ${cmd.name} slash command...`), { color: 'white' }).start()

            // Rename file
            await rename(`./src/interactions/slash_commands/${cmd.name}/%command_name%.command.${cmd.fw}`, `./src/interactions/slash_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`);
            
            // Update contents
            var update = readFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`, 'utf8');

            update = update.replace(/%command_name%/g, `${cmd.name.toLowerCase()}`);

            writeFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`, update, { encoding: 'utf8' })
            
            buildCommand.success();

            console.log(chalk.green('\nCommand created!'));
        } catch (err) {
            buildCommand.error();
            console.log(err) && process.exit(1);
        }
    });
};

module.exports = slashCommand;