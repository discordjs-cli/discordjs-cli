const buttonBuilder = require('./components/button');
const legacyCommand = require('./components/legacy_command');
const slashCommand = require('./components/slash_command');
const subCommand = require('./components/sub_command');

async function generate(options) {
    if (options.type === undefined) {
        console.log('Specify a type. Run the "djs --help" command for more.');
        return;
    };

    if (options.type === 'command' || options.type === 'c') return slashCommand(options);
    if (options.type === 'subcommand' || options.type === 's') return subCommand(options);
    if (options.type === 'legacy' || options.type === 'l') return legacyCommand(options);
    if (options.type === 'button' || options.type === 'b') return buttonBuilder(options);
};

module.exports = generate;