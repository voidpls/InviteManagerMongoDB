module.exports = async (client, member) => {
    let guildData = await client.data.getGuildDB(member.guild.id)
    let userData = await client.data.getUserDB(member.id, member.guild.id)

    if (userData && userData.inviterID) {
        userData.deleteOne()
        userData = await client.data.getUserDB(userData.inviterID, member.guild.id)
    }

    if ((guildData.leave.enabled === true) && !(guildData.leave.channel === null)) {
        let leaveChannel = await client.channels.fetch(guildData.leave.channel)

        if (member.user.bot) {
            let toSend = await guildData.leave.messageBot
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return leaveChannel.send(toSend).catch(err => console.log(err))
        }
        if (!userData) {
            let toSend = await guildData.leave.messageUnknown
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return leaveChannel.send(toSend).catch(err => console.log(err))
        }
        if (userData._id === "VANITY") {
            let toSend = await guildData.leave.messageVanity
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
                .replace(/\{invites\}/g, userData.invites - 1)
            leaveChannel.send(toSend).catch(err => console.log(err))
        } else {
            let inviter = await member.guild.member(userData._id)
            let toSend = await guildData.leave.messageCorrect
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
                .replace(/\{inviter:username\}/g, inviter.user.username)
                .replace(/\{inviter:mention\}/g, inviter.toString())
                .replace(/\{inviter:tag\}/g, inviter.user.tag)
                .replace(/\{invites\}/g, userData.invites - 1)
            leaveChannel.send(toSend).catch(err => console.log(err))
        }
    }

    if (member.user.bot) return
    if (!userData) return

    if (userData._id === "VANITY") {
        userData.invites--
        userData.invites_left++
        return await userData.save()
    }

    userData.invites--
    userData.invites_left++
    return await userData.save()
}