/* Made by aine*/

async function handler(m, { command, conn, text }) {
	this.anonymous = this.anonymous ? this.anonymous : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let room = Object.values(this.anonymous).find(room => room.check(who))
	if (!room) throw 'use the */start* command to enter the chat room'
	let other = room.other(who)
  var name
  if (text) name = text
  else name = conn.getName(m.sender)
	var number = who.split('@')[0]
	this.sendMessage(m.chat, `You have successfully sent a contact to your partner...`, m)
	if (other) this.sendMessage(other, `Partner sends contact to you`, m)
	if (other) this.sendContact(other, number, name, m)
	// else (other) this.sendMessage(other, `https://wa.me/${number.split("@")[0]}`, m)
	// gatau ini apaan:v
}
handler.help = ['sendmycontact']
handler.tags = ['anonymous']
handler.command = /^(contact|mycontact|sendcontact|sendmycontact)$/i
handler.private = true
handler.fail = null

export default handler
