const slashCommand = require('./components/slash_command');
const subCommand = require('./components/sub_command');

async function generate(options) {
    if (options.type === undefined) {
        console.log('Specify a type. Run the "djs --help" command for more.');
        return;
    };

    if (options.type === 'command' || options.type === 'c') return slashCommand(options);
    if (options.type === 'subcommand' || options.type === 's') return subCommand(options);


};

module.exports = generate;