// dont edit ANYTHING
try {
    var Discord = require("discord.js");
} catch (e) {
    console.log("You need to install discord.js!!!");
}
var fs = require('fs');
var util = require('util');

var botConfiguration = require("./botConfig.json");
var prefix = (botConfiguration.prefix);
var commandsList = ("\n" + prefix + "ping\n" + prefix + "help\n" + prefix + "git\n" + prefix + "admintest\n" + prefix + "myinfo\n" + prefix + "config (ADMIN ONLY)\n" + prefix + "adminadd\n");
var bot = new Discord.Client();


bot.on("ready", function() {
    console.log("*- flan-chanbot: made by Flandre Scarlet -*");
    console.log("Current Configuration: ");
    console.log("PREFIX: " + botConfiguration.prefix);
    console.log("USING EMAIL: " + botConfiguration.useEmail);
    console.log("ENABLED LOGGING JOIN & LEAVE: " + botConfiguration.log);
    if (botConfiguration.logchannel === ("") && botConfiguration.log === false) {
        console.log("Currently not using log channel ID.");
    } else if (botConfiguration.logchannel + ("") && botConfiguration.log === true) {
        console.log("You seem to be using a channel id.");
    }
    if (botConfiguration.logchannel === ("") && botConfiguration.log === true) {
        console.log("Currently not using log channel ID, you also have the log setting set to true..")
    } else if (botConfiguration.logchannel + ("") && botConfiguration.log === false) {
        console.log("You seem to be using a channel id, with logging set to false.  For this to work, turn it ON.")
    }
});


bot.on("message", message => {
    // DONT EDIT ANYTHING ELSE..

    if (message.content === prefix + "ping") {
        var pingStart = Date.now();
        bot.sendMessage(message, "Pong").then(msg => {
            var pingEnd = Date.now();
            var pingDiff = pingEnd - pingStart;
            bot.updateMessage(msg, "Pong `" + pingDiff + "ms`");
        })
    }

    if (message.content === "<@189173793422442496> prefix") {
        bot.reply(message, "***MY CURRENT PREFIX IS*** `" + prefix + "`!");
    }

    if (message.content === prefix + "help") {
         bot.sendMessage(message, "**" + botConfiguration.botName + "**: " + botConfiguration.botDesc + "\n\nMy current prefix is `" + prefix + "`\n**CURRENT COMMANDS**" + commandsList);
    }

    if (message.content === prefix + "git") {
        bot.reply(message, "Here is my github repository! \n**https://github.com/FlandereScarlet/flan-chanbot/**");
    }

    if (message.content === prefix + "myinfo") {
        bot.sendMessage(message, "***Displaying Information for " + message.author.username + "***\n\nUser ID: " + message.author.id + "\nAvatar: " + message.author.avatarURL + "\nDiscriminator: " + message.author.discriminator + "\nPlaying: " + message.author.game.name + "\nThe voice channel you are in is..." + message.author.voiceChannel + "!");
    }

    if (message.content.startsWith(prefix + "eval ")) {
        fs.readFile('./adminList.json', (err, data) => {
			if (!err) {
            	var adminList = JSON.parse(data);
            	if (adminList.indexOf(message.author.id) > -1) {
                	var evalLength = prefix.length + "eval ".length;
                	var evalArgs = message.content.substring(evalLength, message.content.length);
                	try {
                    	var evaled = eval(evalArgs);
                    	bot.sendMessage(message, util.format("```xl\nInput: %s\nOutput: %s\n```", evalArgs, evaled));
                	} catch (err) {
                 		bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
                	}
            	} else if (adminList.indexOf(message.author.id) === -1) {
                	bot.reply(message, ":x: | Either you havent added yourself to the adminList file... or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!");
            	}
			} else {
				bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
			}
		});
    }

    if (message.content === prefix + "admintest") {
        fs.readFile('./adminList.json', (err,data) => {
			if (!err) {
            	var adminList = JSON.parse(data);
            	if (adminList.indexOf(message.author.id) > -1) {
                	bot.reply(message, ":white_check_mark: | All seems to be good with you! you seem to be an ADMIN!");
            	} else if (adminList.indexOf(message.author.id) === 1) {
                	bot.reply(message, ":x: | Either you havent added yourself to the adminList file... or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!");
            	}
			} else {
            	bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
			}
        });
    }

    if (message.content === prefix + "config") {
        fs.readFile('./adminList.json', (err, data) => {
			if (!err) {
            	var adminList = JSON.parse(data);
            	if (adminList.indexOf(message.author.id) > -1) {
                	bot.sendMessage(message, "***Current Configuration for the Bot*** (Important SERVER stuff.)\nPREFIX: `" + botConfiguration.prefix + "`\n-   *More coming soon!*");
            	} else if (adminList.indexOf(message.author.id) === -1) {
                	bot.reply(message, ":x: | Either you havent added yourself to the adminList file... or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!");
            	}
			} else {
                bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
			}
        });
    }

    if (message.content.startsWith(prefix + "adminadd")) {
        fs.readFile('./adminList.json', (err, data) => {
            if (!err) {
                var adminList = JSON.parse(data);
                if (adminList.indexOf(message.author.id) > -1) {
                    if (message.mentions.length === 1) {
                        if (adminList.indexOf(message.mentions[0].id) === -1) {
                            adminList.push(message.mentions[0].id);
                            var newAdminList = JSON.stringify(adminList);
                            fs.writeFile('./adminList.json', newAdminList, (writeErr) => {
                                var addedUser = util.format("%s#%s", message.mentions[0].username, message.mentions[0].discriminator);
                                bot.sendMessage(message, util.format("Successfully added %s to the admin list.", addedUser));
                            });
                        } else {
                            bot.reply(message, "That person is already added to the admin list.");
                        }
                    } else {
                        bot.reply(message, "Please mention **1 (one)** person you wish to add to the admin list.");
                    }
                } else if (adminList.indexOf(message.author.id) === -1) {
                    bot.reply(message, ":x: | Either you havent added yourself to the adminList file... or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!");
                }
            } else {
                bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
            }
        });
    }

    if (message.content.startsWith(prefix + "adminrem")) {
        fs.readFile('./adminList.json', (err, data) => {
            if (!err) {
                var adminList = JSON.parse(data);
                if (adminList.indexOf(message.author.id) > -1) {
                    if (message.mentions.length === 1) {
                        if (adminList.indexOf(message.mentions[0].id) !== -1) {
                            delete adminList[message.mentions[0].id];
                            var removedUser = util.format("%s#%s", message.mentions[0].username, message.mentions[0].discriminator);
                            var newAdminList = JSON.stringify(adminList);
                            fs.writeFile('./adminList.json', newAdminList, (writeErr) => {
                                bot.sendMessage(message, util.format("Successfuly removed %s from the admin list.", removedUser));
                            });
                        } else {
                            bot.reply(mess, "That user is not in the admin list!");
                        }
                    } else {
                        bot.reply(message, "Please mention **1 (one)** person you wish to remove from the admin list.");
                    }
                } else if (adminList.indexOf(message.author.id) === -1) {
                    bot.reply(message, ":x: | Either you havent added yourself to the adminList file... or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!");
                }
            } else {
                bot.sendMessage(message, "Caught Error\n```\n" + err + "\n```");
            }
        });
    }

    if (message.content === prefix + "f") {
        bot.sendMessage(message.channel, message.author + " has paid respects.");
    }

});



if (botConfiguration.useEmail === false) {
    bot.loginWithToken(botConfiguration.token);
} else if (botConfiguration.useEmail === true) {
    bot.login(botConfiguration.email, botConfiguration.password);
}
