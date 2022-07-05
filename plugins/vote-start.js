let handler = async (m, { conn, text, usedPrefix }) => {
  if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) return conn.sendButton(m.chat, `_There are still votes in this chat!_`, 'touch for choose', null, [['CEK', `/cekvote`], ['DELETE', `/deletevote`]], conn.vote[id][3])
    conn.vote[id] = [
        text,
        [],
        [],
        await conn.sendButton(m.chat, 'Voting begins!', 'touch for choose', null, [['Upvote - for yes', `/upvote`], ['Devote - for no', `/devote`], ['Cek - for cek vote', '/cekvote']], m)
    ]
}
handler.help = ['startvote <reason>']
handler.tags = ['absen']
handler.command = /^(start|mulai)vote$/i
handler.group = true

export default handler