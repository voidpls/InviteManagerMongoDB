const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Error:** You must have the `Administrator` permission')
  const guildData = await client.data.getGuildDB(message.guild.id)

  switch (args[0]) {
    case ('add'):
      const roles = message.member.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.managed && message.member.guild.me.roles.highest.comparePositionTo(role) > 0)
      if (!roles.size) return message.channel.send('**Error:** The server does not have any valid roles')

      if (!args[2] || !parseInt(args[2])) return message.channel.send(`**Usage:** \`${guildData.prefix}setranks add @role [invite goal]\``)
      if (!message.mentions.roles.first()) return message.channel.send('Invalid role')
      const role = message.mentions.roles.first()

      if (!guildData.ranks) guildData.ranks = {}
      if (guildData.ranks[args[2]]) return message.channel.send('There is already an invite rank with that amount of invites')

      guildData.ranks[parseInt(args[2])] = role.id
      guildData.markModified('ranks')
      guildData.save()

      return message.channel.send(`An invite goal of **${args[2]}** for the role \`${role.name}\` has been created`)
    case ('remove'):
      if (!args[1] || !parseInt(args[1])) return message.channel.send(`**Usage:** \`${guildData.prefix}setranks remove [invite goal]\``)
      if (!guildData.ranks[args[1]]) return message.channel.send(`An invite rank with an invite goal of **${args[1]}** does not exist`)

      delete guildData.ranks[parseInt(args[1])]
      guildData.markModified('ranks')
      guildData.save()

      return message.channel.send(`Removed invite rank for the goal of **${args[1]}** invites`)
    case ('autoremove'):
      switch (args[1]) {
        case ('on'):
          guildData.autoremoverank = true
          guildData.save()
          return message.channel.send('Autoremove for ranks has been enabled')
        case ('off'):
          guildData.autoremoverank = false
          guildData.save()
          return message.channel.send('Autoremove for ranks has been disabled')
        default:
          if (guildData.autoremoverank === true) { return message.channel.send(`**Usage:** \`${guildData.prefix}setranks autoremove [on/off]\`\n\nAutoremove is currently enabled.`) }
          return message.channel.send(`**Usage:** \`${guildData.prefix}setranks autoremove [on/off]\`\n\nAutoremove is currently disabled.`)
      }
    default:
      let ranksString = 'There are no invite ranks.'

      if (guildData.ranks && Object.keys(guildData.ranks).length > 0) {
        const ranksStringArr = []
        for (const [nbInv, roleInv] of Object.entries(guildData.ranks)) { ranksStringArr.push(`<@&${roleInv}> - **${nbInv}** invites`) }
        ranksString = ranksStringArr.join('\n')
      }

      const usageString = `• \`${guildData.prefix}setranks add @role [invite goal]\`\n` +
              `• \`${guildData.prefix}setranks remove [invite goal]\`\n` +
              `• \`${guildData.prefix}setranks autoremove [on/off]\``

      return message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} Invite Ranks`, message.guild.iconURL({ dynamic: true, size: 64 }))
        .setColor('2f3136')
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true, size: 64 }))
        .setTimestamp()
        .setDescription(ranksString)
        .addField('Usage', usageString)
      )
  }
}
