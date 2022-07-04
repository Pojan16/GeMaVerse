//credits: https://github.com/findme-19/
//recode: Zeroz04n 
//katanya cuma  tes tapi gatawu:v
import qrcode from 'qrcode'

if (global.conns instanceof Array) console.log() // for (let i of global.conns) global.conns[i] && global.conns[i].user ? global.conns[i].close().then(() => delete global.conns[id] && global.conns.splice(i, 1)).catch(global.conn.logger.error) : delete global.conns[i] && global.conns.splice(i, 1)
else global.conns = []

let handler = async (m, {
	conn,
	args,
	usedPrefix,
	command,
	isOwner
}) => {
	//if (!global.db.data.settings[conn.user.jid].jadibot) return conn.sendButton(m.chat, 'Jadibot tidak aktif', '', isOwner ? `Aktifkan` : `Owner`, isOwner ? `${usedPrefix}1 jadibot` : `${usedPrefix}owner`, m)
	let parent = args[0] && args[0] == 'plz' ? conn : global.conn
	let auth = false
	if ((args[0] && args[0] == 'plz') || global.conn.user.jid == conn.user.jid) {
		let id = global.conns.length
		let conn = new global.conn.constructor()
		let state, saveState
		conn.browserDescription = ['GeMaVerse', '', '5.0']
		if (args[0] && args[0].length > 200) {
			let json = Buffer.from(args[0], 'base64').toString('utf-8')
			// global.conn.reply(m.isGroup ? m.sender : m.chat, json, m)
			let obj = JSON.parse(json)
			state = await conn.useSingleFileAuthState(obj)
			auth = true
		}
		conn.ev.on('connection.update', async ({qr}) => {
			let scan = await parent.sendFile(m.chat, await qrcode.toDataURL(qr, {
				scale: 8
			}), 'qrcode.png', 'ID: Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik\n\n\nEN: Scan this QR to become a temporary bot\n\n1. Click the three dots in the top right corner\n2. Tap WhatsApp Web\n3. Scan this QR \nQR Expires in 20 seconds', m)
			setTimeout(() => {
				parent.deleteMessage(m.chat, scan.key)
			}, 30000)
		})
		conn.welcome = conn.welcome + ''
		conn.bye = conn.bye + ''
		conn.spromote = conn.spromote + ''
		conn.sdemote = conn.sdemote + ''
		conn.handler = conn.handler.bind(conn)
		conn.participantsUpdate = conn.participantsUpdate.bind(conn)
		conn.onDelete = conn.deleteUpdate.bind(conn)
		conn.connectionUpdate = conn.connectionUpdate.bind(conn)
		conn.credsUpdate = conn.saveState.bind(conn)

		conn.ev.on('messages.upsert', conn.handler)
		conn.ev.on('group-participants.update', conn.participantsUpdate)
		conn.ev.on('message.delete', conn.onDelete)
		conn.ev.on('connection.update', conn.connectionUpdate)
		conn.ev.on('creds.update', conn.credsUpdate)
		/*conn.connect().then(async ({
			user
		}) => {
			parent.reply(m.chat, 'Berhasil tersambung dengan WhatsApp - mu.\n*NOTE: Ini cuma numpang*\n' + JSON.stringify(user, null, 2), m)
			if (auth) return
			await parent.sendMessage(user.jid, `Kamu bisa login tanpa qr dengan pesan dibawah ini. untuk mendapatkan kode lengkapnya, silahkan kirim *${usedPrefix}getcode* untuk mendapatkan kode yang akurat`, MessageType.extendedText)
			parent.sendMessage(user.jid, `${usedPrefix + command} ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, MessageType.extendedText)
		})*/
		conn.makeWASocket({auth: state}).then(async ({
		 user
		 }) => {
		 parent.reply(m.chat, 'Successfully connected with your WhatsApp.\n*NOTE: Its just a ride*\n' + JSON.stringify(user, null, 2), m)
			if (auth) return
			await parent.reply(user.jid, `ID: Kamu bisa login tanpa qr dengan pesan dibawah ini. untuk mendapatkan kode lengkapnya, silahkan kirim *${usedPrefix}getcode* untuk mendapatkan kode yang akurat\n\n\nEN: You can login without qr with the message below. to get the complete code, please send *${usedPrefix}getcode* to get the accurate code` , m)
			
		 })
		setTimeout(() => {
			if (conn.user) return
			conn.close()
			let i = global.conns.indexOf(conn)
			if (i < 0) return
			delete global.conns[i]
			global.conns.splice(i, 1)
		}, 60000)
		conn.ev.on('close', () => {
			setTimeout(async () => {
				try {
					if (conn.state != 'close') return
					if (conn.user && conn.user.jid)
						parent.reply(conn.user.jid, `Connection lost...`,false)
					let i = global.conns.indexOf(conn)
					if (i < 0) return
					delete global.conns[i]
					global.conns.splice(i, 1)
				} catch (e) {
					conn.logger.error(e)
				}
			}, 30000)
		})
		conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            // reconnect if not logged out
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            //console.log('opened connection')
        }
    })
		global.conns.push(conn)
	} else throw 'Cant make a bot inside a bot!\n\nhttps://wa.me/' + global.conn.user.jid.split`@` [0] + '?text=.becomebot'
}
handler.help = ['becomebot']
handler.tags = ['sobot']
handler.command = /i(jadibot|becomebot)$/i
handler.limit = true

export default handler