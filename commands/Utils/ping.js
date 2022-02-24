const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  message.channel.send('Pinging...').then(m => {
    m.edit(`**Pong.** Ping took \` ${m.createdTimestamp - message.createdTimestamp}ms \`.`)
  })
}
