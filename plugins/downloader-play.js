import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Not found'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
📌 *Title:* ${title}
🔗 *Url:* ${url}
🖹 *Description:* ${description}
⏲️ *Published:* ${publishedTime}
⌚ *Duration:* ${durationH}
👁️ *Views:* ${viewH}
  `.trim(), author, thumbnail, url, 'Go To Youtube!', null, null, [
    ['Audio', `${usedPrefix}yta ${url} yes`],
    ['Video', `${usedPrefix}ytv ${url} yes`],
    ['Youtube Search', `${usedPrefix}yts ${url}`]
  ], m)
}
handler.help = ['play'].map(v => v + ' <search>')
handler.tags = ['download']
handler.command = /^play$/i

handler.exp = 0
handler.limit = false

export default handler

