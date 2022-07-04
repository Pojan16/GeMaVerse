import { pinterest } from '@bochilteam/scraper'

let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Example use ${usedPrefix + command} tomioka giyu`
  const json = await pinterest(text)
  conn.sendFile(m.chat, json.getRandom(), 'pinterest.jpg', `
*Search result*
${text}
`.trim(), m)
}
handler.help = ['pinterest <keyword>']
handler.tags = ['search']
handler.command = /^(pinterest)$/i

export default handler