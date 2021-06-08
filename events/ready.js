const Discord = require("discord.js")

module.exports = client => {
    console.log(`[+] Le robot ${client.user.username} est en ligne !`)
    client.user.setActivity("!help", {type: "WATCHING"})
    console.log(`[+] Initialisation de tous les liens d'invitations de tous les serveurs ...`)
    client.guilds.cache.forEach(async guild => {
        let invites = await guild.fetchInvites()
        if(guild.vanityURLCode) invites.set(guild.vanityURLCode, await guild.fetchVanityData())
        client.guildInvites.set(guild.id, invites)
    })
    console.log(`[+] Initialisation des liens d'invitations terminé !`)
}