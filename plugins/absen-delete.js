let handler = async (m, { conn, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) return conn.sendButton(m.chat, `No absenteeism takes place!`, author, null, [['Start', `${usedPrefix}+absen`]], m)
    delete conn.absen[id]
    m.reply(`Attendance deleted successfully ✓️`)
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.command = /^(delete|hapus|-)absen$/i
handler.group = true

export default handler