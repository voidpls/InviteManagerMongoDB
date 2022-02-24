const Discord = require('discord.js')

module.exports = async (client, message, user) => {
  if (message.webhookID) return

  if (message.channel.type !== 'text') return

  const guildData = await client.data.getGuildDB(message.guild.id)
  if (!message.content.startsWith(guildData.prefix)) return

  const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g)
  const command = args.shift()

  const cmd = client.commands.get(command)

  if (!cmd) return

  cmd.run(client, message, args)
}
