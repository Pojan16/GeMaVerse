import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
let tags = {
  'main': 'MAIN',
  'daftar': 'REGISTER',
  'absen': 'FOR USERS',
  'anonymous': 'ANONYMOUS CHAT',
  'gameid': 'INDONESIAN GAME',
  'gameov': 'OVERSEAS GAME',
  'hari': 'DAILY',
  'media': 'MAKER & CONVERTER',
  'admin': 'ADMIN GROUP',
  'group': 'GROUP CMD',
  'download': 'DOWNLOADER',
  'islam': 'ISLAMIC MENU',
  'search': 'SEARCH',
  'tools': 'TOOLS',
  'vc': 'VOICE CHANGE',
  'database': 'DATABASE',
  'sobot': 'BECOME BOT',
  'host': 'MODERATOR',
  'owner': 'OWNER BOT',
  'bot': 'BOT CMD',
  'info': 'OTHER & INFO',
  'advanced': 'ADVANCED',
}
const defaultMenu = {
  before: `
Hi, %name! ️

This is the command menu on this bot
Total Users : *%totalreg* members

Powered by: *Fajrul Tamam*
%readmore
`.trimStart(),
  header: '*%category*',
  body: '• %cmd %isLimit %isPremium',
  footer: '\n',
  after: `
━━「 *Thanks for you* 」━━
@%person
Please join *GROUP* by pressing the button below for status and updates from GeMa BOT.

----------------
Want to advertise here? Contact. 6285856430321
Report to Owner If you find errors, suggestions, criticisms, and donations for BOT. (v.BETA)
`,
}
let handler = (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let { coin, exp, limit, warn, level, role, registered } = db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = registered ? db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date() + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let islamicDate = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(db.data.users).length
    let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isLimit/g, menu.limit ? '*(Limit)*' : '')
                .replace(/%isPremium/g, menu.premium ? '*(Premium)*' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      person: m.sender.split('@')[0],
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      level, warn, limit, coin, name, weton, week, date, islamicDate, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    let pp = '../src/anime.jpg'
    conn.sendHydrated(m.chat, text.trim(), author, pp, 'https://t.me/gemazan', 'Whats New?', null, null, [
      ['Donation', '/donasi'],
      ['Speed', '/ping'],
      ['Group', '/forum']
    ], { asLocation: true }, m)
  } catch (e) {
    conn.reply(m.chat, 'Sorry, the menu is in error 😕', m)
    throw e
  }
}
handler.help = ['menu','?']
handler.tags = ['main']
handler.command = /^(menu|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 5

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
