module.exports = async (client, member) => {
    if (member.partial) member = await member.fetch()
    let guildData = await client.data.getGuildDB(member.guild.id)
    const cachedInvites = client.guildInvites.get(member.guild.id)
    const newInvites = await member.guild.fetchInvites()

    const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)

    if ((guildData.join.enabled === true) && !(guildData.join.channel === null)) {
        let joinChannel = await client.channels.fetch(guildData.join.channel)

        if (member.user.bot) {
            let toSend = await guildData.join.messageBot
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return joinChannel.send(toSend).catch(err => console.log(err))
        }
        if (!usedInvite) {
            let toSend = await guildData.join.messageUnknown
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
            return joinChannel.send(toSend).catch(err => console.log(err))
        }
        if (usedInvite.code === member.guild.vanityURLCode) {
            let userData = await client.data.getUserDB("VANITY", member.guild.id, member.id)
            let toSend = await guildData.join.messageFake
                .replace(/\{member:username\}/g, member.user.username)
                .replace(/\{member:mention\}/g, member.toString())
                .replace(/\{member:tag\}/g, member.user.tag)
                .replace(/\{code\}/g, usedInvite.code)
                .replace(/\{invites\}/g, userData.invites + 1)
            joinChannel.send(toSend).catch(err => console.log(err))
        } else {
            let userData = await client.data.getUserDB(usedInvite.inviter.id, member.guild.id, member.id)
            if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
                let toSend = await guildData.join.messageFake
                    .replace(/\{member:username\}/g, member.user.username)
                    .replace(/\{member:mention\}/g, member.toString())
                    .replace(/\{member:tag\}/g, member.user.tag)
                    .replace(/\{inviter:username\}/g, usedInvite.inviter.username)
                    .replace(/\{inviter:mention\}/g, usedInvite.inviter.toString())
                    .replace(/\{inviter:tag\}/g, usedInvite.inviter.tag)
                    .replace(/\{code\}/g, usedInvite.code)
                joinChannel.send(toSend).catch(err => console.log(err))
            } else {
                let toSend = await guildData.join.messageCorrect
                    .replace(/\{member:username\}/g, member.user.username)
                    .replace(/\{member:mention\}/g, member.toString())
                    .replace(/\{member:tag\}/g, member.user.tag)
                    .replace(/\{inviter:username\}/g, usedInvite.inviter.username)
                    .replace(/\{inviter:mention\}/g, usedInvite.inviter.toString())
                    .replace(/\{inviter:tag\}/g, usedInvite.inviter.tag)
                    .replace(/\{code\}/g, usedInvite.code)
                    .replace(/\{invites\}/g, userData.invites + 1)
                joinChannel.send(toSend).catch(err => console.log(err))
            }
        }
    }
    if (member.user.bot) return
    if (!usedInvite) return

    if (usedInvite.code === member.guild.vanityURLCode) {
        let userData = await client.data.getUserDB("VANITY", member.guild.id, member.id)
        userData.invites++
        userData.invites_join++
        return userData.save()
    }

    let userData = await client.data.getUserDB(usedInvite.inviter.id, member.guild.id, member.id)
    if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
        userData.invites_fake++
        return userData.save()
    }

    userData.invites++
    userData.invites_join++
    userData.save()

    if (guildData.ranks) {
        for (const [nbInv, roleID] of Object.entries(guildData.ranks)) {
            if (userData.invites >= nbInv) {
                let inviterMember = member.guild.member(usedInvite.inviter.id)
                if (!inviterMember.roles.cache.find(r => r.id === roleID)) {
                    inviterMember.roles.add(member.guild.roles.cache.find(r => r.id === roleID))
                }
            }
            
        }
    }

    return
}