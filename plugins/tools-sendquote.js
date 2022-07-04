async function handler(m) {
    if (!m.quoted) throw 'reply message!'
    let q = await m.getQuotedObj()
    if (!q.quoted) throw 'the message you are replying to does not contain a reply!'
    await q.quoted.copyNForward(m.chat, true)
}
handler.help = ['q']
handler.tags = ['tools']
handler.command = /^q$/i

export default handler