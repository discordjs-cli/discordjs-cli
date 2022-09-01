const puts = require('putsjs');
const chalk = require('chalk');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { readFileSync, writeFileSync } = require('fs');
const { rename, readdir } = require('fs/promises');

async function menuBuilder(options) {
    if (options.component === undefined) {
        puts('Command usage: ');

        puts(chalk.yellow('djs g menu <menu-name/option-id>\n\n'));

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

    var menu = {
        version: djsconfig.version,
        name: options.component.split('/').splice(-2, 1).pop(),
        id: options.component.split('/').pop(),
        format: djsconfig.format,
        fw: null,
    };

    if (menu.format === 'JavaScript') {
        menu.fw = 'js';
    } else if (menu.format === 'TypeScript') {
        menu.fw = 'ts';
    } else console.log(chalk.red(`\nUnknown djsconfig format "${menu.format}". Valid options are JavaScript and Typescript\n`)) && process.exit(1);

    download(`github:discordjs-cli/${menu.fw}-boilerplate-menu#${menu.version}`, `src/interactions/menus/${menu.name}`, {}, async (err) => {
        if (err) console.log(err) && process.exit(1);
        try {
            var buildCommand = createSpinner(chalk.blue(`Creating option ${menu.id} in menu ${menu.name}...`), { color: 'white' }).start();

            // Rename file
            await rename(
                `./src/interactions/menus/${menu.name}/%menu_name%.menu.${menu.fw}`,
                `./src/interactions/menus/${menu.name}/${menu.name.replace(/ /g, '-')}.menu.${menu.fw}`
            );

            // Update contents
            var update = readFileSync(`./src/interactions/menus/${menu.name}/${menu.name.replace(/ /g, '-')}.menu.${menu.fw}`, 'utf8');

            update = update.replace(/%menu_name%/g, `${menu.name.toLowerCase().replace(' ', '-')}`);

            writeFileSync(`./src/interactions/menus/${menu.name}/${menu.name.replace(/ /g, '-')}.menu.${menu.fw}`, update, { encoding: 'utf8' });

            buildCommand.success();

            puts(chalk.green('\Menu created!'));
        } catch (err) {
            buildCommand.error();
            console.log(err) && process.exit(1);
        }
    });
}

module.exports = menuBuilder;
