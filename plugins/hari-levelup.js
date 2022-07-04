import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import db from '../lib/database.js'

let handler = async (m, { conn }) => {
    let user = db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
Level *${user.level} (${user.exp - min}/${xp})*
Less *${max - user.exp}* again!
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `Congrats ${conn.getName(m.sender)} go up level🧬`
        let str = `
${teks} 
• 🧬Previous Level : ${before}
• 🧬New Levels : ${user.level}
• at o'clock : ${new Date().toLocaleString('id-ID')}
*_The more you interact with bots, the higher your level_*
`.trim()
        try {
            const img = await levelup(teks, user.level)
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['hari']
handler.command = /^levelup$/i

export default handler