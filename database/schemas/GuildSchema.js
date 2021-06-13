const mongoose = require('mongoose')
const PrivateConfig = require("../../PublicConfig.json")
mongoose.set('debug', true)

const GuildSchema = mongoose.Schema({
    _id: { // GUILD ID
        type: String
    },
    prefix: {
        type: String,
        default: PrivateConfig.prefix
    },
    invalid_time: {
        type: Number,
        default: 86400000 // Time in ms to know if the account is too recent
    },
    join: {
        type: Object,
        default: {
            enabled: false,
            channel: null,
            messageCorrect: "{member:mention} vient de rejoindre. Il a été invité par **{inviter:username}** qui a désormais **{invites} invitations** !",
            messageUnknown: "{member:mention} vient de rejoindre. Impossible de savoir par qui il a été invité !",
            messageBot: "{member:mention} vient de rejoindre via l'OAuth flow !",
            messageVanity: "{member:mention} vient de rejoindre via le lien officiel ! (**{code}**)"
        }
    },
    leave: {
        type: Object,
        default: {
            enabled: false,
            channel: null,
            messageCorrect: "{member:mention} est parti. Il a été invité par **{inviter:username}** qui a désormais **{invites} invitations** !",
            messageUnknown: "{member:mention} est parti. Impossible de savoir par qui il a été invité !",
            messageBot: "{member:mention} est parti. Il a été invité via l'OAuth flow !",
            messageVanity: "{member:mention} est parti. Il a été invité via le lien officiel !"
        }

    }
})

module.exports = mongoose.model('guilds', GuildSchema, 'guilds')