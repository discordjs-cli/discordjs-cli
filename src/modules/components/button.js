const puts = require('putsjs');
const chalk = require('chalk');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { readFileSync, writeFileSync } = require('fs');
const { rename, readdir, readFile, cp, rm } = require('fs/promises');
const inquirer = require('inquirer');

async function buttonBuilder(options) {
    if (options.component === undefined) {
        puts('Command usage: ');

        puts(chalk.yellow('djs g b <button-id>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    }

    try {
        var djsconfig = JSON.parse(readFileSync('./djsconfig.json', 'utf8'));
    } catch (err) {
        if (err.toString().includes("no such file or directory, open './djsconfig.json'")) {
            console.log(chalk.bold(chalk.red('Error: This command is not available when running the discordjs-cli outside a workspace.')));
            puts('\nTo initiate a djs workspace in an existing directory, run');
            puts(chalk.yellow(' djs init\n'));
            return;
        }
        console.log(err);
    }

    var btn = {
        version: djsconfig.version,
        name: options.component,
        format: djsconfig.format,
        fw: null,
    };

    if (btn.format === 'JavaScript') {
        btn.fw = 'js';
    } else if (btn.format === 'TypeScript') {
        btn.fw = 'ts';
    } else console.log(chalk.red(`\nUnknown djsconfig format "${btn.format}". Valid options are JavaScript and Typescript\n`)) && process.exit(1);

    var getRow = await inquirer.prompt({
        name: 'row',
        type: 'input',
        prefix: '>',
        message: 'Row (default is button ID):',
        default() {
            return options.component;
        },
    });

    btn.row = getRow.row;

    console.log('');

    // Checks if file exists in row folder
    var fileCheck = await readFile(`./src/interactions/buttons/${btn.row}/${btn.name.split('/')[0]}.button.${btn.fw}`).catch((err) => false);

    if (fileCheck !== false) puts(chalk.bold(chalk.red('\nERROR:'))) && puts(` "${btn.name}" already exists in row "${btn.row}". Process exited.\n\n`) && process.exit(1);

    var buttonType = await inquirer.prompt({
        name: 'type',
        type: 'list',
        prefix: '>',
        message: 'Button type:',
        choices: ['Blank', 'Role'],
    });

    console.log('');

    btn.type = buttonType.type;
    btn.role = 'role_id';

    if (btn.type === 'Role') {
        var btnRole = await inquirer.prompt({
            name: 'id',
            type: 'input',
            prefix: '>',
            message: 'Role ID (leave blank to add later):',
        });

        btn.role = btnRole.id;
    }

    download(`github:discordjs-cli/${btn.fw}-boilerplate-button#${btn.version}`, `src/interactions/buttons/${btn.row}/`, {}, async (err) => {
        if (err) console.log(err) && process.exit(1);
        try {
            var buildCommand = createSpinner(chalk.blue(`Creating the ${btn.name} button...`), { color: 'white' }).start();
            // Move file up one dir

            // Rename file
            if (btn.type === 'Role') {
                await rm(`./src/interactions/buttons/${btn.row}/%button_id%.default.button.${btn.fw}`);
                await rename(
                    `./src/interactions/buttons/${btn.row}/%button_id%.role.button.${btn.fw}`,
                    `./src/interactions/buttons/${btn.row}/${btn.name.replace(/ /g, '-')}.button.${btn.fw}`
                );
            } else if (btn.type === 'Blank') {
                await rm(`./src/interactions/buttons/${btn.row}/%button_id%.role.button.${btn.fw}`);
                await rename(
                    `./src/interactions/buttons/${btn.row}/%button_id%.default.button.${btn.fw}`,
                    `./src/interactions/buttons/${btn.row}/${btn.name.replace(/ /g, '-')}.button.${btn.fw}`
                );
            }

            // Update contents
            var update = readFileSync(`./src/interactions/buttons/${btn.row}/${btn.name.replace(/ /g, '-')}.button.${btn.fw}`, 'utf8');

            update = update.replace(/%button_id%/g, `${btn.name.toLowerCase()}`).replace(/%role_id%/g, btn.role);

            writeFileSync(`./src/interactions/buttons/${btn.row}/${btn.name.replace(/ /g, '-')}.button.${btn.fw}`, update, { encoding: 'utf8' });

            buildCommand.success();

            puts(chalk.green('\nButton created!\n'));
            puts('\nThis will be triggered when a button with the ID');
            puts(chalk.yellow(` ${btn.name}`));
            puts(' is clicked.\n');
        } catch (err) {
            buildCommand.error();
            console.log(err) && process.exit(1);
        }
    });
}

module.exports = buttonBuilder;
