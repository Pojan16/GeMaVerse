import db from '../lib/database.js'
let handler = async (m, { conn }) => {
  let totalreg = Object.keys(db.data.users).length
  let name = await conn.getName(m.sender)
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
// send a list message!
const sections = [
    {
	title: "Anonymous Chat",
	rows: [
	    {title: "START", rowId: "/start", description: "Find Chat Friends"},
	    {title: "NEXT", rowId: "/next", description: "Find New Friends"},
	    {title: "LEAVE", rowId: "/leave", description: "End Communication"}
	]
    },
   {
	title: "Send Your Number to Friends Chat",
	rows: [
	    {title: "SEND MY CONTACT", rowId: "/sendmycontact", description: "Starting a Private Chat"}
	]
    },
   {
	title: "OTHER HELP",
	rows: [
	    {title: "MENU", rowId: "/?", description: "To Show All Menu"},
	    {title: "PING", rowId: "/ping", description: "Speed Test Bot Is On or Not"}
	]
    },
]

const listMessage = {
  text: `
_Hi,_ ${name}! _This is the command menu on this bot_

_Active During_ *${uptime}*
*${totalreg}* _User_

\`\`\`
› /start
› /next
› /leave
› /sendmycontact
\`\`\`

━━「 *Thanks for you* 」━━
_Please join_ *GROUP* _by pressing the button below for status and updates from GeMa BOT._

----------------
_Want to advertise here? Contact._ 6285856430321
_Report to Owner If you find errors, suggestions, criticisms, and donations for BOT. (v.BETA)_
`,
  footer: "Nice footer, link: https://linktr.ee/Zeroz04n",
  title: '━━「 ' + author + ' 」━━',
  buttonText: "Required Press to View List",
  sections
  }
conn.sendMessage(m.chat, listMessage, m)
}
handler.help = ['help']
handler.tags = ['main']
handler.command = /^help$/i

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
