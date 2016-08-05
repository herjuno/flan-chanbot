# flan-chanbot
Just a Discord.js Bot made by a few people.

# Running

you need Node.js and the discord.js module installed, go to https://nodejs.org to get the runtime.

for the module, run ``npm install discord.js --save`` (needs to have the node.js runtime installed or it won't work)

# Editing the Configuration File

When editing the ``botConfig.json`` file edit only these settings.

```js
{
	"token": "", 
	"prefix": "?",
	"useEmail": false, // If you use an EMAIL. If using a token, keep this disabled.
	"email": "",
	"password": "",
	"botName": "default-name-test",
	"botDesc": "default-description-test",
	"log": false,
	"logchannel": ""
}
```

After editing the ``botConfig.json`` file, Do NOT edit ANYTHING else, except for the ``adminList.json`` file. 

# Adding Admins
In the ``adminList.json`` file put your user id in it, Then you are able to add admins with the bot using ``?adminadd``.


