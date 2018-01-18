const Discord = require('discord.js')

exports.run = (bot, message, args) => {
const user = message.mentions.users.first();
				 
				 // If no @user
				 var embed2 = new Discord.RichEmbed()
				 .addField("Username:", `${message.author.tag}`, true)
				 .addField("Your Avatar:", `Is [Here](${message.author.avatarURL})`)
				 .setColor(0x00AE86)
				 .setThumbnail(`${message.author.displayAvatarURL}`)
				 .setTimestamp()
				 .setFooter(`Developed by ThatMajesticGuy`, bot.user.displayAvatarURL)
				 if(!user) message.channel.send(embed2);
				 // if @user
				 else {
				 	var embed = new Discord.RichEmbed()
				.addField("Username:", user.tag, true)
				.addField("Avatar URL:", `Is [Here](${user.displayAvatarURL})`)
				.setColor(0x00AE86)
				.setThumbnail(`${user.displayAvatarURL}`)
				.setTimestamp()
				.setFooter(`Developed by ThatMajesticGuy`, bot.user.displayAvatarURL);
				message.channel.send(embed)
			 }
}

exports.help = {
    name: "avatar",
    description: "Gives either your avatar or the person you mentioned avatar",
    usage: "fb!avatar [user]"
}

exports.aliases = ["av"]