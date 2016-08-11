// Dependencies
var discord = require("discord.js");
var fs = require('fs');
var util = require('util');
var http = require('http');
var bot = new discord.Client();

// Config
var config = require("./botConfig.json");
var prefix = (config.prefix);

// Functions

function calcUptime() {
    var time = 0;
    var days = 0;
    var hrs = 0;
    var min = 0;
    var sec = 0;
    var temp = Math.floor(bot.uptime / 1000);
    sec = temp % 60;
    temp = Math.floor(temp / 60);
    min = temp % 60;
    temp = Math.floor(temp / 60);
    hrs = temp % 24;
    temp = Math.floor(temp / 24);
    days = temp;
    var dayText = " days ";
    if (days == 1) {
        dayText = " day ";
    }
	
	var upText = "Uptime: `" + days + dayText + hrs + ":" + min + ":" + sec + "`";
	
    return upText;
}

// Giant ready thing
bot.on("ready", function() {
	console.log("*- flan-chanbot: made by Flandre Scarlet -*");
	console.log("Prefix: " + config.prefix);
	console.log("Using Email: " + config.useEmail);
	console.log("Logging Enabled: " + config.log);
	console.log("Owner ID: " + config.ownerID);
	console.log("Bot ID: " + bot.user.id)
	if (config.logchannel === ("") && config.log === false) {
		console.log("Currently not using log channel ID.");
	} else if (config.logchannel + ("") && config.log === true) {
		console.log("You seem to be using a channel id.");
	}
	if (config.logchannel === ("") && config.log === true) {
		console.log("Currently not using log channel ID, you also have the log setting set to true..")
	} else if (config.logchannel + ("") && config.log === false) {
		console.log("You seem to be using a channel id, with logging set to false.  For this to work, turn it ON.")
	}
});

// Commands
var commands = {};

// Help
commands.help = {
	name: "help",
	desc: "This help command.",
	longDesc: "The help command. Give it an argument to see more information about a command.",
	usage: "[command]",
	main: function(bot, msg, args) {
		if (args.length === 0) {
			var helpStart = util.format("%s - %s\n", config.botName, config.botDesc);
			var helpThing = "";
			var cmd;
			for (cmd in commands) {
				if (commands[cmd].usage !== undefined) {
					var command = util.format("**%s %s** - %s\n", commands[cmd].name, commands[cmd].usage, commands[cmd].desc);
					helpThing += command;
				} else {
					var command = util.format("**%s** - %s\n", commands[cmd].name, commands[cmd].desc);
					helpThing += command;
				}
			}
			bot.sendMessage(msg, "Help has been sent to your DMs.")
			bot.sendMessage(msg.author.id, helpStart + helpThing);
		} else if (args.length === 1) {
			var cmd = commands[args[0]];
			if (cmd !== undefined && cmd.usage !== undefined) {
				bot.sendMessage(msg, util.format("**%s %s** - %s", cmd.name, cmd.usage, cmd.longDesc));
			} else if (cmd !== undefined) {
				bot.sendMessage(msg, util.format("**%s** - %s", cmd.name, cmd.longDesc));
			} else if (cmd === undefined) {
				bot.reply(msg, "I'm sorry, but that command does not seem to exist.");
			}
		}
	}
}

// Ping
commands.ping = {
	name: "ping",
	desc: "Pong!",
	longDesc: "Used to check the ping time of the bot, and also a lightweight way to check if it is still running properly.",
	main: function(bot, msg) {
		var start = Date.now();
		bot.sendMessage(msg, 'Pong!').then(m => {
			var end = Date.now();
			var diff = end - start;
			bot.updateMessage(m, 'Pong! `' + diff + 'ms`');
		});
	}
}

// Uptime
commands.uptime = {
	name: "uptime",
	desc: "Check uptime of the bot.",
	longDesc: "Used to check the time that the bot has been up without restarting or crashing.",
	main: function(bot, msg) {
		bot.sendMessage(msg, calcUptime());
	}
}

// Git
commands.git = {
	name: "git",
	desc: "Displays the link to the GitHub repository.",
	longDesc: "Posts the link to the public GitHub repository which has my source code.",
	main: function(bot, msg) {
		bot.reply(msg, "My GitHub repo can be found here: **https://github.com/FlandereScarlet/flan-chanbot/**");
	}
}

// MyInfo
commands.myinfo = {
	name: "myinfo",
	desc: "Tells you information about yourself.",
	longDesc: "Displays various information about the use that executed the command.",
	main: function(bot, msg) {
		if (msg.author.game !== null) {
			bot.sendMessage(msg, `***Displaying information for ${msg.author.username}***
User ID: ${msg.author.id}
Avatar: ${msg.author.avatarURL}
Discriminator: ${msg.author.discriminator}
Playing: ${msg.author.game.name}
Voice Channel: ${msg.author.voiceChannel}`);
		} else {
		bot.sendMessage(msg, `***Displaying information for ${msg.author.username}***
User ID: ${msg.author.id}
Avatar: ${msg.author.avatarURL}
Discriminator: ${msg.author.discriminator}
Playing: Nothing.
Voice Channel: ${msg.author.voiceChannel}`);
		}
	}
}

