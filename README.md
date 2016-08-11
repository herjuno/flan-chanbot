# flan-chanbot
Just an discord.js bot made by a few people.

# Running

You need Node.js and the discord.js module installed, go to https://nodejs.org to get the runtime.

For the module, run ``npm install discord.js --save`` (needs to have the Node.js runtime installed or it won't work (obviously)).

# Editing the Configuration File

When editing the ``botConfig.json`` file edit only these settings:

```js
{
	"token": "",
	"prefix": "?",
	"useEmail": false, // If you use an EMAIL. If using a token, keep this disabled.
	"email": "",
	"password": "",
	"botName": "default-name-test",
	"botDesc": "default-description-test",
	"ownerID": "your ID here",
	"log": false,
	"logchannel": ""
}
```

After editing the ``botConfig.json`` file, Do NOT edit ANYTHING else, except for ``adminList.json`` or ``blackList.json``.

# Adding Admins
Make sure you have added your user ID to the ``ownerID`` variable in the config file, then you may add and remove admins with the bot using the ``admin`` command, or you can add them manually by editing ``adminList.json``

# Blacklisting Users
If someone if annoying you, or is abusing the bot, you are able to blacklist the user from using the bot by using the ``bl`` command. You are also able to remove people from the blacklist with this command.
