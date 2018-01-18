const Discord = require("discord.js");
const OWstats = require("overwatch-stats");

exports.run = async (bot, message) => {
    var args = message.content.split(" ").slice(1).join(" ");
    
    if (!args) {
        return message.reply("Insert your **Battletag** please :wink: `WARNING: my systeam is **Case Sensitive** please insert it as it is");
    }
    
    if (!args.includes("#")) {
        return message.reply("Invalid Battletag");
    }
    
    if (args.split("#").length > 6) {
        return message.reply("Dude, I don't think this is valid");
    }
    
    OWstats.load(args)
    .then(data => {
        if (!data.body.eu.stats.quickplay.overall_stats.avatar) {
            return message.reply("This Battletag **DOESN'T** exist!");
        }
        
        const embed = new Discord.RichEmbed()
        .setAuthor(`Stats for ${args}`, data.body.eu.stats.quickplay.overall_stats.avatar)
         .addField(`Quickplay ${args}`, `**Games played:** ${data.body.eu.stats.quickplay.overall_stats.games}\n\
          **Wins:** ${data.body.eu.stats.quickplay.overall_stats.wins}\n\
           **Losses:** ${data.body.eu.stats.quickplay.overall_stats.losses}\n\
           **Tier:** ${data.body.eu.stats.quickplay.overall_stats.tier}\n\
           **Prestige:** ${data.body.eu.stats.quickplay.overall_stats.prestige}
`)
      .setThumbnail(data.body.eu.stats.quickplay.overall_stats.avatar);
        message.channel.send({embed: embed}).catch(console.error);
    }).catch(err => {
        message.channel.send("I couldn't find you " + args);
        console.log(err);
    })
    
}

exports.help = {
    name: "overwatch",
    description: "Gives information about the mentioned overwatch battletag",
    usage: "fb!overwatch <battletag>"
}

exports.aliases = ["ow"]