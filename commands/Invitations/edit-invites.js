const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: **|** Vous n'avez pas la permission !");

    let user = message.mentions.users.first();
    let guildData = await client.data.getGuildDB(message.member.guild.id)

    if (!user) return message.channel.send(`:x: **|** Cet utilisateur est introuvable ou vous n'avez pas mentionné un utilisateur !\n__Exemple__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``);
    if (!args[1]) return message.channel.send(`:x: **|** Vous devez ajouter une valeur\n__Exemple__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)
    if (!(args[1].startsWith("+") || args[1].startsWith("-"))) return message.channel.send(`:x: **|** La valeur doit commencer par \`+\` ou \`-\` !\n__Exemple__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)
    if (isNaN(args[1].slice(1))) return message.channel.send(`:x: **|** Ce nombre est invalide !\n__Exemple__: \`${guildData.prefix}edit-invites \`<@${message.author.id}>\` +10\``)

    let userData = await client.data.getUserDB(user.id, message.guild.id)

    userData.invites = userData.invites + parseFloat(args[1])
    userData.invites_bonus = userData.invites_bonus + parseFloat(args[1])
    userData.save()

    return message.channel.send(`:white_check_mark: **|** Les invitations de <@${user.id}> sont passés de **${userData.invites}** (**${userData.invites_bonus}** bonus) à **${userData.invites + parseFloat(args[1])}** (**${userData.invites_bonus + parseFloat(args[1])}** bonus) ! `)
}