// Eval
commands.eval = {
	name: "eval",
	desc: "Evaluate code.",
	longDesc: "",
	usage: "<code>",
	adminOnly: true,
	main: function(bot, msg) {
		var args = msg.content.substring(prefix.length + 5, msg.content.length);
		try {
			var evaled = eval(args);
			bot.sendMessage(msg, `\`\`\`xl
Input: ${args}
Output: ${evaled}
\`\`\``);
		} catch (e) {
			bot.sendMessage(msg, `\`\`\`xl
Input: ${args}
Error: ${e}
\`\`\``);
		}
	}
}

// AdminTest
commands.admintest = {
	name: "admintest",
	desc: "Test if you are in the admin list.",
	longDesc: "Quick test that only checks if your id is in the admin list.",
	main: function(bot, msg) {
		fs.readFile('./adminList.json', (err, data) => {
			if (!err) {
				var adminList = JSON.parse(data);
				if (adminList.indexOf(msg.author.id) > -1 || msg.author.id === config.ownerID) {
					bot.reply(msg, ":white_check_mark: You are on the admin list.");
				} else if (adminList.indexOf(msg.author.id) === -1) {
					bot.reply(msg, ":negative_squared_cross_mark: You are not on the admin list.")
				}
			}
		});
	}
}

// Config
commands.config = {
	name: "config",
	desc: "Views the current config file.",
	longDesc: "Displays the various variables inside of the bot config file.",
	adminOnly: true,
	main: function(bot, msg) {
		bot.sendMessage(msg, `__**Current configuration**__
**Prefix:** ${config.prefix}`);
	}
}

// Admin
commands.admin = {
	name: "admin",
	desc: "Edit the admin list.",
	longDesc: "Allows you to add or remove people from the admin list.",
	usage: "<add/remove> <user mention>",
	adminOnly: true,
	main: function(bot, msg, args) {
		fs.readFile("./adminList.json", (err, data) => {
			if (!err) {
				var adminList = JSON.parse(data);
				if (args[0] === "add") {
					if (msg.mentions.length === 1) {
						if (adminList.indexOf(msg.mentions[0].id) === -1) {
							var addedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							adminList.push(msg.mentions[0].id);
							var newAdminList = JSON.stringify(adminList);
							fs.writeFile("./adminList.json", newAdminList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully added " + addedUser + " to the admin list.");
								}
							});
						} else if (adminList.indexOf(msg.mentions[0].id) > -1) {
							bot.sendMessage(msg, "That user is already in the admin list.");
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to add to the admin list.");
					}
				} else if (args[0] === "remove") {
					if (msg.mentions.length === 1) {
						if (adminList.indexOf(msg.mentions[0].id) > -1) {
							var removedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							delete adminList[message.mentions[0].id];
							var newAdminList = JSON.stringify(adminList);
							fs.writeFile("./adminList.json", newAdminList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully removed " + removedUser + " from the admin list.");
								}
							});
						} else if (adminList.indexOf(msg.mentions[0].id) === -1) {
							bot.sendMessage(msg, "That user is not in the admin list.");
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to remove from the admin list.");
					}
				} else {
					bot.sendMessage(msg, "This is not a valid argument.");
				}
			}
		});
	}
}

// Blacklist
commands.bl = {
	name: "bl",
	desc: "Edit the blacklist to prevent people from using the bot.",
	longDesc: "Allows you to blacklist people from using the bot if they are abusing it.",
	usage: "<add/remove> <user mention>",
	adminOnly: true,
	main: function(bot, msg, args) {
		fs.readFile("./blackList.json", (err, data) => {
			if (!err) {
				var blackList = JSON.parse(data);
				if (args[0] === "add") {
					if (msg.mentions.length === 1) {
						if (blackList.indexOf(msg.mentions[0].id) === -1) {
							var addedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							blackList.push(msg.mentions[0].id);
							var newBlackList = JSON.stringify(blackList);
							fs.writeFile("./blackList.json", newBlackList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully blacklisted " + addedUser);
								}
							});
						} else if (blackList.indexOf(msg.mentions[0].id) > -1) {
							bot.sendMessage(msg, "That user is already blacklisted.");
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to blacklist.");
					}
				} else if (args[0] === "remove") {
					if (msg.mentions.length === 1) {
						if (blackList.indexOf(msg.mentions[0].id) > -1) {
							var removedUser = util.format("%s#%s", msg.mentions[0].username, msg.mentions[0].discriminator);
							delete blackList[msg.mentions[0].id];
							var newBlackList = JSON.stringify(blackList);
							fs.writeFile("./blackList.json", newBlackList, (writeErr) => {
								if (!writeErr) {
									bot.sendMessage(msg, "Successfully stopped blacklisting " + removedUser);
								}
							});
						} else if (blackList.infexOf(msg.mentions[0].id) === -1) {
							bot.sendMessage(msg, "That user is not in the blacklist.")
						}
					} else if (msg.mentions.length !== 1) {
						bot.sendMessage(msg, "Please mention **1 (one)** person you wish to stop blacklisting.");
					}
				} else {
					bot.sendMessage(msg, "That is not a valid argument.")
				}
			}
		});
	}
}

