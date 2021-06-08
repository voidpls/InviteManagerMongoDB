const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** Vous n'avez pas la permission !")

    // TO DO
}