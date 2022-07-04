import db from '../lib/database.js'

let handler = async (m, { conn }) => {
    conn.reply(m.chat, `
*HASH LIST*
\`\`\`
${Object.entries(db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `(Locked) ${key}` : key} : ${value.text}`).join('\n')}
\`\`\`
`.trim(), null, {
        mentions: Object.values(db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])
    })
}


handler.help = ['listcmd']
handler.tags = ['database']
handler.command = ['listcmd']

export default handler
