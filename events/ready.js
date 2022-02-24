const Discord = require('discord.js')

module.exports = client => {
  console.log(`[+] Logged in as ${client.user.tag}`)
  client.user.setActivity('your invites', { type: 'WATCHING' })
  console.log('[+] Fetching invite links...')
  client.guilds.cache.forEach(async guild => {
    const invites = await guild.fetchInvites()
    if (guild.vanityURLCode) invites.set(guild.vanityURLCode, await guild.fetchVanityData())
    client.guildInvites.set(guild.id, invites)
  })
  console.log('[+] Fetched all invite links')
}
