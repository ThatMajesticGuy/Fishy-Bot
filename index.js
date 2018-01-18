const Discord = require('discord.js')
const bot = new Discord.Client();
const prefix = "fb!";
const db = require('quick.db');

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

require('fs').readdir("./commands/", (err, files) => {
    if(err) console.error((err));
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Do you mind making the commands first?".red);
        return;
    }


    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)]
        let props = require(`./commands/${f}`)
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
    });

    });
 });

 bot.on("message", async message => {
    if(message.author.bot) return;

     if(message.channel.type === "dm") {
        var embed = new Discord.RichEmbed()
        .setTitle("ERROR!")
        .setColor("RANDOM")
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .setTimestamp()
        .addField("ERROR!", "I currently don't work in DMs")
         message.channel.send({ embed: embed })
         return;
    }

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if (bot.aliases.has(command.slice(prefix.length).toLowerCase())) {
        bot.commands.get(bot.aliases.get(command.slice(prefix.length).toLowerCase())).run(bot, message, args)
    }
        if (bot.commands.has(command.slice(prefix.length).toLowerCase())) {
         bot.commands.get(command.slice(prefix.length).toLowerCase()).run(bot, message, args)
        }

});

bot.on("messageDelete", message => {
    var embed = new Discord.RichEmbed()
    .setTitle("Message Deleted")
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(`Message deleted by:\n**${message.author.tag}**\nMessage:\n**${message.content}**\nIn the channel:\n<#${message.channel.id}>`)
    bot.channels.get("363496567367532544").send({ embed: embed })
});


bot.login(process.env.TOKEN)

bot.on("ready", ready => {
    console.log(`Logged in as ${bot.user.tag} on ${new Date()}, ready to start!`)
bot.user.setPresence({ game: { name: 'Fish blub 🐟', type: 3 } });
});

bot.on("message", message => {
	if (message.author.bot) return;
		if (message.channel.type == 'dm') return;


	db.updateValue(message.author.id + message.guild.id, 1).then (p => {

		db.fetchObject(message.author.id + message.guild.id).then(i => {

			let messages;

			if (i.value == 25) messages = 25; // Level 1
            else if (i.value == 50) messages = 50; // Level 2
            else if (i.value == 75) messages = 75; // Level 3
            else if (i.value == 100) messages = 100; // Level 4
            else if (i.value == 250) {
              messages = 250
              message.member.addRole(message.guild.roles.find("name", "Citizen").id)
            }  // Level 5
            else if (i.value == 500) messages = 500; // Level 6
            else if (i.value == 1000) messages = 1000; // Level 7
            else if (i.value == 2500) messages = 2500; // Level 8
            else if (i.value == 5000) messages = 5000; // Level 9
            else if (i.value == 10000) {
              messages = 10000; // Level 10
              message.member.addRole(message.guild.roles.find("name", "Worker").id)
            }
            else if (i.value == 15000) messages = 15000; // Level 11
            else if (i.value == 20000) messages = 20000; // Level 12
            else if (i.value == 25000) messages = 25000; // Level 13
            else if (i.value == 30000) messages = 30000; // Level 14
            else if (i.value == 40000) messages = 40000; // Level 15
            else if (i.value == 45000) messages = 45000; // Level 16
            else if (i.value == 50000) messages = 50000; // Level 17
            else if (i.value == 60000) messages = 60000; // Level 18
            else if (i.value == 70000) messages = 70000; // Level 19
            else if (i.value == 80000) messages = 80000; // Level 20

			if (!isNaN(messages)) {

				db.updateValue(`userLevel_${message.author.id + message.guild.id}`, 1).then(o => {
					var embed = new Discord.RichEmbed()
					.setTitle("Level Up!")
					.setThumbnail("http://carolinafarmstewards.org/wp-content/uploads/2016/01/Level-Up-Logo-1024x1024.png")
					.setAuthor("Leveled Up!", message.author.displayAvatarURL)
					.setTimestamp()
					.setColor("RANDOM")
					.addField(`${message.author.username}, you have sent ***__${messages}__*** messages`, `You have leveled up! You are now level ${o.value}, keep climbing up the ranks!`)
					message.channel.send({ embed: embed })
});
			}
		});
});
});
