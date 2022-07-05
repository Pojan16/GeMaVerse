let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    const buttons = Object.keys(modes).map(v => [v, `${usedPrefix}${command} ${v}`])
    if (args.length < 1) return conn.sendButton(m.chat, `
  Mode: ${Object.keys(modes).join(' | ')}
  Usage examples: ${usedPrefix}math master
  `.trim(), author, null, buttons, m)
    let mode = args[0].toLowerCase()
    if (!(mode in modes)) return conn.sendButton(m.chat, `
  Mode: ${Object.keys(modes).join(' | ')}
  Usage examples: ${usedPrefix}math master
    `.trim(), author, null, buttons, m)
    let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, 'There are still unanswered questions in this chat', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        await conn.reply(m.chat, `What is the result of *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} second\nBonus Answer If Correct: ${math.bonus} coin`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.sendButton(m.chat, `Time has run out!\nThe answer is ${math.result}`, author, null, [['Again', `${usedPrefix}${command} ${math.mode}`], ...buttons], conn.math[id][0])
            delete conn.math[id]
        }, math.time)
    ]
}
handler.help = ['math [mode]']
handler.tags = ['gameov']
handler.command = /^math/i

let modes = {
    warrior: [-3, 3, -3, 3, '+-', 15000, 10],
    elite: [-10, 10, -10, 10, '*/+-', 20000, 40],
    master: [-40, 40, -20, 20, '*/+-', 40000, 150],
    gm: [-100, 100, -70, 70, '*/+-', 60000, 350],
    epic: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
    legend: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
    mythic: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
}

let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

handler.modes = modes

export default handler