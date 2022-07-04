import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['62882009737569'],
  ['6283122808260'],
  ['6285850270930'],
  ['994400964426'],
  ['6285856430321', 'Ozan', true]
]// Put your number here
global.mods = [''] // Want some help?
global.prems = [''] // Premium user has unlimited limit
global.APIs = {
  // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  xteam: 'https://api.xteam.xyz',
  lolhuman: 'https://api.lolhuman.xyz',
  njan: 'https://zynfx.herokuapp.com',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  neoxr: 'https://api.neoxr.eu.org',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com'
}
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': '66815f45b520083e',
  'https://api.lolhuman.xyz': '43e52b5419bd6b1f84e6df4c',
  'https://zynfx.herokuapp.com': 'Rivalgans',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'Adibiklaik',
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}
// Sticker WM

global.packname = '+62 831-2280-8260'
global.author = 'GeMa-Bot'

/*const spack = readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = 'Undefined'
  var sticker_author = 'GeMa-Bot'
} else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}

const file_exif = "lib/exif.json"
watchFile(file_exif, () => {
  unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

global.packname = sticker_name
global.author = sticker_author
*/
global.multiplier = 50 // The higher, The harder levelup

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
