const chalk = require('chalk');
const { createSpinner } = require('nanospinner');
const download = require('download-git-repo');
const { readFileSync, writeFileSync } = require('fs');
const { rename, readdir } = require('fs/promises');
const puts = require('putsjs');

async function subCommand(options) {
    if (options.component === undefined) {
        puts('Command usage: ');

        puts(chalk.yellow('djs g s <command/subcommand-name>\n\n'));

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

    var cmd = {
        version: djsconfig.version,
        name: options.component.split('/')[0],
        sub: options.component.split('/')[1],
        format: djsconfig.format,
        fw: null,
    };

    if (cmd.format === 'JavaScript') {
        cmd.fw = 'js';
    } else if (cmd.format === 'TypeScript') {
        cmd.fw = 'ts';
    } else console.log(chalk.red(`\nUnknown djsconfig format "${cmd.format}". Valid options are JavaScript and Typescript\n`)) && process.exit(1);

    var dir = await readdir(`./src/interactions/slash_commands/${cmd.name}/${cmd.sub}`).catch((err) => false);

    if (dir !== false) puts(chalk.bold(chalk.yellow('\nWARNING:'))) & puts(` "${cmd.sub}" already exists on slash command "${cmd.name}". Process exited.\n\n`) && process.exit(1);
    if (!cmd.name) {
        puts('No command specified. Command usage: ');

        puts(chalk.yellow('djs g s <command/subcommand-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return process.exit(1);
    }

    if (!cmd.sub) {
        puts('No subcommand specified. Command usage: ');

        puts(chalk.yellow('djs g s <command/subcommand-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return process.exit(1);
    }

    download(`github:discordjs-cli/${cmd.fw}-boilerplate-sub-command#${cmd.version}`, `src/interactions/slash_commands/${cmd.name}/${cmd.sub}-sub`, {}, async (err) => {
        if (err) console.log(err) && process.exit(1);
        try {
            var buildCommand = createSpinner(chalk.blue(`Creating the ${cmd.sub} subcommand...`), { color: 'white' }).start();

            // Rename file
            await rename(`./src/interactions/slash_commands/${cmd.name}/${cmd.sub}-sub/%command_name%.subcommand.${cmd.fw}`, `./src/interactions/slash_commands/${cmd.name}/${cmd.sub}-sub/${cmd.sub.replace(/ /g, '-')}.subcommand.${cmd.fw}`);

            // Update contents
            var update = readFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.sub}-sub/${cmd.sub.replace(/ /g, '-')}.subcommand.${cmd.fw}`, 'utf8');

            update = update.replace(/%command_name%/g, `${cmd.sub.replace(/ /g, '').replace(/_/g, '').replace(/-/g, '')}`);

            writeFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.sub}-sub/${cmd.sub.replace(/ /g, '-')}.subcommand.${cmd.fw}`, update, { encoding: 'utf8' });

            // Import into command file
            var commandFile = readFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.name.replace(/ /g, '-')}.command.${cmd.fw}`, 'utf8');

            if (commandFile) {
                if (cmd.fw === 'js') commandFile = `const ${cmd.sub.replace(/ /g, '').replace(/_/g, '').replace(/-/g, '')}Subcommand = require('./${cmd.sub}-sub/${cmd.sub}.subcommand.${cmd.fw}');\n` + commandFile;
                if (cmd.fw === 'ts') commandFile = `import ${cmd.sub.replace(/ /g, '').replace(/_/g, '').replace(/-/g, '')}Subcommand from './${cmd.sub}-sub/${cmd.sub}.subcommand.${cmd.fw}';\n` + commandFile;
                writeFileSync(`./src/interactions/slash_commands/${cmd.name}/${cmd.name}.command.${cmd.fw}`, commandFile, { encoding: 'utf8' });
            }

            buildCommand.success();

            console.log(chalk.green('\nSubcommand created!'));
        } catch (err) {
            buildCommand.error();
            console.log(err) && process.exit(1);
        }
    });
}

module.exports = subCommand;
