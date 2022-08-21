const { stdout } = require('process');
const chalk = require('chalk');

async function generate(options) {
    if (options.type === undefined) {
        console.log('Specify a component. Run the "djs --help" command for more.');
        return;
    };

    console.log(options);
};

module.exports = generate;