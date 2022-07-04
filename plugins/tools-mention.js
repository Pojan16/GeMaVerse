let handler = async (m, { conn, text }) => {
  if (!text) throw 'No text'
  m.reply(text, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(text)
    }
  })
}
handler.help = ['mention','say']
handler.tags = ['tools']
handler.command = /^(mention|say)$/i

export default handler
