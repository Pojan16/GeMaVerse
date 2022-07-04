import { areJidsSameUser } from '@adiwajshing/baileys'
let handler = async (m, { conn, participants }) => {
    let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id))
    let demotedUser = []
    for (let user of users)
        if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
            const res = await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
            demotedUser.concat(res)
            await delay(1 * 1000)
        }
    m.reply(`Succes demote ${demotedUser.map(v => '@' + v.split('@')[0])}`, null, { mentions: demotedUser })

}
handler.help = ['demote @user']
handler.tags = ['admin']
handler.command = /^demote$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))