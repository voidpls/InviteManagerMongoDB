<h1 align="center">InviteManager MongoDB</h1>

<p align="center">
    <a href="LICENSE">
    <a href="LICENSE"><img src="https://img.shields.io/github/license/francislatruelle/InviteManagerMongoDB?label=License"></a>
    <a href="https://github.com/francislatruelle/InviteManagerMongoDB/stargazers"><img src="https://img.shields.io/github/stars/francislatruelle/InviteManagerMongoDB?label=Stars"></a>
    <a href="https://github.com/francislatruelle/InviteManagerMongoDB/commit/master"><img src="https://img.shields.io/github/last-commit/francislatruelle/InviteManagerMongoDB?label=Last%20Update&logo=github"></a>
    <a href="https://github.com/FrancisLaTruelle/InviteManagerMongoDB/issues"><img src="https://img.shields.io/github/languages/code-size/francislatruelle/InviteManagerMongoDB?label=Size"></a>
    <a href="https://github.com/FrancisLaTruelle/InviteManagerMongoDB/issues"><img src="https://img.shields.io/github/issues/francislatruelle/InviteManagerMongoDB?label=Issues"></a>
    <a href="https://www.codefactor.io/repository/github/francislatruelle/invitemanagermongodb/"><img src="https://www.codefactor.io/repository/github/francislatruelle/invitemanagermongodb/badge"></a>
</p>

---

## Introduction

⚠️ This project is not finished but it is perfectly functional. Basic features are usable but many more will be coming soon.

InviteManagerMongoDB is a Discord robot made in Javascript with [Discord.js (v12.5)](https://discord.js.org) and [Mongoose](https://mongoosejs.com/) by FrancisLaTruelle.
Feel free to add a star ⭐ to the repository to promote the project !

## Features

### Non-exhaustive list:

*   Automatic invitation counting
*   Addition (or removal) of role based on user invitations 
*   False account detector (too recent) 
*   Advanced leaderboard
*   Support for translations (illimited languages)
*   Completely customizable directly on Discord
*   Manages an unlimited number of Discord servers (multi-servers) 

[See the full commands list](https://github.com/FrancisLaTruelle/InviteManagerMongoDB#commands-list)

*More features are coming very soon, feel free to make suggestions / corrections.*

**Important:** The robot parameters defined directly on Discord are unique for each server. This facilitates the management of multi-servers. 

## Installation 

### Requirements

*   [Node.js](https://nodejs.org/) (v14 recommended)
*   [MongoDB](https://www.mongodb.com/try/download/community)

This is mandatory for everything to work properly. You absolutely must have them in addition to the repository. 

### Configuration

The configuration of the internal robot is divided into 2 parts, it is your `PublicConfig.json` and `PrivateConfig.json`. As their name suggests, one contains visual information only and the other contains private information such as your Discord bot token or your mongoDB url. Changing `PrivateConfig.json` will be required to start the bot. 

**Example of `PrivateConfig.json`:**
```
{
    "token" : "XXXXXXXX",   <- Your private Discord bot token
    "mongoDB" : "mongodb+srv://XXXXXXXX:XXXXXXXX@XXXXXXXX/invitemanager"   <- Your private MongoURL
}
```

### Launch the bot

Don't forget to configure your `PrivateConfig.json` first. 
*Remember to be in the main folder to write these commands in your command prompt.*

1. Run `npm i` to install all dependencies of `package.json`
2. Run `node main.js` *or* `pm2 start main.js`
3. Enjoy it !

## Commands List

The default prefix is `/`, you can easily change it directly on Discord, it must be present before any command. 
Only the available commands are listed, the current features are in the Todo list. 

### Configuration

| Command | Description |
| --- | --- |
| `setchannels` | Define arrival and departure lounges. |
| `setfakemember` | Set the number of days for a user to be considered fake. |
| `setprefix` | Define the prefix (default: `/`). |
| `setranks` | Define the ranks of your server (roles obtainable through invitations). |

### Invitations

| Command | Description |
| --- | --- |
| `edit-invites` | Edit the number of invitations for a user (bonus invitations). |
| `invites` | See the number of invitations (since always, left, invalid, bonus and total). |
| `leaderboard` | See the top 10 server members with the most total invitations. |
| `ranks` | See the available ranks. |

### Utils
| Command | Description |
| --- | --- |
| `ping` | See robot latency. |

## To do list
### Configuration commands
- [x] setprefix
- [x] setchannels
- [x] setfakemember
- [x] setranks
- [ ] setmessage

### Invitations commands
- [x] invites
- [x] leaderboard
- [x] edit-invites
- [x] ranks

### Utils commands
- [x] ping
- [ ] help

### Events
- [x] guildMemberAdd
- [x] guildMemberRemove
- [x] inviteCreate
- [x] inviteDelete
- [x] message
- [x] missingPermissions
- [x] ready

### MongoDB
- [x] mongoDB basics functions
- [x] Guild schema
- [x] User schema

## Credits

- Guideline : [TheShadowGamer/Invite-Manager](https://github.com/TheShadowGamer/Invite-Manager)