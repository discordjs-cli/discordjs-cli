const { stdout } = require('process');
const chalk = require('chalk');
const slashCommand = require('./components/slash_command');

async function generate(options) {
    if (options.type === undefined) {
        console.log('Specify a component. Run the "djs --help" command for more.');
        return;
    };

    if (options.type === 'command' || options.type === 'c') return slashCommand(options);
    if (options.type === 'command' || options.type === 'c') return slashCommand(options);
};

module.exports = generate;