import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async (m, { conn, text }) => {
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`SN: ${sn}`.trim())
}
handler.help = ['mysn']
handler.tags = ['daftar']
handler.command = /^(mysn)$/i
handler.register = true

export default handler