try {
	var Discord = require("discord.js");
} catch (e) {
	console.log("You need to install discord.js!!!");
}


var Discord = require("discord.js");
var botConfiguration = require("./botConfig.json");
var prefix = (botConfiguration.prefix);
var commandsList = ("\n" + prefix + "ping\n" + prefix + "help\n" + prefix + "git\n" + prefix + "admintest")
var bot = new Discord.Client();

bot.on("message", function(message) {
	var adminList = (message.author.id === ("133483105645232129"));

    if(message.content === (prefix + "ping")) {
        bot.reply(message, "pong");
    }

    if(message.content === (prefix + "help")) {
        bot.reply(message, "**Flandre Scarlet**: An open source bot made for anybody by Flandre Scarlet!\n\nMy current prefix is `" + prefix + "`\n**CURRENT COMMANDS**" + commandsList);
    }

    if(message.content === (prefix + "git")) {
        bot.reply(message, "Here is my github repository! \n**https://github.com/FlandereScarlet/flan-chanbot/**");
    }


    if(message.content === (prefix + "admintest") && adminList) {
        bot.reply(message, "✅ | All seems to be good with you! you seem to be an ADMIN!");
    } else if(message.content === (prefix + "admintest")) {
    	bot.reply(message, "❌ | Either you havent added yourself to the adminList variable...or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!")
    }

});

if (botConfiguration.useEmail === false) {
		bot.loginWithToken(botConfiguration.token);
} else if (botConfiguration.useEmail === true) {
	bot.loginWithToken(botConfiguration.email, botConfiguration.password);
}

