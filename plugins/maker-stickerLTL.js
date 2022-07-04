import { sticker } from '../lib/sticker.js'
import { stickerLine, stickerTelegram } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // TODO: add stickerly
    const isTele = /tele/i.test(command)
    if (!args[0]) throw `*This command to retrieve stickers from ${isTele ? 'Telegram' : 'Line'}*\n\nUsage examples:\n${usedPrefix + command} spongebob`
    const json = await (isTele ? stickerTelegram : stickerLine)(args[0])
    m.reply(`
*Total sticker:* ${(json[0]?.stickers || json).length}
`.trim())
    for (let data of (json[0]?.stickers || json)) {
        const stiker = await sticker(false, data.sticker || data, global.packname, global.author)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m).catch(console.error)
        await delay(1500)
    }

}
handler.help = ['stikerline <url>','stikertelegram <url>']
handler.tags = ['media']
handler.command = /^(stic?ker(line|tele(gram)?))$/i

export default handler

const delay = time => new Promise(res => setTimeout(res, time))