const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    let ranksString = "__Liste des rôles disponibles :__"

    if (guildData.ranks && Object.keys(guildData.ranks).length > 0) {
        for (const [nbInv, roleInv] of Object.entries(guildData.ranks)) {
            ranksString = ranksString + `\n<@&${roleInv}> : **${nbInv} invitations**`
        }
    } else {
        ranksString = ranksString + "\nAucun rank existant."
    }

    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Ranks de ${message.member.guild.name}`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(`${ranksString}

Obtenez des rôles en atteignant le nombre d'invitations nécessaire.
*Utilisez la commande \`${guildData.prefix}setprefix\` pour configurer les ranks de votre serveur.*`)
    )

}