let handler = async (m, { conn, usedPrefix, text, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) return conn.sendButton(m.chat, `There are still absences in this chat!`, author, null, [['Wipe', `${usedPrefix}hapusabsen`], ['Cek', `${usedPrefix}cekabsen`]], conn.absen[id][0])
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Absence begins`, author, null, [['Absen', `${usedPrefix}absen`]], m),
        [],
        text
    ]
}
handler.help = ['startabsen <text>']
handler.tags = ['absen']
handler.command = /^(start|mulai|\+)absen$/i
handler.group = true

export default handler