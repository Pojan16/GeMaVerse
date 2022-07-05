import db from '../lib/database.js'

let handler = async (m, { command, usedPrefix, text }) => {
    if (!text) throw `Use *${usedPrefix}listmsg* to see the list`
    let msgs = db.data.msgs
    if (!(text in msgs)) throw `'${text}' not registered in message list`
    delete msgs[text]
    m.reply(`Successfully deleted message in message list with name '${text}'`)
}
handler.help = ['msg'].map(v => 'del' + v + ' <text>')
handler.tags = ['database']
handler.command = /^delmsg$/

export default handler
