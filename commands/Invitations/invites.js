const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  let user = message.author
  if (args[0] && message.mentions.users.first()) user = message.mentions.users.first()

  const userData = await client.data.getUserDB(user.id, message.member.guild.id)

  return message.channel.send(new Discord.MessageEmbed()
    .setColor('2f3136')
    .setTimestamp()
  // .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 64}))
    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 64 }))
    .setDescription(
        `\`${user.tag}\` has **${!userData ? 0 : userData.invites}** invites.\n\n` +
        `💠 **${!userData ? 0 : userData.invites_join}** total invites\n` +
        `⛔ **${!userData ? 0 : userData.invites_left}** invited users left`
        // `⭐ **${!userData ? 0 : userData.invites_bonus}** bonus`
    )
  )
}
