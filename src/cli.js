import help from './modules/help';
import intro from './modules/intro';
import newDiscordBot from './modules/new';
import generate from './modules/generate';
import run from './modules/run';
import initDiscordBot from './modules/init';
import version from './modules/version';
import compareVersion from './modules/compare_version';
import update from './modules/update';
import puts from 'putsjs';

const arg = require('arg');
const chalk = require('chalk');

function parseArgs(rawArgs) {
    const args = arg(
        {
            '--help': Boolean,
            '--version': Boolean,
            '-v': '--version',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        help: args['--help'] || false,
        version: args['--version'] || false,
        operation: args._[0],
        type: args._[1],
        component: args._[2],
    };
}

export async function cli(args) {
    var options = parseArgs(args);

    var nodeJSversion = parseInt(process.version.toString().split('.')[0].replace('v', ''));

    if (nodeJSversion < 16) puts(chalk.red('\nWARNING: ')) && puts('This package was made for version ^16 of Node. You may experience errors on earlier versions of Node.\n\n');

    if (options.help) return help();

    if (options.version) return version();

    switch (options.operation) {
        case 'new':
            await newDiscordBot(options);
            var num = Math.floor(Math.random() * 10);
            if (num > 7) compareVersion();
            break;

        case 'init':
            await initDiscordBot();
            var num = Math.floor(Math.random() * 10);
            if (num > 7) compareVersion();
            break;

        case 'update':
            await update();
            break;

        case 'run':
            run();
            break;

        case 'g':
            await generate(options);
            break;

        case 'generate':
            await generate(options);
            break;

        case undefined:
            await intro();
            var num = Math.floor(Math.random() * 10);
            if (num > 7) compareVersion();
            break;

        default:
            console.log('> Unknown command, process exited');
            return process.exit(1);
    }
}
