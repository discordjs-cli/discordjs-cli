const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const fs = require('fs');

async function newDiscordBot(options) {

    if (options.type === undefined) {
        stdout.write('Command usage: ');

        stdout.write(chalk.yellow('djs new <project-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    };

    var dir = process.cwd();

    var name = options.type;

    var djsconfig = require('./djs.json');

    djsconfig.project = name;

    var format = await inquirer.prompt({
        name: 'framework',
        type: 'list',
        prefix: '>',
        message: 'Framework:\n',
        choices: [
            'JavaScript',
            'TypeScript'
        ]
    });

    var framework = format.framework;

    djsconfig.format = framework;

    var package = require(`../../templates/${framework}/boilerplate/package.json`);

    package.name = name.toLowerCase().replace(/ /g, '-');
    package.description = 'A Discord.js bot created with the discordjs-cli';

    var pre = await inquirer.prompt({
        name: 'fix',
        type: 'input',
        prefix: '>',
        message: 'Prefix:',
        default() {
            return '!';
        }
    });

    var botName = await inquirer.prompt({
        name: 'name',
        type: 'input',
        prefix: '>',
        message: 'Bot name:',
        default() {
            return 'Jack Sparrow';
        }
    });

    var configJSON = {
        PREFIX: pre.fix,
        BOT_NAME: botName.name,
        TOKEN: '',
        CLIENT_ID: '',
        DEV_GUILD_ID: '',
        LOG_CHANNEL: '',
        STATUS: 'idle',
        ACTIVITY: 'discord',
        TYPE: 'Watching'
    };

    /*********************************
     *         File Creation         * 
     *********************************/

    // Create project root
    fs.mkdirSync(`./${name}`, (err) => {
        if (err) return 'An error occurred' && process.exit(1);
    });

    // Add DJS project config
    fs.writeFileSync(`./${name}/djs.json`, JSON.stringify(djsconfig, null, 4), (err) => {
        if (err) return 'An error occurred' && process.exit(1);
    });

    // Add package.json
    fs.writeFileSync(`./${name}/package.json`, JSON.stringify(package, null, 4), (err) => {
        if (err) return 'An error occurred' && process.exit(1);
    });

    // Add config folder for bot config
    fs.mkdirSync(`./${name}/config`, (err) => {
        if (err) return 'An error occurred' && process.exit(1);
    });

    // Add bot config JSON
    fs.writeFileSync(`./${name}/config/config.json`, JSON.stringify(configJSON, null, 4), (err) => {
        if (err) return 'An error occurred' && process.exit(1);
    });

};

module.exports = newDiscordBot;