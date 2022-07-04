let handler = async (m, { conn, text }) => {
	conn.game = conn.game ? conn.game : {}
	try {
		if (conn.game) {
			delete conn.game
			conn.reply(m.chat, `Successfully delete session ttt`, m)
		} else if (conn.game) {
			m.reply(`Session ttt🎮 there isn't any, play /ttt`)
		} else throw '?'
	} catch (e) {
		m.reply('damaged')
	}
}
//BY RIZXYU
handler.help = ['delsesittt']
handler.tags = ['gameov']
handler.command = /^delsesittt$/i

export default handler