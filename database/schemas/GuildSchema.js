const mongoose = require('mongoose')
const PublicConfig = require("../../PublicConfig.json")
if (PublicConfig.enable_debug === true) mongoose.set('debug', true)

const GuildSchema = mongoose.Schema({
    _id: { // GUILD ID
        type: String
    },
    prefix: {
        type: String,
        default: PublicConfig.prefix
    },
    invalid_time: {
        type: Number,
        default: 86400000 // Time in ms to know if the account is too recent
    },
    join: {
        type: Object,
        default: {
            enabled: PublicConfig.default.join.enabled,
            channel: null,
            messageCorrect: PublicConfig.default.join.messageCorrect,
            messageUnknown: PublicConfig.default.join.messageUnknown,
            messageBot: PublicConfig.default.join.messageBot,
            messageVanity: PublicConfig.default.join.messageVanity
        }
    },
    leave: {
        type: Object,
        default: {
            enabled: PublicConfig.default.leave.enabled,
            channel: null,
            messageCorrect: PublicConfig.default.leave.messageCorrect,
            messageUnknown: PublicConfig.default.leave.messageUnknown,
            messageBot: PublicConfig.default.leave.messageBot,
            messageVanity: PublicConfig.default.leave.messageVanity
        }

    }
})

module.exports = mongoose.model('guilds', GuildSchema, 'guilds')