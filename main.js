const Discord = require('discord.js')
const mongoose = require('mongoose')
const client = new Discord.Client({
  disableEveryone: true,
  autoReconnect: true,
  fetchAllMembers: true,
  disabledEvents: ['TYPING_START'],
  partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
})

const PrivateConfig = require('./PrivateConfig.json')

const fs = require('fs')
client.commands = new Discord.Collection()
client.data = require('./database/mongoDB.js')

const guildInvites = new Map()
client.guildInvites = guildInvites

fs.readdir('./commands/', (err, content) => {
  if (err) console.log(err)
  if (content.length < 1) return console.log('Please create folders in the commands folder!')
  const groups = []
  content.forEach(element => {
    if (!element.includes('.')) groups.push(element)
  })
  groups.forEach(folder => {
    fs.readdir('./commands/' + folder, (e, files) => {
      const jsFiles = files.filter(f => f.split('.').pop() === 'js')
      if (jsFiles.length < 1) return console.log('Please create files in the folder "' + folder + '"!')
      if (e) console.log(e)
      jsFiles.forEach(element => {
        const props = require('./commands/' + folder + '/' + element)
        client.commands.set(element.split('.')[0], props)
      })
    })
  })
})

fs.readdir('./events/', (err, f) => {
  if (err) console.log(err)

  f.forEach((f) => {
    const events = require(`./events/${f}`)
    const event = f.split('.')[0]

    client.on(event, events.bind(null, client))
  })
  console.log(`[+] ${f.length} events loaded`)
})

mongoose.connect(PrivateConfig.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('[+] Established connection with MongoDB database')
  client.login(PrivateConfig.token)
}).catch((err) => {
  console.log('[+] Unable to connect to MongoDB database. Error: ' + err)
})

client.on('disconnect', () => console.log('[+] The bot has disconnected...'))
  .on('reconnecting', () => console.log('[+] Reconnecting the bot...'))
  .on('error', (e) => console.log('ERROR: ', e))
  .on('warn', (i) => console.log('WARN: ', i))

process.on('unhandledRejection', (err) => {
  console.error(err)
})
