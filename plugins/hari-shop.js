const Bexp = 150
const Sexp = 100
const Blimit = 250
const Slimit = 200
let handler = async (m, { conn, command, args, usedPrefix }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[1] || '').toLowerCase()
  let jualbeli = (args[0] || '').toLowerCase()
  const str = `
  \`\`\`Welcome to GeMaShop\`\`\`
  *Happy shopping*
  ━━━━━━━━━━━━━━━━━
  Use: ${usedPrefix}shop < Buy|Sell > < item > < total >
  Example: *${usedPrefix}shop buy limit 1*
  ━━━━━━━━━━━━━━━━━
  LIST ITEM:

  *Goods  | Purchase price*
  Exp: ${Bexp}
  Limit: ${Blimit}

  *Goods  | Selling price*
  Exp: ${Sexp}
  Limit: ${Slimit}
  ━━━━━━━━━━━━━━━━━
  Thank you Dont forget to shop again✨
  `.trim()
  try {
    if (/shop|toko/i.test(command)) {
      const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)): !args[2] || args.length < 4 ? 1: Math.min(1, count)
      switch (jualbeli) {
        case 'buy':
          switch (_type) {
          case 'exp':
            if (db.data.users[m.sender].coin >= Bexp * count) {
              db.data.users[m.sender].coin -= Bexp * count
              db.data.users[m.sender].exp += count * 1
              conn.reply(m.chat, `Successfully bought ${count} Exp with price ${Bexp * count} coin`, m)
            } else conn.reply(m.chat, `Your coins are not enough to buy ${count} Exp with the price ${Bexp * count} coin`,)
            break
          case 'limit':
            if (db.data.users[m.sender].coin >= Blimit * count) {
              db.data.users[m.sender].coin -= Blimit * count
              db.data.users[m.sender].limit += count * 1
              conn.reply(m.chat, `Successfully purchase of $ {
                count
              } Limit with price ${Blimit * count} coin`, m)
            } else conn.reply(m.chat, `Your coins are not enough to buy ${count} Limit with price ${Blimit * count} coin`, m)
            break
          default:
            return conn.reply(m.chat, str, m)
          }
          break
        case 'sell':
          switch (_type) {
          case 'exp':
            if (db.data.users[m.sender].exp >= count * 1) {
              db.data.users[m.sender].exp += Sexp * count
              db.data.users[m.sender].exp -= count * 1
              conn.reply(m.chat, `Successfully selling ${count} Exp with price ${Sexp * count} coin`.trim(), m)
            } else conn.reply(m.chat, `Your Exp is not enough`.trim(), m)
            break
          case 'limit':
            if (db.data.users[m.sender].limit >= count * 1) {
              db.data.users[m.sender].limit += Slimit * count
              db.data.users[m.sender].limit -= count * 1
              conn.reply(m.chat, `Successfully sell ${count} Limit with price ${Slimit * count} coin`.trim(), m)
            } else conn.reply(m.chat, `Your limit is not enough`.trim(), m)
            break
          default:
            return conn.reply(m.chat, str, m)
          }
          break
        default:
          return conn.reply(m.chat, str, m)
        }
      } else if (/beli|buy/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)): !args[1] || args.length < 3 ? 1: Math.min(1, count)
        switch (type) {
        case 'exp':
          if (db.data.users[m.sender].coin >= Bexp * count) {
            db.data.users[m.sender].coin -= Bexp * count
            db.data.users[m.sender].exp += count * 1
            conn.reply(m.chat, `Successfully bought ${count} Exp with price ${Bexp * count} coin`, m)
          } else conn.reply(m.chat, `Your coins are not enough to buy ${count} Exp with the price ${Bexp * count} coin`, m)
          break
        case 'limit':
          if (db.data.users[m.sender].coin >= Blimit * count) {
            db.data.users[m.sender].coin -= Blimit * count
            db.data.users[m.sender].limit += count * 1
            conn.reply(m.chat, `Successfully purchase of ${count} Limit with price ${Blimit * count} coin`, m)
          } else conn.reply(m.chat, `Your coins are not enough to buy ${count} Limit with price ${Blimit * count} coin`, m)
          break
        default:
          return conn.reply(m.chat, str, m)
        }
      } else if (/sell|jual|/i.test(command)) {
        const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)): !args[1] || args.length < 3 ? 1: Math.min(1, count)
        switch (type) {
        case 'exp':
          if (db.data.users[m.sender].exp >= count * 1) {
            db.data.users[m.sender].coin += Sexp * count
            db.data.users[m.sender].exp -= count * 1
            conn.reply(m.chat, `Successfully selling ${count} Exp with price ${Sexp * count} coin`.trim(), m)
          } else conn.reply(m.chat, `Your Exp is not enough`.trim(), m)
          break
        case 'limit':
          if (db.data.users[m.sender].limit >= count * 1) {
            db.data.users[m.sender].coin += Slimit * count
            db.data.users[m.sender].limit -= count * 1
            conn.reply(m.chat, `Successfully sell ${count} Limit with price ${Slimit * count} coin`.trim(), m)
          } else conn.reply(m.chat, `Your limit is not enough`.trim(), m)
          break
        default:
          return conn.reply(m.chat, str, m)
        }
      }
    } catch (e) {
      conn.reply(m.chat, str, m)
      console.log(e)
    }
  }
  handler.help = ['shop <args>']
  handler.tags = ['hari']
  handler.command = /^(shop|toko|beli|buy|jual|sell)$/i

  export default handler