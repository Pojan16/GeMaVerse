import db, { loadDatabase } from './lib/database.js'
import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async (m, { text, usedPrefix }) => {
  let user = db.data.users[m.sender]
  if (user.registered === true) throw `You are already registered\nWant to re-register? ${usedPrefix}unreg <serial number>`
  if (!Reg.test(text)) throw `*Incorrect format!*\n\nRead carefully!:\n\nUse: *${usedPrefix}register yourname.yourage*\nExample: _${usedPrefix}register Man.15_`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Name cannot be empty, must contain letters (Alphanumeric)'
  if (!age) throw 'Age cannot be empty, it must contain a number (Numbers)'
  age = parseInt(age)
  if (age > 60) throw 'Your age is too old'
  if (age < 6) throw 'Babies can type according to the format? ._.'
  user.name = name
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let totalreg = Object.keys(db.data.users).length
  m.reply(`
REGISTERED SUCCESFULL!

───「 Verification 」───
 ++
 + Name: ${name}
 + Age: ${age} y./o
 + SN: ${sn}
 
 If your SN is lost: _/mysn_
───────────────────
Thank you for verifying.
Total registered users: ${totalreg}
To use the Bot, please type /menu

*_- Undefined_*
`.trim())
}
handler.help = ['register <name>.<age>']
handler.tags = ['daftar']
handler.command = /^(daftar|register)$/i

export default handler
