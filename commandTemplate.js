commands.commandname = { //Make sure this is all lowercase.
    name: "name", //Name to show up in help command, ideally the same as the name in the command table.
    desc: "short description", //Shows up in the help command.
    longDesc: "more detailed description", //Shows up if the user does '[prefix]help [command name]'
    usage: "<required arguments> [optional arguments]", //Only use this if the command accepts additional parameters.
    adminOnly: true or false //'True' makes it so that only the owner or people in the admin list can use this, 'False' or not set allows anyone to use this.
    main: function(bot, msg, args) { //The actual code to execute when the command is run.
        //Command code here. 'Bot' represents the discord.js client. 'msg' represents the message object. 'args' are arguments given to the command.
    }
}
