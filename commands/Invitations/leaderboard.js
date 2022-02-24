const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  const leaderboardData = await client.data.getLeaderboard(message.guild.id)
  if (!leaderboardData || (leaderboardData === undefined)) return message.channel.send('**Error:** Failed to fetch leaderboard.')

  const cleanLeaderboardData = leaderboardData.filter(user => {
    return user._id !== 'unknown'
  })
  if (cleanLeaderboardData.length > 10) cleanLeaderboardData.length = 10

  const leaderboardArr = []
  for (const [i, user] of cleanLeaderboardData.entries()) {
    const member = await message.guild.members.fetch(user._id)
    leaderboardArr.push(`${i + 1}. **${member.user.username}**#${member.user.discriminator} - ${leaderboardData[i].invites}`)
  }

  message.channel.send(new Discord.MessageEmbed()
    .setColor('2f3136')
    .setAuthor(`${message.guild.name} Invites`, message.guild.iconURL({ dynamic: true, size: 64 }))
    .setDescription(leaderboardArr.join('\n'))
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 64 }))
  )
}
