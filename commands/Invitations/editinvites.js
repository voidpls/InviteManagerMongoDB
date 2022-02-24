const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Error:** You must have the `Administrator` permission')

  const guildData = await client.data.getGuildDB(message.guild.id)
  if (!args[0] || !message.mentions.users.first()) { return message.channel.send(`**Usage:** \`${guildData.prefix}editinvites [user] [+num/-num]\``) }
  const user = message.mentions.users.first()

  if (!user) return message.channel.send('Please mention a user')
  if (!args[1]) return message.channel.send('Please indicate amount of invites to add/remove: `+num/-num`')
  if (!(args[1].startsWith('+') || args[1].startsWith('-'))) return message.channel.send('The amount of invites must start with `+` or `-` [`+num/-num`]')
  if (!parseFloat(args[1].slice(1))) return message.channel.send('Invalid amount of invites to add/remove:  `+num/-num`')

  const userData = await client.data.getUserDB(user.id, message.guild.id, 'unknown')
  const origInvites = userData.invites
  userData.invites = userData.invites + parseFloat(args[1])
  userData.save()

  return message.channel.send(`\`${user.tag}\`'s invites changed from **${origInvites}** to **${userData.invites}**`)
}
