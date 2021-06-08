module.exports = async(client, message, command, type, missing) => {
    return message.channel.send(`:x: **|** ${client.user.toString()} a besoin de la permission ${missing} pour cette commande !`)
}