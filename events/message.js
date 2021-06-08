const Discord = require("discord.js")

module.exports = async(client, message, user) => {
    if (message.webhookID) return

    if(message.channel.type === "dm") {
        if(message.author.bot) {
            return
        }
        return message.channel.send(":x: **|** Mes messages privés sont désactivés")
    }
    
    let guildData = await client.data.getGuildDB(message.member.guild.id)
    if(!message.content.startsWith(guildData.prefix)) return

    const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g)
    const commande = args.shift()

    const cmd = client.commands.get(commande)

    if(!cmd) return

    cmd.run(client, message, args)

}