let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `If you find an error message, report it using this command\n\nexample:\n${usedPrefix + command} Good afternoon owner, I found an error like the following <copy/tag the error message>`
    if (text.length < 10) throw 'The report is too short, at least 10 characters!'
    if (text.length > 500) throw 'Sorry Text Too Long, Maximum 500 Texts!'
    let teks = `*${command.toUpperCase()}!*\n\nDari : *@${m.sender.split`@`[0]}*\n\nPesan : ${text}\n`
    conn.reply(global.owner[0] + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })
    m.reply(`️_✔️Issue has been reported to Bot Owner, if ${command.toLowerCase()} is fake or just messing around no response!_`)
    /*const laporan = `*「 REPORT 」*\nNomor : wa.me/${m.sender.split`@`[0]}\nPesan : ${text}`
    for (let jid of global.owner.filter(v => v != conn.user.jid && v != '6285856430321@s.whatsapp.net'))
    m.reply(laporan, jid)
    m.reply('✔️Masalah telah dilaporkan ke Pemilik Bot, laporan palsu tidak akan ditanggapi!')*/
}
handler.help = ['report'].map(v => v + ' <reason>')
handler.tags = ['bot']
handler.command = /^(report)$/i

export default handler