// Set
commands.set = {
	name: "set",
	desc: "Set the various information of the bot.",
	longDesc: "Allows you to set the nickname, username and game/status of the bot.",
	usage: "<name/nick/game/status>",
	adminOnly: true,
	main: function(bot, msg, args) {
		var specialArgs = msg.content.substring(prefix.length + 4, msg.content.length);
		if (args[0] === "name") {
			var nameArgs = specialArgs.substring(5, specialArgs.length);
			bot.setUsername(nameArgs, (err) => {
				if (!err) {
					bot.sendMessage(msg, ":thumbsup:");
				} else {
					bot.sendMessage(msg, "Error when attempting to change username.\n```" + err + "```");
				}
			});
		} else if (args[0] === "nick") {
			var nickArgs = specialArgs.substring(5, specialArgs.length);
			bot.setNickname(msg.server, nickArgs, (err) => {
				if (!err) {
					bot.sendMessage(msg, ":thumbsup:");
				} else {
					bot.sendMessage(msg, "Error when attempting to change nickname.\n```" + err + "```");
				}
			});
		} else if (args[0] === "game") {
			var gameArgs = specialArgs.substring(5, specialArgs.length);
			if (gameArgs !== "") {
				bot.setPlayingGame(gameArgs, (err) => {
					if (!err) {
						bot.sendMessage(msg, ":thumbsup:");
					} else {
						bot.sendMessage(msg, "Error when attempting to change playing game.\n```" + err + "```");
					}
				});
			} else if (gameArgs === "") {
				bot.setPlayingGame(null);
			}
		} else if (args[0] === "status") {
			var statusArgs = specialArgs.substring(7, specialArgs.length);
			if (statusArgs === "online" || statusArgs === "here" || statusArgs === "active" || statusArgs === "available") {
				bot.setStatusOnline();
			} else if (statusArgs === "idle" || statusArgs === "away") {
				bot.setStatusIdle();
			} else {
				bot.sendMessage(msg, "That is not a valid status. Valid statuses are: `online/here/active/available` and `idle/away`");
			}
		} else {
			bot.sendMessage(msg, "There is nothing like that which I can set.");
		}
	}
}

// F
commands.f = {
	name: "f",
	desc: "Pay respects.",
	longDesc: "Allows the user to pay their respects if someone or something is R.I.P.",
	main: function(bot, msg) {
		bot.sendMessage(msg, msg.author + " has paid their respects.");
	}
}

// Command Handler
bot.on('message', msg => {
	if (msg.content.startsWith(config.prefix)) {
		var noPrefix = msg.content.substring(config.prefix.length, msg.content.length);
		var noPrefixSplit = noPrefix.split(" ");
		var cmd = noPrefixSplit[0];
		var preArgs = msg.content.substring(prefix.length + noPrefixSplit[0], msg.content.length);
		var args = preArgs.split(" ");
		args.shift();
		if (commands[cmd] !== undefined) {
			if (commands[cmd].adminOnly) {
				fs.readFile('./adminList.json', (err, listData) => {
					if (!err) {
						var adminList = JSON.parse(listData);
						if (adminList.indexOf(msg.author.id) > -1 || msg.author.id === config.ownerID) {
							commands[cmd].main(bot, msg, args);
						} else {
							bot.sendMessage(msg, util.format('I\'m sorry, but you need to be on the admin list in order to run this command.'));
						}
					} else if (err) {
						bot.sendMessage(msg, `Experienced error while trying to execute command \`${cmd}\`.
\`\`\`
${err}
\`\`\``);
					}
				});
			} else {
				fs.readFile('./blackList.json', (err, blData) => {
					if (!err) {
						var blackList = JSON.parse(blData);
						if (blackList.indexOf(msg.author.id) === -1) {
							commands[cmd].main(bot, msg, args);
						}
					} else if (err) {
						bot.sendMessage(msg, `Experienced error while trying to execute command \`${cmd}\`.
\`\`\`
${err}
\`\`\``);
					}
				});
			}
		}
	}

	if (msg.content.startsWith("<@" + bot.user.id + "> prefix")) {
		bot.reply(msg.channel.id, "***My prefix is *** `" + prefix + "`!");
	}
});

if (config.useEmail === false) {
	bot.loginWithToken(config.token);
} else if (config.useEmail === true) {
	bot.login(config.email, config.password);
}
