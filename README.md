### ⚠️ BETA RELEASE ⚠️
# A CLI for creating Discord.js bots with ease.

##### Main updates:
- Added: menus and menu options
- Bug fix: none
- Update: documentation

Report bugs [here](https://github.com/discordjs-cli/discordjs-cli/issues)

-------------------------------------------------------------------------------------

## ⚙️ Installation:
NOTE: You'll need to install the CLI globally in order for it to work. Nodemon is used to run the projects, so go ahead and install that as well.

##### Node v16+ is required

```
sudo npm i -g @discordjs-cli/discordjs-cli
sudo npm install -g nodemon
```

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

# 😌 Add commands, buttons, menus, etc!

-------------------------------------------------------------------------------------

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

-------------------------------------------------------------------------------------

# !Legacy commands
### Create a legacy command
To create a legacy command, run the following command:
```
# alternatively, use djs g l <command-name>
djs generate legacy <command-name>
```

This will create a new legacy command template in our `./src/interactions/legacy_commands/` folder.

-------------------------------------------------------------------------------------

# 🔘 Buttons
### Create a button
Button types:
- Blank (blank button)
- Role (reaction role button)

To create a button, run the following command:
```
# alternatively, use djs g b <button-id>
djs generate button <button-id>
```

Next, you'll be prompted for a row name:
```
> Row (default is button ID):
```

You can then choose which button template you want:
```
> Button type: (Use arrow keys)
❯ Blank 
  Role
```

Selecting "Blank" will create a blank template, while selecting "Role" will have one more prompt for a role ID:
```
> Role ID (leave blank to add later): 
```

And thats it! When a role with the button ID you provided is clicked, the newly created button handler will run!

-------------------------------------------------------------------------------------

# 📂 Menus
### Create a menu
To create a menu, run the following command:
```
# alternatively, use djs g menu <menu-name/option-id>
djs generate menu <menu-name/option-id>
```
This will create a folder in our "./src/menus" directory with the "menu-name" name, if none exists, then create our menu option file. The newly created menu file will be triggered when a menu with the the menu ID and menu option we specified in the command is selected.

-------------------------------------------------------------------------------------

# Misc commands

To check the version of djs, run the following command:
```
djs --version
```

To update the CLI, run the following command:
```
djs --update
```

This will run `sudo npm i -g @discordjs-cli/discordjs-cli`. Note, you may be prompted for your password as the command is run with sudo.

-------------------------------------------------------------------------------------

## Im still working on getting this to version 1, but I hope theres an appeal for it! :D
If you've worked with the Angular CLI, then this will look familiar xD

I work on quite a few bots, and I thought for sure theres got to be a faster way to go about things. I present to you: the Discord.js CLI 🎉

TODO: Add modals, and the one clicky thingy i forgor what its called 💀

If you have any suggestions, feel free to add them to the [discussions page](https://github.com/discordjs-cli/discordjs-cli/discussions) on the GitHub repo! I want this to be the most epic thing since sliced bread :D