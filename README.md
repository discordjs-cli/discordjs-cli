### ⚠️ BETA RELEASE ⚠️
# A CLI for creating Discord.js bots with ease.

## Installation:
NOTE: You'll need to install the CLI globally in order for it to work. You may need to install with sudo as well.

```
sudo npm i -g @discordjs-cli/discordjs-cli
```

### Create a project
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

### Initiate a project
Initiate an existing project like so:
```
djs init
```
This will walk you through the process of initiating an existing project. 

NOTE: This only works for projects with the proper file structure.

Once your bot has been initiated, you can run:

```
djs run
```

And your bot should be online!

# Add commands, buttons, menus, etc!
### NOTE: Commands must be run in the app root

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

This will create a new subcommand template in our `./src/interactions/slash_commands/<command>` folder, and import the subcommand function into the parent command. I prefer to use switch cases to handle subcommands, but play around with it to see what you prefer :D

# Misc commands

To check the version of djs, run the following command:
```
djs --version
```

## Im still working on getting this to version 1, but I hope theres an appeal for it! :D
If you've worked with the Angular CLI, then this will look familiar xD

I work on quite a few bots, and I thought for sure theres got to be a faster way to go about things. I present to you: the Discord.js CLI 🎉

TODO: Add menus, menu options, buttons, legacy commands, etc.

If you have any suggestions, feel free to add them to the GitHub repo! I want this to be the most epic thing since sliced bread :D