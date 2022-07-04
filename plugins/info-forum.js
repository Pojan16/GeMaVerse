let handler = async (m, { conn }) => {
let link = `
Go to this link to join my WhatsApp group:
https://chat.whatsapp.com/GPqFbXMXCIAHj3VNwscX29
`.trim()
conn.fakeReply(m.chat, link, '0@s.whatsapp.net', 'Thank you for supporting our bot', 'status@broadcast')
}
handler.help = ['forum']
handler.tags = ['info']
handler.command = /^(forum|link)$/i

export default handler