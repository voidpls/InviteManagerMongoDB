const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  const guildData = await client.data.getGuildDB(message.guild.id)

  let ranksString = 'There are no invite ranks.'

  if (guildData.ranks && Object.keys(guildData.ranks).length > 0) {
    const ranksStringArr = []
    for (const [nbInv, roleInv] of Object.entries(guildData.ranks)) { ranksStringArr.push(`<@&${roleInv}> - **${nbInv}** invites`) }
    ranksString = ranksStringArr.join('\n')
  }

  return message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} Invite Ranks`, message.guild.iconURL({ dynamic: true, size: 64 }))
    .setColor('2f3136')
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setTimestamp()
    .setDescription(ranksString)
  )
}
