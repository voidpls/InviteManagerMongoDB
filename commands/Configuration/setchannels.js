const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **|** Vous n'avez pas la permission !")
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    let joinChannel, leaveChannel

    switch (args[0]) {
        case ("join"):
            switch (args[1]) {
                case ("set"):
                    if (!args[2]) return message.channel.send(`:x: **|** Vous devez mentionner le salon que vous voulez définir pour les arrivées !\n__Exemple__: \`${guildData.prefix}setchannels join set \`<#${message.channel.id}>`)
                    joinChannel = await message.member.guild.channels.cache.find(channel => args[2].includes(channel.id))
                    if (!joinChannel) return message.channel.send(`:x: **|** Le salon mentionné est introuvable !\n__Exemple__: \`${guildData.prefix}setchannels join set \`<#${message.channel.id}>`)
                    guildData.join.channel = joinChannel.id
                    guildData.markModified('join') // I lost 2 hours for this fucking line 
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Le nouveau salon pour les messages de arrivées est maintenant **${args[2]}** ! N'oubliez pas d'activer les messages d'arrivées.`)
                case ("enable"):
                    guildData.join.enabled = true
                    guildData.markModified('join')
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Les messages d'arrivées sont maintenant **activés** ! N'oubliez pas de définir un salon.`)
                case ("disable"):
                    guildData.join.enabled = false
                    guildData.markModified('join')
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Les messages d'arrivées sont maintenant **désactivés** !`)
                default:
                    return message.channel.send(`:x: **|** Vous devez indiquer le bon argument !\n__Exemple__: \`${guildData.prefix}setchannels join set \`<#${message.channel.id}>`)
            }
        case ("leave"):
            switch (args[1]) {
                case ("set"):
                    if (!args[2]) return message.channel.send(`:x: **|** Vous devez mentionner le salon que vous voulez définir pour les arrivées !\n__Exemple__: \`${guildData.prefix}setchannels leave set \`<#${message.channel.id}>`)
                    leaveChannel = await message.member.guild.channels.cache.find(channel => args[2].includes(channel.id))
                    if (!leaveChannel) return message.channel.send(`:x: **|** Le salon mentionné est introuvable !\n__Exemple__: \`${guildData.prefix}setchannels leave set \`<#${message.channel.id}>`)
                    guildData.leave.channel = leaveChannel.id
                    guildData.markModified('leave')
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Le nouveau salon pour les messages de départs est maintenant **${args[2]}** ! N'oubliez pas d'activer les messages de départs.`)
                case ("enable"):
                    guildData.leave.enabled = true
                    guildData.markModified('leave')
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Les messages de départs sont maintenant **activés** ! N'oubliez pas de définir un salon.`)
                case ("disable"):
                    guildData.leave.enabled = false
                    guildData.markModified('leave')
                    guildData.save()
                    return message.channel.send(`:white_check_mark: **|** Les messages de départs sont maintenant **désactivés** !`)
                default:
                    return message.channel.send(`:x: **|** Vous devez indiquer le bon argument !\n__Exemple__: \`${guildData.prefix}setchannels join set \`<#${message.channel.id}>`)
            }
        default:
            joinChannel = await client.channels.fetch(guildData.join.channel).catch(err => {})
            leaveChannel = await client.channels.fetch(guildData.leave.channel).catch(err => {})
            if (joinChannel) joinChannelMention = `<#${joinChannel.id}>`
            if (leaveChannel) leaveChannelMention = `<#${leaveChannel.id}>`
            if (!joinChannel) joinChannelMention = "indéfini"
            if (!leaveChannel) leaveChannelMention = "indéfini"
            return message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Salons de ${message.member.guild.name}`)
                .setColor("GREEN")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setDescription(`:airplane_arriving: **|** Le salon d'arrivée est actuellement **${joinChannelMention}** ! Il est **${guildData.join.enabled.toString().replace(/true/g, "activé").replace(/false/g, "désactivé")}**.
:airplane_departure: **|** Le salon de départ est actuellement **${leaveChannelMention}** ! Il est **${guildData.leave.enabled.toString().replace(/true/g, "activé").replace(/false/g, "désactivé")}**.

*Exemple de commandes :*
● \`${guildData.prefix}setchannels join set \`<#${message.channel.id}> pour définir le salon d'arrivée ici
● \`${guildData.prefix}setchannels leave enable\` pour activer les messages de départs`)
            )
    }
}