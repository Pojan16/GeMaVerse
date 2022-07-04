let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
  if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `_*No voting in this group!*_`, 'touch to start', null, [['START', `/mulaivote`]], m)
    delete conn.vote[id]
    m.reply(`Done!`)

}
handler.help = ['deletevote']
handler.tags = ['absen']
handler.command = /^(delete|hapus)vote$/i
handler.group = true

export default handler