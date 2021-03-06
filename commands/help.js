const Discord = require("discord.js");

exports.run = (bot, message, args) => {
    const prefix = "fb!"
    let blank = args[0];
    if (!blank) {
        const commandNames = Array.from(bot.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

        // > Send to Author the commands list
        message.author.send(`/* Command List *\nYou can use ${prefix}help [commandname] to get details on a specific command!\n-----------------------------------------------------------------------`, {code: "md"})
        message.author.send(`${bot.commands.map(c => `#${prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)}  <${c.help.usage}>`).slice(0, 27).join('\n')}`, {code: "cpp"})
        // > Send in channel that we sent commands list
        message.channel.send(":e_mail: Check your DM's :incoming_envelope:")
    } else {
        let command = blank;
        let aliases;
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            if (command.aliases.length === 0) aliases = "None";
            if (command.aliases.length > 0) aliases = command.aliases
            message.channel.send(`Info on ${command.help.name}\n-------------\n[Description](${command.help.description})\n[Usage](${command.help.usage})\n[Aliases](${aliases})`, {code:'md'});
        } else {
        if (!bot.commands.has(command)) {
            message.channel.send(`I do not think **${command}** is an actual command`)
        }
        }
    }
}

exports.help = {
    name: "help",
    description: "Shows all of the available commands that are available to be used",
    usage: "fb!help"
}

exports.aliases = ["commands", "cmds"]
