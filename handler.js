import { smsg } from './lib/simple.js'
import { plugins } from './lib/plugins.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import Connection from './lib/connection.js'
import printMessage from './lib/print.js'
import Helper from './lib/helper.js'
import db, { loadDatabase } from './lib/database.js'

// const { proto } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(this)
    resolve()
}, ms))

/**
 * Handle messages upsert
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} chatUpdate
 */
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
    if (db.data == null)
        await loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
      m.exp = 0
      m.coin = false
      m.limit = false
      try {
         // TODO: use loop to insert data instead of this
        let user = db.data.users[m.sender]
        if (typeof user !== 'object') db.data.users[m.sender] = {}
        if (user) {
          if (!isNumber(user.exp)) user.exp = 0
          if (!isNumber(user.coin)) user.coin = 5
          if (!isNumber(user.limit)) user.limit = 10
          if (!isNumber(user.lastclaim)) user.lastclaim = 0
          if (!isNumber(user.lastwork)) user.lastwork = 0
          if (!('registered' in user)) user.registered = false
          if (!user.registered) {
            if (!('name' in user)) user.name = this.getName(m.sender)
            if (!isNumber(user.age)) user.age = -1
            if (!isNumber(user.regTime)) user.regTime = -1
          }
          if (!isNumber(user.afk)) user.afk = -1
          if (!('afkReason' in user)) user.afkReason = ''
          if (!('banned' in user)) user.banned = false
          if (!isNumber(user.warn)) user.warn = 0
          if (!isNumber(user.level)) user.level = 0
          if (!user.role) user.role = 'Newbie'
          if (!('autolevelup' in user)) user.autolevelup = true
          if (!isNumber(user.pc)) user.pc = 0
        } else db.data.users[m.sender] = {
          exp: 0,
          coin: 5,
          limit: 10,
          lastclaim: 0,
          lastwork: 0,
          registered: false,
          name: this.getName(m.sender),
          age: -1,
          regTime: -1,
          afk: -1,
          afkReason: '',
          banned: false,
          warn: 0,
          level: 0,
          role: 'Newbie',
          autolevelup: true,
          pc: 0,
        }
        let chat = db.data.chats[m.chat]
        if (typeof chat !== 'object') db.data.chats[m.chat] = {}
        if (chat) {
          if (!('isBanned' in chat)) chat.isBanned = false
          if (!('welcome' in chat)) chat.welcome = true
          if (!('detect' in chat)) chat.detect = true
          if (!('sWelcome' in chat)) chat.sWelcome = ''
          if (!('sBye' in chat)) chat.sBye = ''
          if (!('sPromote' in chat)) chat.sPromote = ''
          if (!('sDemote' in chat)) chat.sDemote = ''
          if (!('delete' in chat)) chat.delete = true
          if (!('antiLink' in chat)) chat.antiLink = true
          if (!isNumber(chat.expired)) chat.expired = 0
          if (!('getmsg' in chat)) chat.getmsg = true
          if (!('antiSticker' in chat)) chat.antiSticker = false
          if (!('simi' in chat)) chat.simi = false
          if (!('viewonce' in chat)) chat.viewonce = true
        } else db.data.chats[m.chat] = {
          isBanned: false,
          welcome: true,
          detect: true,
          sWelcome: '',
          sBye: '',
          sPromote: '',
          sDemote: '',
          delete: true,
          antiLink: true,
          expired: 0,
          getmsg: true,
          antiSticker: false,
          simi: false,
          viewonce: true,
        }
        let settings = db.data.settings[this.user.jid]
        if (typeof settings !== 'object') db.data.settings[this.user.jid] = {}
        if (settings) {
          if (!('autoread' in settings)) settings.autoread = true
          if (!('nyimak' in settings)) settings.nyimak = false
          if (!('self' in settings)) settings.self = false
          if (!('pconly' in settings)) settings.pconly = false
          if (!('gconly' in settings)) settings.gconly = false
          if (!isNumber(settings.status)) settings.status = 0
        } else db.data.settings[this.user.jid] = {
          autoread: true,
          nyimak: false,
          self: false,
          pconly: false,
          gconly: false,
          status: 0,
        }
      } catch (e) {
        console.error(e)
      }
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (opts['pconly'] && m.chat.endsWith('g.us')) return
      if (opts['gconly'] && !m.chat.endsWith('g.us')) return
      if (typeof m.text !== 'string') m.text = ''

      const isROwner = [this.decodeJid(this.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      const isOwner = isROwner || m.fromMe
      const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

      if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }

      if (m.isBaileys) return
      m.exp += Math.ceil(Math.random() * 10)

      let usedPrefix
      let _user = db.data && db.data.users && db.data.users[m.sender]

      const groupMetadata = (m.isGroup ? await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata) : {}) || {}
      const participants = (m.isGroup ? groupMetadata.participants: []) || []
      const user = (m.isGroup ? participants.find(u => this.decodeJid(u.jid) == m.sender) : {}) || {} // User Data
      const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.jid) == this.user.jid) : {}) || {} // Your Data
      const isRAdmin = user?.admin == 'superadmin' || false
      const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
      const isBotAdmin = bot?.admin || false // Are you Admin?

      const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
      for (let name in plugins) {
        let plugin = plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    // if (typeof e === 'string') continue
                    console.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
                    }
                }
            }
                if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
        const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        let _prefix = plugin.customPrefix ? plugin.customPrefix: this.prefix ? this.prefix: global.prefix
        let match = (_prefix instanceof RegExp ? // RegExp Mode?
          [[_prefix.exec(m.text), _prefix]]:
          Array.isArray(_prefix) ? // Array?
          _prefix.map(p => {
            let re = p instanceof RegExp ? // RegExp in Array?
            p:
            new RegExp(str2Regex(p))
            return [re.exec(m.text), re]
          }):
          typeof _prefix === 'string' ? // String?
          [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]:
          [[[], new RegExp]]
        ).find(p => p[1])
        if (typeof plugin.before === 'function') {
          if (await plugin.before.call(this, m, {
              match,
              conn: this,
              participants,
              groupMetadata,
              user,
              bot,
              isROwner,
              isOwner,
              isRAdmin,
              isAdmin,
              isBotAdmin,
              isPrems,
              chatUpdate,
              __dirname: ___dirname,
              __filename
          })) continue
        }
        if (typeof plugin !== 'function') continue
        if ((usedPrefix = (match[0] || '')[0])) {
          let noPrefix = m.text.replace(usedPrefix, '')
          let [command,
            ...args] = noPrefix.trim().split` `.filter(v => v)
          args = args || []
          let _args = noPrefix.trim().split` `.slice(1)
          let text = _args.join` `
          command = (command || '').toLowerCase()
          let fail = plugin.fail || global.dfail // When failed
          let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
          plugin.command.test(command):
          Array.isArray(plugin.command) ? // Array?
          plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
            cmd.test(command):
            cmd === command
          ):
          typeof plugin.command === 'string' ? // String?
          plugin.command === command:
          false

          if (!isAccept) continue
          m.plugin = name
          if (m.chat in db.data.chats || m.sender in global.db.data.users) {
            let chat = db.data.chats[m.chat]
            let user = db.data.users[m.sender]
            if (name != 'owner-unbanchat.js' && chat?.isBanned) return // Except this
            if (name != 'owner-unbanuser.js' && user?.banned) return
          }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) {
            // Both Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) {
            // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) {
            // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.mods && !isMods) {
            // Moderator
            fail('mods', m, this)
            continue
          }
          if (plugin.premium && !isPrems) {
            // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) {
            // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) {
            // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) {
            // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) {
            // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) {
            // Butuh daftar?
            fail('unreg', m, this)
            continue
          }

          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp): 16 // XP Earning per command
          if (xp > 200) m.reply('Cheat -_-') // Hehehe
          else m.exp += xp
          if (plugin.coin && global.db.data.users[m.sender].coin < plugin.coin * 1) {
            this.reply(m.chat, `_Your coins run out, please work by typing_ */work*`, m)
            continue // Coin habis
          }
          if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
            this.reply(m.chat, `_Your limit is up, please buy via_ */shop*`, m)
            continue // Limit habis
          }
          if (plugin.level > _user.level) {
            this.reply(m.chat, `_required level ${plugin.level} to use this command._\n\n_Your level:_ *${_user.level}*`, m)
            continue // If the level has not been reached
          }
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename
          }
          try {
            await plugin.call(this, m, extra)
            if (!isPrems) m.limit = m.limit || plugin.limit || false
          } catch (e) {
            // Error occured
            m.error = e
            console.error(e)
            if (e) {
              let text = format(e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
              if (e.name)
                 for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                     let data = (await this.onWhatsApp(jid))[0] || {}
                     if (data.exists)
                        m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                 }
              m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
            if (m.limit) m.reply(+ m.limit + ' *Used limit*\n_Use the limit as necessary, so as not to run out in vain_')
          }
          break
        }
      }
    } catch (e) {
        console.error(e)
    } finally {
      if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (quequeIndex !== -1)
                this.msgqueque.splice(quequeIndex, 1)
      }
      //console.log(db.data.users[m.sender])
      let user,
      stats = db.data.stats
      if (m) {
        if (m.sender && (user = db.data.users[m.sender])) {
          user.coin += m.coin
          user.limit -= m.limit * 1
        }

        let stat
        if (m.plugin) {
          let now = + new Date
          if (m.plugin in stats) {
            stat = stats[m.plugin]
            if (!isNumber(stat.total)) stat.total = 1
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0: 1
            if (!isNumber(stat.last)) stat.last = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0: now
          } else stat = stats[m.plugin] = {
            total: 1,
            success: m.error != null ? 0: 1,
            last: now,
            lastSuccess: m.error != null ? 0: now
          }
          stat.total += 1
          stat.last = now
          if (m.error == null) {
            stat.success += 1
            stat.lastSuccess = now
          }
        }
      }

      try {
        if (!opts['noprint']) await printMessage(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
      if (opts['autoread'])
           await this.readMessages([m.key])
    }
  }

