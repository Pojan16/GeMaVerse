import Connection from '../lib/connection.js'
import { randomBytes } from 'crypto'

let handler = async (m, { conn, text }) => {
  let chats = Object.entries(Connection.store.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Send a broadcast message to ${chats.length} chats_\n_Estimated complete *${chats.length * 1.5}* second_`, m)
  for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : teks + '\n' + readMore + '「 ' + author + ' Private Chat Broadcast 」'), true).catch(_ => _)
  m.reply('Done Broadcast in All Private Chat :D')
}
handler.help = ['broadcastprivates', 'bcpc'].map(v => v + ' <teks>')
handler.tags = ['host','owner']
handler.command = /^(broadcastprivates?|bcpc?(rivates?)?)$/i
handler.mods = true

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)