const puts = require('putsjs');
const chalk = require('chalk');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { readFileSync, writeFileSync } = require('fs');
const { rename, readdir, readFile } = require('fs/promises');

async function legacyCommand(options) {
    if (options.component === undefined) {
        puts('Command usage: ');

        puts(chalk.yellow('djs g l <command-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    }

    try {
        var djsconfig = JSON.parse(readFileSync('./djsconfig.json', 'utf8'));
    } catch (err) {
        if (err.toString().includes("no such file or directory, open './djsconfig.json'")) {
            console.log(
                chalk.bold(
                    chalk.red('Error: This command is not available when running the discordjs-cli outside a workspace.')
                )
            );
            puts('\nTo initiate a djs workspace in an existing directory, run');
            puts(chalk.yellow(' djs init\n'));
            return;
        }
        console.log(err);
    }

    var cmd = {
        version: djsconfig.version,
        name: options.component,
        format: djsconfig.format,
        fw: null,
    };

    // Check if folder exists
    var dirCheck;

    try {
        dirCheck = await readdir(`./src/interactions/legacy_commands/${cmd.name}`);
    } catch (err) {
        dirCheck = false;
    }

    if (dirCheck) {
        puts(chalk.yellow(`WARNING:`));
        puts(` A folder named`);
        puts(chalk.blue(` "${cmd.name}"`));
        puts(` already exists in this directory. Process exited\n`);
        return process.exit(1);
    }

    if (cmd.format === 'JavaScript') {
        cmd.fw = 'js';
    } else if (cmd.format === 'TypeScript') {
        cmd.fw = 'ts';
    } else
        console.log(
            chalk.red(`\nUnknown djsconfig format "${cmd.format}". Valid options are JavaScript and Typescript\n`)
        ) && process.exit(1);

    var dir = await readdir(`./src/interactions/slash_commands/${cmd.name.split('/')[0]}`).catch((err) => false);

    if (dir !== false)
        puts(chalk.bold(chalk.red('\nERROR:'))) & puts(` "${cmd.name}" does not exists. Process exited.\n\n`) &&
            process.exit(1);

    download(
        `github:discordjs-cli/${cmd.fw}-boilerplate-legacy#${cmd.version}`,
        `src/interactions/legacy_commands/${cmd.name}`,
        {},
        async (err) => {
            if (err) console.log(err) && process.exit(1);
            try {
                var buildCommand = createSpinner(chalk.blue(`Creating the ${cmd.name} legacy command...`), {
                    color: 'white',
                }).start();

                // Rename file
                await rename(
                    `./src/interactions/legacy_commands/${cmd.name}/%command_name%.command.${cmd.fw}`,
                    `./src/interactions/legacy_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`
                );

                // Update contents
                var update = readFileSync(
                    `./src/interactions/legacy_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`,
                    'utf8'
                );

                update = update.replace(/%command_name%/g, `${cmd.name.toLowerCase()}`);

                writeFileSync(
                    `./src/interactions/legacy_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`,
                    update,
                    { encoding: 'utf8' }
                );

                buildCommand.success();

                var config = await JSON.parse(await readFile('./src/config/config.json', 'utf8'));

                console.log(chalk.green('\nCommand created!'));

                puts('\nTry it out:');
                puts(chalk.yellow(` ${config.PREFIX}${cmd.name}\n\n`));
            } catch (err) {
                buildCommand.error();
                console.log(err) && process.exit(1);
            }
        }
    );
}

module.exports = legacyCommand;
