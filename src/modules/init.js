const { cwd } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const clone = require('git-clone/promise');
const { readFileSync, writeFileSync, cpSync, rm } = require('fs');
const { readFile } = require('fs/promises');
const puts = require('putsjs');

async function initDiscordBot(options) {
    try {
        var doesExist = await readFile('./djsconfig.json', 'utf8', (err) => {
            if (err) return true;
        });
    } catch (err) {}

    if (doesExist) {
        console.log(chalk.red('\nERROR: A djsconfig.json file already exists in this directory. Process exited.\n'));
        return process.exit(1);
    }

    var format = await inquirer.prompt({
        name: 'framework',
        type: 'list',
        prefix: '>',
        message: 'Framework:\n',
        choices: ['JavaScript', 'TypeScript'],
    });

    var framework = format.framework;
    var fw;

    if (framework === 'JavaScript') fw = 'js';
    else if (framework === 'TypeScript') fw = 'ts';

    var bot = await inquirer.prompt({
        name: 'version',
        type: 'list',
        prefix: '>',
        message: 'Discord.js version:\n',
        choices: ['Current (v14)'],
    });

    var version = bot.version.replace('Current (', '').replace(')', '');

    /**************************
     *      Init Project      *
     **************************/

    console.log('');

    var cloningSpinner = createSpinner(chalk.blue('Initiating djs project...'), { color: 'white' }).start();

    await clone(`https://github.com/discordjs-cli/djsconfig`, `./djsconfig`).catch((err) => {
        if (err.toString().endsWith('128')) {
            console.log(chalk.red(`\n\nA djsconfig file already exists`));
            process.exit(1);
        } else if (err) console.log(err);
    });

    try {
        // Handle djsconfig creation
        cpSync(`./djsconfig/djsconfig.json`, `./djsconfig.json`);
        rm(`./djsconfig`, { recursive: true, force: true }, (err) => {
            if (err) console.log(err) && process.exit(1);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    // Add DJS project config
    try {
        var djsconfig = JSON.parse(readFileSync(`./djsconfig.json`, 'utf8'));

        djsconfig.project = await cwd().split('/').pop();
        djsconfig.format = framework;
        djsconfig.version = version;

        if (fw === 'ts') djsconfig.run.default = 'npm run dev';

        writeFileSync(`./djsconfig.json`, JSON.stringify(djsconfig, null, 4), (err) => {
            if (err) return console.log('An error occurred updating the djsconfig.json file') && process.exit(1);
        });
    } catch (err) {
        console.log('An error occurred creating the djsconfig.json file') && process.exit(1);
    }

    cloningSpinner.success();

    console.log('');

    puts(chalk.blue(chalk.bold(cwd().split('/').pop())));
    puts(` has been initiated. Add the bots token to the`);
    puts(chalk.green(' ./src/config/config.json'));
    puts(' file. Lastly, execute');
    puts(chalk.yellow(' djs run'));
    puts(` to start your bot!\n\n`);
}

module.exports = initDiscordBot;