/**
 * Handle groups participants update
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupsUpdate 
 */
export async function participantsUpdate({ id, participants, action }) {
    if (opts['self'])
        return
    if (this.isInit)
        return
    if (db.data == null)
        await loadDatabase()
    let chat = db.data.chats[id] || {}
    let text = ''
    switch (action) {
      case 'add':
      case 'remove':
        if (chat.welcome) {
          let groupMetadata = await Connection.store.fetchGroupMetadata(id, this.groupMetadata)
          for (let user of participants) {
            let pp = './src/avatar_contact.png'
            try {
              pp = await this.getProfilePicture(user, 'image')
            } catch (e) {
            } finally {
              text = (action === 'add' ? (chat.sWelcome || this.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow') :
                  (chat.sBye || this.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                  this.sendFile(id, pp, 'pp.jpg', text, null, false, { mentions: [user] })
            }
          }
        }
        break
      case 'promote':
            text = (chat.sPromote || this.spromote || Connection.conn.spromote || '@user ```is now Admin```')
        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || Connection.conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
  }
  
/**
 * Handle groups update
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
  export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || Connection.conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || Connection.conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || Connection.conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || Connection.conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
 }
 
/**
 * @this {import('./lib/connection').Socket}
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.delete']} message 
 */
 export async function deleteUpdate(message) {
    if (message.keys && Array.isArray(message.keys)) {
        try {
            for (const key of message.keys) {
                if (key.fromMe) continue
                const msg = Connection.store.loadMessage(key.id)
                if (!msg) continue
                let chat = db.data.chats[msg.key.remoteJid]
                if (!chat || chat.delete) continue
                const participant = msg.participant || msg.key.participant || msg.key.remoteJid
                await this.reply(msg.key.remoteJid, `
_Detected, @${participant.split`@`[0]} deleted message._
`.trim(), msg, {
                mentions: [participant]
                })
                this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
            }
        } catch (e) {
            console.error(e)
        }
    }
 }

global.dfail = (type, m, conn) => {
  let msg = {
    rowner: '_Can\'t do it because you\'re not_ *GeMa Bot Owner!*',
    owner: '_Because you\'re not_ *Pilot of This Bot*, _GeMa can\'t execute the command!_',
    mods: '_Only_ *GeMa Moderators* _can use this command!_',
    premium: '_Become a member_ *Premium* _to use this command!_\nContact *Owner* to upgrade to Premium!',
    group: '_Use this command_ *in Group Chat!*\n\nJoin GeMa Bot group\nhttps://chat.whatsapp.com/L0k6LTaMWtpHlhSf2Nsm7D',
    private: '_Please use_ *in Private Chat Bot!* _to use this command!_',
    admin: '_Can only be done by_ *Admin* _Group!_',
    botAdmin: '_Make GeMa Bot as_ *Admin Group* _to use this command!_',
    unreg: 'You must verify your account first! use:\n\n*/register your name.your age*\n\nExample: /register Human.15\n\n*ERROR ONLY 1 LETTERS OR WORD, BOTS WILL NOT RESPOND!*',
  }[type]
  if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (Connection.reload) console.log(await Connection.reload(await Connection.conn))
})
