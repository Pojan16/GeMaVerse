async function handler(m, { command }) {
  command = command.toLowerCase()
  this.anonymous = this.anonymous ? this.anonymous: {}
  switch (command) {
    case 'leave': {
        let room = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!room) {
          this.sendButton(m.chat, '\`\`\`Its not that you havent joined the chat server at the moment🤔\`\`\`', author, null, [['START — Find Chat Friends', `/start`]], m)
          throw false
        }
        m.reply('_Okay!_')
        let other = room.other(m.sender)
        if (other) await this.sendButton(other, '_Your friend has left the communication😞_\n_Want to get more chat friends? Share this link on your WhatsApp status!_😁\n\nhttp://wa.me/6283122808260?text=/start', author, null, [
          ['Good Friends 👍', '/mention _Your feedback was successfully sent,_ *Thanks for a feedback!*\n\nFrom Owner: ```"Have a good day👍😃"```'],
          ['👎 do not like', '/mention _Your feedback has been successfully sent,_ *Thanks for a feedback!*\n\nFrom Owner: ```"I wish you the best👍🙂"```'],
          ['START — Find New Friends', '/start']
          ], m)
        delete this.anonymous[room.id]
        if (command === 'leave') break
      }
    /*case 'contact':
    case 'mycontact':
    case 'sendcontact':
    case 'sendmycontact': {
      let room = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!room) {
          this.sendButton(m.chat, '\`\`\`Its not that you havent joined the chat server at the moment🤔\`\`\`\n_Press the button below to send your contact_', author, null, [['START — Find Chat Friends', '/start']], m)
          throw false
        }
        let other = room.other(m.sender)
        let profile = await this.profilePictureUrl(room.b)
        let status = await this.fetchStatus(room.b)
        let msg = await this.sendFile(room.a, profile, `Name : ${await this.getName(room.b)}\nBio : ${status.status}\nUser : @${room.b.split("@")[0]}`, m, { mentions: [room.b] })
        this.sendContact(room.a, [room.b.split("@")[0]], msg)
        this.reply(other, `https://wa.me/${m.chat.split("@")[0]}`, m)
        //m.reply('Sorry, this feature is currently in error 😕')
    }
    break*/
    case 'start': {
        if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
          this.sendButton(m.chat, '*Cant find!*\n_Arent you still on the chat server at this time 🤔_', author, null, [
          ['NEXT — Find New Friends', '/next'],
          ['LEAVE — End Communication', '/leave']
          ], m)
          throw false
        }
        let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
        if (room) {
          await this.sendButton(room.a, '*Ok, Found a chat buddy!*\n\nNow that you are connected to\nCurrent chat server, please type *Hi/Hello*\nto communicate with him/her', author, null, [
            ['NEXT — Find New Friends', '/next'],
            ['LEAVE — End Communication', '/leave']
            ], m)
          room.b = m.sender
          room.state = 'CHATTING'
          await this.sendButton(room.b, '*Ok, Found a chat buddy!*\n\nNow that you are connected to\nCurrent chat server, please type *Hi/Hello*\nto communicate with him/her', author, null, [
            ['NEXT — Find New Friends', '/next'],
            ['LEAVE — End Communication', '/leave']
            ], m)
        } else {
          let id = + new Date
          this.anonymous[id] = {
            id,
            a: m.sender,
            b: '',
            state: 'WAITING',
            check: function (who = '') {
              return [this.a, this.b].includes(who)
            },
            other: function (who = '') {
              return who === this.a ? this.b: who === this.b ? this.a: ''
            },
          }
          await this.sendButton(m.chat, '_Looking for chat friends..._\n_Not getting friends? Share this link on your WhatsApp status!_😁\n\nhttp://wa.me/6283122808260?text=/start', author, null, [['CANCELLED', '/leave']], m)
        }
        break
      }
      case 'next': {
        let romeo = Object.values(this.anonymous).find(room => room.check(m.sender))
        if (!romeo) {
          this.sendButton(m.chat, '\`\`\`Its not that you havent joined the chat server at the moment🤔\`\`\`', author, null, [['START — Find Chat Friends', `/start`]], m)
          throw false
        }
        let other = romeo.other(m.sender)
        if (other) await this.sendButton(other, '_Your friend has left the communication😞_\n_Want to get more chat friends? Share this link on your WhatsApp status!_😁\n\nhttp://wa.me/6283122808260?text=/start', author, null, [
          ['Good Friends 👍', '/mention _Your feedback was successfully sent,_ *Thanks for a feedback!*\n\nFrom Owner: ```"Have a good day👍😃"```'],
          ['👎 do not like', '/mention _Your feedback has been successfully sent,_ *Thanks for a feedback!*\n\nFrom Owner: ```"I wish you the best👍🙂"```'],
          ['START — Find New Friends', '/start']
          ], m)
          delete this.anonymous[romeo.id]
          let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
          if (room) {
            await this.sendButton(room.a, '*Ok, Found a chat buddy!*\n\nNow that you are connected to\nCurrent chat server, please type *Hi/Hello*\nto communicate with him/her', author, null, [
            ['NEXT — Find New Friends', '/next'],
            ['LEAVE — End Communication', '/leave']
            ], m)
          room.b = m.sender
          room.state = 'CHATTING'
          await this.sendButton(room.b, '*Ok, Found a chat buddy!*\n\nNow that you are connected to\nCurrent chat server, please type *Hi/Hello*\nto communicate with him/her', author, null, [
            ['NEXT — Find New Friends', '/next'],
            ['LEAVE — End Communication', '/leave']
            ], m)
          } else {
            let id = + new Date
          this.anonymous[id] = {
            id,
            a: m.sender,
            b: '',
            state: 'WAITING',
            check: function (who = '') {
              return [this.a, this.b].includes(who)
            },
            other: function (who = '') {
              return who === this.a ? this.b: who === this.b ? this.a: ''
            },
          }
          await this.sendButton(m.chat, '_Looking for chat friends..._\n_Not getting friends? Share this link on your WhatsApp status!_😁\n\nhttp://wa.me/6283122808260?text=/start', author, null, [['CANCELLED', '/leave']], m)
          }
          break
      }
  }
}
handler.help = ['start', 'next', 'leave']
handler.tags = ['anonymous']
handler.command = /^start|next|leave$/i
handler.private = true
handler.limit = false
handler.register = false

export default handler
