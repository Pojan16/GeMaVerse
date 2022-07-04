let handler = m => m.reply(`
━━「 *Payment* 」━━
 • quota / pulse
 -Indosat [6285856430321]
 -Axis [6283122808260]
 
 • cash / money
 -Gopay [6283122808260]
 -Dana [6283122808260]
 
 • saweria
 - https://saweria.co/Zeroz04n

 • trakteer
 - https://trakteer.id/Zeroz04n
`.trim()) // Gak tau pengen beli rumah:v
handler.help = ['donasi']
handler.tags = ['bot']
handler.command = /^dona(te|si)$/i

export default handler
