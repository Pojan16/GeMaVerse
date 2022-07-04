import db from '../lib/database.js'

export function before(m) {
    let user = db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
  Your AFK status has been revoked for doing activities on the bot server${user.afkReason ? ' after ' + user.afkReason : ''}
  During ${(new Date - user.afk).toTimeString()}
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`
  Sssttt!🤫 him/her still AFK😴, Do not disturb! ${reason ? 'with reason ' + reason : 'no reason or busy'}
  During ${(new Date - afkTime).toTimeString()}
  `.trim())
    }
    return true
}
