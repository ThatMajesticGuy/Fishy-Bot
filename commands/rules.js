const Discord = require('discord.js');
const rules = require('./rules.json')

exports.run = (bot, message, args) => {
  var number = message.content.split(" ").slice(1).join(" ")
  if (!number) {
    var embed = new Discord.RichEmbed()
    .setTitle(`The rules of ${message.guild.name}`)
    .setColor("BLUE")
    .setTimestamp()
    .setThumbnail("")
    .addField("__Rule #1__", "**__Do NOT use any profanity,  Excessive amounts of swearing will result in a Warning__**")
    .addField("__Rule #2__", "**__Do NOT post any Porn/Gore/NSFW, this will result in a Warning 2__**")
    .addField("__Rule #3__", "**__Do NOT trash talk/make fun of the staff, this will result in Warning__**")
    .addField("__Rule #4__", "**__Do NOT post any spam/copy & paste spam, This will result in a Warning on the spot__**")
    .addField("__Rule #5__", "**__Do NOT Advertise any Discord servers or Twitch/Youtube channels (If you just joined) without permission__**")
    .addField("__Rule #6__", "**__Do NOT start any major fights with anyone, this will result in a Warning 2__**")
    .addField("__Rule #7__", "**__Do NOT use any voice changers or modifiers__**")
    .addField("__Rule #8__", "**__Do NOT ask anyone for personal information, like IP adresses, school, etc.")
    .addField("__Rule #9__", "**__Do NOT Post any unallowed links or shortened links. These are the allowed links__**\n***Roblox, Twitter, Giphy, Gyazo, Lightshot, Puu.sh, Twitch, Trello, Tenor, Tumblr, Reddit, Soundcloud, Steam, or YouTube***")
    .addField("Make sure you follow these rules!", "If you see a person breaking the rules, do `fb!report [user]` to report them! Or you can do `fb!rules [number]` to get a specific rule. If you do `fb!rules` it will DM the rules to you")
    message.channel.send({ embed: embed })
  } else {
    var rule = rules[number]
    if (rule === undefined) rule = "**This is not a rule number, please put a number between 1-9**"
    var embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(rule)
    message.channel.send({ embed: embed })
  }
}

exports.help = {
  name: "rules",
  description: "Sends the rules to you",
  usage: "fb!rules <rule number>"
}

exports.aliases = []
