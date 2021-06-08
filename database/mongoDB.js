const GuildsDB = require("./schemas/GuildSchema")
const UsersDB = require("./schemas/UserSchema")

module.exports.getGuildDB = async function (guildID) {

  let guildDB = await GuildsDB.findOne({
    _id: guildID
  })

  if (guildDB) {
    return guildDB
  } else {
    guildDB = new GuildsDB({
      _id: guildID
    })
    await guildDB.save().catch(err => console.log(err))
    return guildDB
  }
}

module.exports.getUserDB = async function (userID, guildID, inviterID = null) { // Function that needs to be optimized
  let userDB
  if (inviterID == null) {
    userDB = await UsersDB.findOne({
      _id: userID,
      guildID: guildID,
    })

    if (userDB) {
      return userDB
    }
    return
  } else {
    inviterDB = await UsersDB.findOne({
      _id: inviterID,
      guildID: guildID,
    })

    if (!inviterDB) {
      new UsersDB({
        _id: inviterID,
        invites: 0,
        invites_join: 0,
        invites_left: 0,
        invites_invalid: 0,
        invites_bonus: 0,
        guildID: guildID,
        inviterID: userID
      }).save().catch(err => console.log(err))
    }

    userDB = await UsersDB.findOne({
      _id: userID,
      guildID: guildID,
    })

    if (userDB) {
      return userDB
    } else {
      userDB = new UsersDB({
        _id: userID,
        invites: 0,
        invites_join: 0,
        invites_left: 0,
        invites_invalid: 0,
        invites_bonus: 0,
        guildID: guildID
      })
      await userDB.save().catch(err => console.log(err))
      return userDB
    }
  }
}