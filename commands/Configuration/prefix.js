const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const guildData = await client.data.getGuildDB(message.guild.id)
    if (!args[0]) return message.channel.send(`My prefix is \`${guildData.prefix}\``)

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Error:** You must have the `Administrator` permission");

    guildData.prefix = args[0]
    guildData.save()
    return message.channel.send(`The prefix has been changed to \`${args[0]}\``)
}
