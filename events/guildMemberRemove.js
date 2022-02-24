module.exports = async (client, member) => {
  const guildData = await client.data.getGuildDB(member.guild.id)
  let userData = await client.data.getUserDB(member.id, member.guild.id)

  if (userData && userData.inviterID) userData.deleteOne()
  userData = await client.data.getUserDB(userData.inviterID, member.guild.id)

  if ((guildData.leave.enabled === true) && !(guildData.leave.channel === null)) {
    const leaveChannel = await client.channels.fetch(guildData.leave.channel)

    if (member.user.bot) {
      const toSend = await guildData.leave.messageBot
        .replace(/\{member:username\}/g, member.user.username)
        .replace(/\{member:mention\}/g, member.toString())
        .replace(/\{member:tag\}/g, member.user.tag)
      return leaveChannel.send(toSend).catch(err => console.log(err))
    }
    if (!userData) {
      const toSend = await guildData.leave.messageUnknown
        .replace(/\{member:username\}/g, member.user.username)
        .replace(/\{member:mention\}/g, member.toString())
        .replace(/\{member:tag\}/g, member.user.tag)
      return leaveChannel.send(toSend).catch(err => console.log(err))
    }
    if (userData._id === 'VANITY') {
      const toSend = await guildData.leave.messageVanity
        .replace(/\{member:username\}/g, member.user.username)
        .replace(/\{member:mention\}/g, member.toString())
        .replace(/\{member:tag\}/g, member.user.tag)
        .replace(/\{invites\}/g, userData.invites - 1)
      leaveChannel.send(toSend).catch(err => console.log(err))
    } else {
      const inviter = await member.guild.member(userData._id)
      if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
        const toSend = await guildData.leave.messageFake
          .replace(/\{member:username\}/g, member.user.username)
          .replace(/\{member:mention\}/g, member.toString())
          .replace(/\{member:tag\}/g, member.user.tag)
          .replace(/\{inviter:username\}/g, inviter.user.username)
          .replace(/\{inviter:mention\}/g, inviter.toString())
          .replace(/\{inviter:tag\}/g, inviter.user.tag)
        leaveChannel.send(toSend).catch(err => console.log(err))
      } else {
        const toSend = await guildData.leave.messageCorrect
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
  }

  if (member.user.bot) return
  if (!userData) return

  if (userData._id === 'VANITY') {
    userData.invites--
    userData.invites_left++
    return userData.save()
  }

  if ((Date.now() - member.user.createdTimestamp) < guildData.fake * 24 * 60 * 60 * 1000) {
    userData.invites_fake--
    userData.invites_left++
    return userData.save()
  }

  userData.invites--
  userData.invites_left++
  await userData.save()

  if (guildData.ranks) {
    if (guildData.autoremoverank === true) {
      for (const [nbInv, roleID] of Object.entries(guildData.ranks)) {
        if (userData.invites <= nbInv) {
          const inviterMember = member.guild.member(userData._id)
          if (inviterMember.roles.cache.find(r => r.id === roleID)) {
            inviterMember.roles.remove(member.guild.roles.cache.find(r => r.id === roleID))
          }
        }
      }
    }
  }
}
