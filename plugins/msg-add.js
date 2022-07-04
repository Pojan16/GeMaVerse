const { proto } = (await import('@adiwajshing/baileys')).default
import db from '../lib/database.js'

let handler = async (m, { conn, command, usedPrefix, text }) => {
    let M = proto.WebMessageInfo
    if (!m.quoted) throw `Reply to messages with commands *${usedPrefix + command}*`
    if (!text) throw `Use:${usedPrefix + command} <teks>\n\nExample:\n${usedPrefix + command} tes`
    let msgs = db.data.msgs
    if (text in msgs) throw `'${text}' registered!`
    msgs[text] = M.fromObject(await m.getQuotedObj()).toJSON()
    m.reply(`Successfully added message '${text}'\n\nAccess it by typing its name`.trim())
}
handler.help = ['msg'].map(v => 'add' + v + ' <teks>')
handler.tags = ['database']
handler.command = /^addmsg$/

export default handler
