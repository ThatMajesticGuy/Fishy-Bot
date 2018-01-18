const Discord = require('discord.js')


exports.run = (bot, message, args) => {
let user;
const member = message.mentions.members.first();
if (!member) user = message.author
if (member) user = member.user
	db.fetchObject(`userLevel_${user.id + message.guild.id}`).then(l => {

		db.fetchObject(user.id + message.guild.id).then(i => {
    
    var embed = new Discord.RichEmbed()
    .setTitle(`${user.username}'s Stats!`)
    .setColor("GREEN")
    .setThumbnail(user.displayAvatarURL)
    .setTimestamp()
    .addField(":signal_strength: User Level :signal_strength:", `**${l.value}**`)
    .addField(":speech_balloon: User's Messages :speech_balloon:", `**${i.value}**`)
    message.channel.send({ embed: embed })
});
});
};

exports.help = {
name: "stats",
description: "Gets your stats!",
usage: "fb!stats <user mention>"
}

exports.aliases = ["level"]
