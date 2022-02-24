const Discord = require('discord.js')

module.exports = async (client, invite) => {
  // console.log(`[+] Une nouvelle invitation a été créé par ${invite.inviter.username} sur le serveur ${invite.guild.name}`)
  const invites = await invite.guild.fetchInvites()
  if (invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData())
  client.guildInvites.set(invite.guild.id, invites)
}
