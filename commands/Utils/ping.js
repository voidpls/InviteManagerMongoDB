const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    message.channel.send(":timer: **|** Chargement ...").then(m =>{
        m.edit(`:ping_pong: **|** Le ping de **${client.user.username}** est de \`${m.createdTimestamp - message.createdTimestamp}ms\` !`)
      })
}