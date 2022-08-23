import help from './modules/help';
import intro from './modules/intro';
import newDiscordBot from './modules/create';
import generate from './modules/generate';
import run from './modules/run';
import initDiscordBot from './modules/init';

const arg = require('arg');
const chalk = require('chalk');
const { stdout, stdin } = require('process');

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--help': Boolean,
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        help: args['--help'] || false,
        operation: args._[0],
        type: args._[1],
        component: args._[2],
    }
}

export function cli(args) {
    var options = parseArgs(args);

    var nodeJSversion = parseInt(process.version.toString().split('.')[0].replace('v', ''));

    if (nodeJSversion < 16) stdout.write(chalk.red('\nWARNING: ')) && stdout.write('This package was made for version ^16 of Node. You may experience errors on earlier versions of Node.\n\n');

    if (options.help) return help();

    switch (options.operation) {
        case 'new':
            newDiscordBot(options);
            break;

        case 'run':
            run();
            break;

        case 'g':
            generate(options);
            break;

        case 'generate':
            generate(options);
            break;

        case 'init':
            initDiscordBot();
            break;

        case undefined:
            intro();
            break;

        default:
            console.log('> Unknown command, process exited');
            return process.exit(1);
    }

}