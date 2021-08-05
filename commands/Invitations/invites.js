const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {

    if (!args[0]) {
        let userData = await client.data.getUserDB(message.member.id, message.member.guild.id)

        return message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Invitations de " + message.member.user.tag)
            .setTimestamp()
            .setThumbnail(message.member.user.displayAvatarURL())
            .setFooter(`Demandé par ${message.member.user.tag}`)
            .setDescription(`:infinity: **${userData.invites_join}** invités
:x: **${userData.invites_left}** partis
:poop: **${userData.invites_invalid}** invalidées
:sparkles: **${userData.invites_bonus}** bonus

:white_check_mark: Vous avez actuellement **${userData.invites}** invitations ! :clap:`)
        )
    }

    let userTargeted = message.mentions.users.first()
    let userData = await client.data.getUserDB(userTargeted.id, message.member.guild.id)

    return message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Invitations de " + userTargeted.tag)
        .setTimestamp()
        .setThumbnail(userTargeted.displayAvatarURL())
        .setFooter(`Demandé par ${message.member.user.tag}`)
        .setDescription(`:infinity: **${userData.invites_join}** invités
:x: **${userData.invites_left}** partis
:poop: **${userData.invites_invalid}** invalidées
:sparkles: **${userData.invites_bonus}** bonus

:white_check_mark: Vous avez actuellement **${userData.invites}** invitations ! :clap:`)
    )

}