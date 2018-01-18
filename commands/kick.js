const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("**You do __NOT__ have permissions to use this command**\n(If you believe that this is an error, contact mods)")
  const member = message.mentions.members.first();
  if (!member) return message.channel.send("**Error**\nYou did not mention anybody, please give a mention of the user who needs the kick! <:banhammer:403221004437946368>")
  var reason = args.slice(1).join(" ")
  if (!reason) reason = "None given by moderator, this is taken as a sign of abuse";
  if (!member.kickable) return message.channel.send("**Error**\nThis user is __**NOT**__ kickable, here are some reasons...\n```md\n1. This user has a higher role than you\n2. This user has a higher role than me\n3. Something is wrong here!\n# If you believe this is wrong, contact mods immediatly!\n```")
  await member.kick(reason)
  .catch(error => {
    message.channel.send("**ERROR ERROR! THIS IS A REAL ERROR! CONTACTING MAJESTIC IMMEDIATLY!**")
    bot.users.get("262410813254402048").send(`There is a real error going on here in the KICK COMMAND! Please fix immediatly!\n\`\`\`md\n${error.stack}\n-----------------\n\`\`\``)
  })
  var embed = new Discord.RichEmbed()
  .setDescription("This user has been sucessfuly kicked! Check the mod log!")
  .setTimestamp()
  .setColor("BLUE")
  .setImage("https://media.tenor.com/images/69fe5462af64d7a9d1302fcc5eabbe3f/tenor.gif")
  message.channel.send({ embed: embed })
  var embed2 = new Discord.RichEmbed()
  .setTitle("User Kicked! <:banhammer:403221004437946368>")
  .setColor("#e60000")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL)
  .setAuthor(`Kicked by ${message.author.username}`, message.author.displayAvatarURL)
  .addField(":spy: User Kicked :spy:", `**__${member.user.tag}__**`)
  .addField(":spy: Kicked User's ID :spy:", `**__${member.user.id}__**`)
  .addField(":cop: Moderator Responsible :cop:", `**__${message.author.tag}__**`)
  .addField(":speech_balloon: Reason :speech_balloon:", `**__${reason}__**`)
  bot.channels.get("363496567367532544").send({ embed: embed2 })
}

exports.help = {
  name: "kick",
  description: "Kicks a user from the server",
  usage: "fb!kick [user] [reason]   MODERATORS ONLY!"
}

exports.aliases = []
