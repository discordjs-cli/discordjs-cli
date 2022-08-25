const puts = require('putsjs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { createSpinner } = require('nanospinner');
const clone = require('git-clone/promise');
const download = require('download-git-repo');
const { readFileSync, writeFileSync, mkdirSync, cpSync, rm } = require('fs');
const { execSync } = require('child_process');
const { readdir } = require('fs/promises');

async function newDiscordBot(options) {
    if (options.type === undefined) {
        puts('Command usage: ');

        puts(chalk.yellow('djs new <project-name>\n\n'));

        console.log('Run the "djs --help" command for more.');

        return;
    }

    var name = options.type;

    // Check if folder exists
    var dirCheck;

    try {
        dirCheck = await readdir(`./${name}`);
    } catch (err) {
        dirCheck = false;
    }

    if (dirCheck) {
        puts(chalk.yellow(`WARNING:`));
        puts(` A folder named`);
        puts(chalk.blue(` "${name}"`));
        puts(` already exists in this directory. Process exited\n`);
        process.exit(1);
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

    console.log('');

    var bot = await inquirer.prompt({
        name: 'version',
        type: 'list',
        prefix: '>',
        message: 'Discord.js version:\n',
        choices: ['Current (v14)'],
    });

    var version = bot.version.replace('Current (', '').replace(')', '');

    console.log('');

    var pre = await inquirer.prompt({
        name: 'fix',
        type: 'input',
        prefix: '>',
        message: 'Prefix:',
        default() {
            return '!';
        },
    });

    console.log('');

    var botName = await inquirer.prompt({
        name: 'name',
        type: 'input',
        prefix: '>',
        message: 'Bot name:',
        default() {
            return 'Jack Sparrow';
        },
    });

    console.log('');

    var configJSON = {
        PREFIX: pre.fix,
        BOT_NAME: botName.name,
        TOKEN: '',
        CLIENT_ID: '',
        DEV_GUILD_ID: '',
        LOG_CHANNEL: '',
        STATUS: 'idle',
        ACTIVITY: 'discord',
        TYPE: 'Watching',
    };

    /******************************
     *      Project Creation      *
     ******************************/

    // Create project root off github repo

    var cloningSpinner = createSpinner(chalk.blue('Creating project folder...'), {
        color: 'white',
    }).start();

    await new Promise((r) => {
        download(`github:discordjs-cli/${fw}-boilerplate#${version}`, `${name}`, (err) => {
            if (err && err.toString().endsWith('128')) {
                console.log(chalk.red(`\n\nA folder already exists named "${name}"`));
                process.exit(1);
            } else if (err) console.log(err) && process.exit(1);

            return r();
        });
    });

    await clone(`https://github.com/discordjs-cli/djsconfig`, `${name}/djsconfig`).catch((err) => {
        if (err.toString().endsWith('128')) {
            console.log(chalk.red(`\n\nA djsconfig file already exists`));
            process.exit(1);
        } else if (err) console.log(err);
    });

    try {
        // Handle djsconfig creation
        cpSync(`./${name}/djsconfig/djsconfig.json`, `./${name}/djsconfig.json`);
        rm(`./${name}/djsconfig`, { recursive: true, force: true }, (err) => {
            if (err) console.log(err) && process.exit(1);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    cloningSpinner.success();

    // Add DJS project config
    var configSpinner = createSpinner(chalk.blue('Adding config files...'), {
        color: 'white',
    }).start();
    try {
        var djsconfig = JSON.parse(readFileSync(`./${name}/djsconfig.json`, 'utf8'));

        djsconfig.project = name;
        djsconfig.format = framework;
        djsconfig.version = version;

        var runTime;

        if (fw === 'ts') djsconfig.run.default = 'npm run dev';

        if (fw === 'ts') runTime = 'tsc; node ./build/';
        if (fw === 'js') runTime = 'node src/';

        djsconfig.scripts['deploy-dev'] = djsconfig.scripts['deploy-dev'].replace('%run% ', runTime);
        djsconfig.scripts['deploy-global'] = djsconfig.scripts['deploy-global'].replace('%run% ', runTime);
        djsconfig.scripts['delete-dev'] = djsconfig.scripts['delete-dev'].replace('%run% ', runTime);
        djsconfig.scripts['delete-global'] = djsconfig.scripts['delete-global'].replace('%run% ', runTime);
        djsconfig.scripts['update-dev'] = djsconfig.scripts['update-dev'].replace('%run% ', runTime);
        djsconfig.scripts['update-global'] = djsconfig.scripts['update-global'].replace('%run% ', runTime);

        writeFileSync(`./${name}/djsconfig.json`, JSON.stringify(djsconfig, null, 4), (err) => {
            if (err) return console.log('An error occurred updating the djsconfig.json file') && process.exit(1);
        });
    } catch (err) {
        console.log('An error occurred creating the djsconfig.json file') && process.exit(1);
    }

    // Update package.json
    try {
        var package = JSON.parse(readFileSync(`./${name}/package.json`, 'utf8'));

        package.name = name.toString().toLowerCase().replace(/ /g, '-');
        package.description = 'A Discord.js bot created with the discordjs-cli';

        writeFileSync(`./${name}/package.json`, JSON.stringify(package, null, 4), (err) => {
            if (err) return console.log('An error occurred updating the package.json file') && process.exit(1);
        });
    } catch (err) {
        console.log('An error occurred creating the package.json file') && process.exit(1);
    }

    // Add config folder for bot config
    mkdirSync(`./${name}/src/config`, (err) => {
        if (err) return console.log('An error occurred config folder') && process.exit(1);
    });

    // Add bot config JSON
    writeFileSync(`./${name}/src/config/config.json`, JSON.stringify(configJSON, null, 4), (err) => {
        if (err) return console.log('An error occurred creating ./src/config/config.json') && process.exit(1);
    });
    configSpinner.success();

    /******************************
     *      NPM installation      *
     ******************************/
    var npmInstall = createSpinner(chalk.blue('Installing node modules...'), {
        color: 'white',
    }).start();
    execSync(`cd "${name}"; npm i`);
    npmInstall.success();

    console.log('');

    puts(chalk.blue(chalk.bold(name)));
    puts(` has been created. Add the bots token to the`);
    puts(chalk.green(' ./src/config/config.json'));
    puts(' file. Lastly, execute');
    puts(chalk.yellow(' djs run'));
    puts(` to start your bot!\n\n`);
}

module.exports = newDiscordBot;
