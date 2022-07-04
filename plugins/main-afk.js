import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
    let user = db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`
    ❗ ⌜ Away From Keyboard ⌟

    ⤷ ${conn.getName(m.sender)} IS NOW AFK!
    ⤷ REASON ${text ? ': ' + text : ''}
  `)
}
handler.help = ['afk [reason]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler