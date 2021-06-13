const mongoose = require('mongoose')
const PublicConfig = require("../../PublicConfig.json")
if (PublicConfig.enable_debug === true) mongoose.set('debug', true)

const UserSchema = mongoose.Schema({
    _id: String, // USER
    inviterID: String, // INVITER OF USER
    invites: Number,
    invites_join: Number,
    invites_left: Number,
    invites_invalid: Number,
    invites_bonus: Number,
    guildID: String
})

module.exports = mongoose.model('members', UserSchema, 'members')