import { webp2mp4 } from '../lib/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `reply sticker with caption *${usedPrefix + command}*`
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) throw `reply sticker with caption *${usedPrefix + command}*`
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2mp4(media)
    }
    await conn.sendFile(m.chat, out, 'out.gif', '*DONE*', m, false, { mimetype: 'video/gif', thumbnail: Buffer.alloc(0) })
}
handler.help = ['gif [convert to gif]']
handler.tags = ['media']
handler.command = /^gif$/i

export default handler