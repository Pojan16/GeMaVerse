//credits: https://github.com/ariffb25/
//buatan Zeroz04n aseli awikwok
import db from '../lib/database.js'
import moment from 'moment-timezone'

export async function all(m) {
  if (m.isGroup) return
  let users = db.data.users[m.sender]
  if (new Date() - users.pc < 43200000) return // setiap 12 jam
const sections = [
  {
    title: "Choose One To Bring Up The Contents Of The Bot",
    rows: [
      {title: "T&C or Rules", rowId: "/tnc", description: "Terms & Conditions of this bot"},
      {title: "MENU BOT", rowId: "/menu", description: "Show menu!"},
      {title: "START", rowId: "/start", description: "Find Friends Anonymous Chat"},
      ]
  }
  ]
  const listMessage = {
    text: `
\`\`\`Hi, I am GeMa WhatsApp Bot Assistant who is ready to help you with some of the features that the bot has.

By starting this conversation, you agree to the terms and conditions of GeMa-Bot, right? 🤔\`\`\`

_PLEASE SEND TO YOUR WHATSAPP STATUS_ 😁
_wa.me/6283122808260?text=.start_

*Don't forget to subscribe and share!* 💌
_t.me/gemazan/_
`,
footer: "Nice footer, link: https://linktr.ee/Zeroz04n",
title: '*Welcome to the official GeMa-Bot WhatsApp*🤖',
buttonText: "Press To Select",
sections
  }
  this.sendMessage(m.chat, listMessage, m)
  users.pc = new Date() * 1
}
/*function ucapan() {
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
}*/