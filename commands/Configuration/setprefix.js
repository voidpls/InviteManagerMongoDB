const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** Vous n'avez pas la permission !")
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    if (args[0]) {
        guildData.prefix = args[0]
        guildData.save()
        return message.channel.send(`:white_check_mark: **|** Le nouveau prefix de ${client.user.toString()} sur **${message.member.guild.name}** est maintenant \`${args[0]}\` !`)
    }

    return message.channel.send(`:white_check_mark: **|** Le prefix de ${client.user.toString()} sur **${message.member.guild.name}** est \`${guildData.prefix}\` !`)
}