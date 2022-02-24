const Discord = require('discord.js')

module.exports = async (client, invite) => {
  const invites = await invite.guild.fetchInvites()
  if (invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData())
  client.guildInvites.set(invite.guild.id, invite)
}
