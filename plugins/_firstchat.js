//credits: https://github.com/ariffb25/
//buatan Zeroz04n aseli awikwok
import db from '../lib/database.js'
import moment from 'moment-timezone'

export async function all(m) {
  if (m.isGroup) return
  let users = db.data.users[m.sender]
  if (new Date - users.pc < 43200000) return // setiap 12 jam
  let rows = [{
    title: 'T&C Or Rules',
    description: "Terms & Conditions of this bot",
    rowId: "/snk"
  },
    {
      title: 'MENU BOT',
      description: "Show menu!",
      rowId: "/menu"
    },
    {
      title: 'START',
      description: "Find Friends Anonymous Chat",
      rowId: "/start"
    },
  ]

  let sections = [{
    title: "Choose One To Bring Up The Contents Of The Bot",
    rows: rows
  }]
  let button = {
    buttonText: 'Press To Select',
    description: `
*Welcome to the official GeMa-Bot WhatsApp*🤖

\`\`\`Hi, ${ucapan()}, I am GeMa WhatsApp Bot Assistant who is ready to help you with some of the features that the bot has.

By starting this conversation, you agree to the terms and conditions of GeMa-Bot, right? 🤔\`\`\`

_PLEASE SEND TO YOUR WHATSAPP STATUS_ 😁
_wa.me/6283122808260?text=.start_

*Don't forget to subscribe and share!* 💌
_t.me/gemazan/_`,
    sections: sections,
    listType: 1
  }
  await this.sendMessage(m.chat, button, listMessage, m)
  users.pc = new Date * 1
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Good early days 🌚"
  if (time >= 4) {
    res = "Good morning 🌝"
  }
  if (time >= 10) {
    res = "Good afternoon 😴"
  }
  if (time >= 15) {
    res = "Good afternoon 🌝"
  }
  if (time >= 18) {
    res = "Good night 🌚"
  }
  return res
}