const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const clone = require('git-clone/promise');
const { writeFile, mkdir } = require('fs');

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
    var fw;

    if (framework === 'JavaScript') fw = 'js'
    else if (framework === 'TypeScript') fw = 'ts';

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

    /******************************
     *      Project Creation      * 
     ******************************/

    // Create project root off github repo
    console.log('');

    var cloningSpinner = createSpinner(chalk.blue('Creating project folder...'), { color: 'white' }).start();

    await clone(`https://github.com/discordjs-cli/${fw}-boilerplate`, `${name}`).catch((err) => { if (err.toString().endsWith('128')) { console.log(chalk.red(`\n\nA folder already exists named "${name}"`)); process.exit(1) } else if (err) console.log(err) });

    cloningSpinner.stop();

    // Add DJS project config
    var configSpinner = createSpinner(chalk.blue('Adding config files...'), { color: 'white' }).start();
    await writeFile(`./${name}/djs.json`, JSON.stringify(djsconfig, null, 4), (err) => {
        if (err) return console.log('An error occurred') && process.exit(1);
    });

    // Add package.json
    await writeFile(`./${name}/package.json`, JSON.stringify(package, null, 4), (err) => {
        if (err) return console.log('An error occurred') && process.exit(1);
    });

    // Add config folder for bot config
    await mkdir(`./${name}/config`, (err) => {
        if (err) return console.log('An error occurred') && process.exit(1);
    });

    // Add bot config JSON
    await writeFile(`./${name}/config/config.json`, JSON.stringify(configJSON, null, 4), (err) => {
        if (err) return console.log('An error occurred') && process.exit(1);
    });
    configSpinner.stop();

    console.log('');

    /******************************
     *      NPM installation      * 
     ******************************/
    stdout.write(chalk.blue(chalk.bold(name)));
    stdout.write(chalk.white(' has been created. Run'));
    stdout.write(chalk.yellow(' npm install'));
    stdout.write(chalk.white(` in the "${name}" folder to install dependencies, then add the bots token to the`));
    stdout.write(chalk.green(' ./config/config.json'));
    stdout.write(chalk.white(' file. Lastly, execute'));
    stdout.write(chalk.yellow(' djs run'));
    stdout.write(chalk.white(` to start your bot!\n\n`));
};

module.exports = newDiscordBot;