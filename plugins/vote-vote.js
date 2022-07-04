let handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat
    conn.vote = conn.vote ? conn.vote : {}
    if (!(id in conn.vote)) return conn.sendButton(m.chat, `_*No voting in this group!*_`, 'touch to start', null, [['START', `/mulaivote`]], conn.vote[id][3])
    let isVote = conn.vote[id][1].concat(conn.vote[id][2])
    const wasVote = isVote.includes(m.sender)
    if (wasVote) throw 'You have chosen!'
    if (/up/i.test(command)) {
        conn.vote[id][1].push(m.sender)
    } else if (/de/i.test(command)) {
        conn.vote[id][2].push(m.sender)
    }
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

`.trim(), 'VOTING MESSAGE', null, [['Upvote', '/upvote'], ['Devote', '/devote'], ['Delete', '/deletevote']], m)
}
handler.help = ['upvote', 'devote']
handler.tags = ['absen']
handler.command = /^(up|de)vote$/i
handler.group = true

export default handler