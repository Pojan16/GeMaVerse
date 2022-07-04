// By RC047 :V

let handler = (m, { conn, text }) => {
    if (!text) throw 'Please enter a report'
    if (text.length > 500) throw 'Sorry Text Too Long, Maximum 500 Texts!'
    const laporan = `*「 REPORT 」*\nNomor : wa.me/${m.sender.split`@`[0]}\nPesan : ${text}`
    for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid && v != '6285856430321@s.whatsapp.net'))
    m.reply(laporan, jid)
    m.reply('✔️Problem has been reported to the Bot Owner, fake reports will not be responded to!')
}
handler.help = ['report'].map(v => v + ' <reason>')
handler.tags = ['bot']
handler.command = /^(report)$/i

export default handler