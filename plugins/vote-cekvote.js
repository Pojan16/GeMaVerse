let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `_*No voting in this group!*_`, 'touch to start', null, [['START', `/mulaivote`]], m)
    let [reason, upvote, devote] = conn.vote[id]
    conn.sendButton(m.chat, `
*⌜ VOTING ⌟*

*Reason:* ${reason}

*UPVOTE*
_Total: ${upvote.length}_
${upvote.map(u => '@' + u.split('@')[0]).join('\n')}

*DEVOTE*
_Total: ${devote.length}_
${devote.map(u => '@' + u.split('@')[0]).join('\n')}

`.trim(), 'VOTING MESSAGE', null, [['DELETE', '/deletevote']], m)
}
handler.help = ['cekvote']
handler.tags = ['absen']
handler.command = /^cekvote$/i
handler.group = true

export default handler
