// dont edit ANYTHING

try {
	var Discord = require("discord.js");
} catch (e) {
	console.log("You need to install discord.js!!!");
}

var botConfiguration = require("./botConfig.json");
var prefix = (botConfiguration.prefix);
var commandsList = ("\n" + prefix + "ping\n" + prefix + "help\n" + prefix + "git\n" + prefix + "admintest\n" + prefix + "myinfo\n" + prefix + "config (ADMIN ONLY)\n")
var bot = new Discord.Client();


bot.on("ready", function () {
	console.log("*- flan-chanbot: made by Flandre Scarlet -*");
	console.log("Current Configuration: ")
	console.log("PREFIX: " + botConfiguration.prefix);
	console.log("USING EMAIL: " + botConfiguration.useEmail);
	console.log("ENABLED LOGGING JOIN & LEAVE: " + botConfiguration.log);
	if (botConfiguration.logchannel === ("") && botConfiguration.log === false) {
		console.log("Currently not using log channel ID.")
	} else if (botConfiguration.logchannel + ("") && botConfiguration.log === true) {
		console.log("You seem to be using a channel id.")
	}
	if (botConfiguration.logchannel === ("") && botConfiguration.log === true) {
		console.log("Currently not using log channel ID, you also have the log setting set to true..")
	} else if (botConfiguration.logchannel + ("") && botConfiguration.log === false) {
		console.log("You seem to be using a channel id, with logging set to false.  For this to work, turn it ON.")
	}
});


bot.on("message", function(message) {
	// k continue editing
	var adminList = (message.author.id === ("133483105645232129"));


// DONT EDIT ANYTHING ELSE..

    if(message.content === (prefix + "ping")) {
        bot.reply(message, "pong");
    }

    if(message.content === ("<@189173793422442496> prefix")) {
        bot.reply(message, "***MY CURRENT PREFIX IS*** `" + prefix + "`!");
    }

    if(message.content === (prefix + "help")) {
        bot.sendMessage(message, "**Flandre Scarlet**: An open source bot made for anybody by Flandre Scarlet!\n\nMy current prefix is `" + prefix + "`\n**CURRENT COMMANDS**" + commandsList);
    }

    if(message.content === (prefix + "git")) {
        bot.reply(message, "Here is my github repository! \n**https://github.com/FlandereScarlet/flan-chanbot/**");
    }

    if(message.content === (prefix + "myinfo")) {
        bot.sendMessage(message, "***Displaying Information for " + message.author.username + "***\n\nUser ID: " + message.author.id + "\nAvatar: " + message.author.avatarURL + "\nDiscriminator: " + message.author.discriminator + "\nPlaying: " + message.author.game.name + "\nThe voice channel you are in is..." + message.author.voiceChannel + "!");
    }

    if(message.content.startsWith(prefix + "eval " && adminList)) {
        var evjo = message.join("");
        try {
        	var evalthis = eval(evjo);
        	bot.sendMessage(message, "```js\ninput: " + evjo + "\n\noutput: " + evalthis + "\n```");
        } catch (ero) {
        	bot.sendMessage(message, "fuk\n```js\ninput: " + evjo + "\n\nerror: " + ero + "\n```")
        }
    }

    if(message.content === (prefix + "admintest") && adminList) {
        bot.reply(message, "✅ | All seems to be good with you! you seem to be an ADMIN!");
    } else if(message.content === (prefix + "admintest")) {
    	bot.reply(message, "❌ | Either you havent added yourself to the adminList variable...or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!")
    }

    if(message.content === (prefix + "config") && adminList) {
        bot.sendMessage(message, "***Current Configuration for the Bot*** (Important SERVER stuff.)\nPREFIX: `" + botConfiguration.prefix + "`\n-   *More coming soon!*");
    } else if(message.content === (prefix + "config")) {
    	bot.reply(message, "❌ | Either you havent added yourself to the adminList variable...or you're a regular user not in the ADMINLIST. Ask the owner of the server to admin you if you're server staff!")
    }
  if (message.content === (prefix + "f")){
  	bot.sendMessage(msg.channel, msg.author + " has paid respects.");
  }
});



if (botConfiguration.useEmail === false) {
	bot.loginWithToken(botConfiguration.token);
} else if (botConfiguration.useEmail === true) {
	bot.login(botConfiguration.email, botConfiguration.password);
}

