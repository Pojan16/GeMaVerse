import db, { loadDatabase } from '../lib/database.js'
import { createHash } from 'crypto'
let handler = (m, { args }) => {
  if (!args[0]) throw 'Serial Number is empty, check your sn using _/mysn_ to enter a valid sn!'
  let user = db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw 'Wrong Serial Number'
  user.registered = false
  m.reply(`Unreg Success!`)
}
handler.help = ['unreg <serial number>']
handler.tags = ['daftar']
handler.command = /^unreg(ister)?$/i
handler.register = true

export default handler
