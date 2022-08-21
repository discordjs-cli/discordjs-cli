const { stdout } = require('process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

async function config() {
    var config = await inquirer.prompt({
        name: 'framework',
        type: 'list',
        prefix: '>',
        message: 'Default framework:\n',
        choices: [
            'JavaScript',
            'TypeScript'
        ]
    });

    var framework = config.framework;

    var s = fs.readFileSync('djs.json');

    console.log(c)
};

module.exports = config;