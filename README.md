### ⚠️ BETA RELEASE ⚠️
# A CLI for creating Discord.js bots with ease.

##### Main updates:
- Added deployment/update/delete script references to the djsconfig.json file
- Added deployment/update/delete scripts to src/

## ⚙️ Installation:
NOTE: You'll need to install the CLI globally in order for it to work. Nodemon is used to run the projects, so go ahead and install that as well.

```
sudo npm i -g @discordjs-cli/discordjs-cli
sudo npm install -g nodemon
```

## 🌚 Create a project

Supported frameworks:

- JavaScript
- TypeScript

Initiate a new project like so:
```
djs new <project name>
```
This will walk you through the setup process of creating a new Discord.js, or Discord.ts bot.

Once your bot has been made, you can `cd` into the bot directory. The bot itself is in the ./src folder. In the ./src folder, theres a config folder that has a config.json file inside. Add your bots token, client ID, etc. and then run:

```
djs run
```

And your bot should be online!

## 🔨 Initiate a project
Initiate an existing project like so:
```
djs init
```
This will walk you through the process of initiating an existing project. 

###### NOTE: This only works for projects with the proper file structure.

Once your bot has been initiated, you can run:

```
djs run
```

And your bot should be online!

## 😌 Add commands, buttons, menus, etc!

# /Slash commands
#### NOTE: Slash commands need to be deployed in order for them to show up on discord
### Create a slash command
To create a slash command, run the following command:
```
# alternatively, use djs g c <command-name>
djs generate command <command-name>
```

This will create a new slash command template in our `./src/interactions/slash_commands` folder.

### Adding a sub command
To create a subcommand, run the following command:
```
# alternatively, use djs g s <command-name/subcommand-name>
djs generate subcommand <command-name/subcommand-name>
```

### Deploying slash commands
###### NOTE: By default, commands are run for DEV commands; to the guild specified in your config.json file. Specify the `-g` flag in the command, ie. `djs deploy -g`, to run globally.

To deploy slash commands, run the following command:
```
djs deploy
```

### Updating slash commands
To update slash commands, run the following command:
```
djs update
```

### Deleting slash commands
###### NOTE: This does NOT delete any files. It simply sets the bots commands to an empty array.
To delete slash commands, run the following command:
```
djs delete
```

# !Legacy commands
### Create a legacy command
To create a legacy command, run the following command:
```
# alternatively, use djs g l <command-name>
djs generate legacy <command-name>
```

This will create a new legacy command template in our `./src/interactions/legacy_commands/` folder.

## Misc commands

To check the version of djs, run the following command:
```
djs --version
```

To update the CLI, run the following command:
```
djs --update
```

This will run `sudo npm i -g @discordjs-cli/discordjs-cli`. Note, you may be prompted for your password as the command is run with sudo.


## Im still working on getting this to version 1, but I hope theres an appeal for it! :D
If you've worked with the Angular CLI, then this will look familiar xD

I work on quite a few bots, and I thought for sure theres got to be a faster way to go about things. I present to you: the Discord.js CLI 🎉

TODO: Add menus, menu options, buttons, etc.

If you have any suggestions, feel free to add them to the GitHub repo! I want this to be the most epic thing since sliced bread :D