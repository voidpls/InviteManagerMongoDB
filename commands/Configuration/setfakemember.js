const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** Vous n'avez pas la permission !")
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    if (args[0]) {
        if (isNaN(args[0])) return message.channel.send(`:x: **|** Nombre de jours invalide !__Exemple__:\`${guildData.prefix}setfakemember 7\``)
        guildData.fake = args[0]
        guildData.save()
        return message.channel.send(`:white_check_mark: **|** La durée de création de compte pour définir si un membre est fake sur **${message.member.guild.name}** est maintenant de \`${args[0]}\` jours !`)
    }

    return message.channel.send(`:white_check_mark: **|** La durée de création de compte pour définir si un membre est fake sur **${message.member.guild.name}** est \`${guildData.fake}\` jours !`)
}