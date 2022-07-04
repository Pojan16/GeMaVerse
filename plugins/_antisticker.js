/*
By : Aine
*/
let handler = m => m

export function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = db.data.chats[m.chat]
  let sender = db.data.chats[m.sender]
  

  let isSticker = m.mtype
  if (chat.antiSticker && isSticker) {
    if(isSticker === "stickerMessage"){
      if (global.opts) {
        if (isAdmin || !isBotAdmin){		  
        }else{
          m.reply('*Sticker detected*\nYou will be kicked out by bot!') // ganti text terserah kamu 
          this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }return true
      }
    }
  }
  return true
}

export default handler