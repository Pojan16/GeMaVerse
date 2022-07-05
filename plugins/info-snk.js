let handler = m => m.reply(`
✘ ▬▬▬▬ ஜ۩۞۩ஜ ▬▬▬▬ ✘
    *_Term & Condition_*
✘ ▬▬▬▬ ஜ۩۞۩ஜ ▬▬▬▬ ✘
ID:
1. Jangan menanyakan hal yang aneh / mustahil kepada bot ini seperti menanyakan nama dan berkenalan, karena ini adalah nomor bot.

2. BOT tidak akan menjawab jika bot offline / tidak terdaftar di command, terkadang, bot mengalami bug ketika diaktifkan, mengirim pesan asal²an, spam, dll

3. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.

4. Dilarang keras melakukan SPAM ke bot, menelpon bot, dan mengirim pesan ke owner bot di luar jam kerja. Jika teridentifikasi melakukan hal yang tadi disebutkan, akan mendapat BLOCK DAN BANNED PERMANEN.

5. Selalu ingat bahwa bot ini dalam proses pengembangan jadi diharapkan anda dapat memakluminya jika bot terdapat banyak kekurangan.

6. Dan selalu ingat juga yang menggunakan bot ini bukan hanya anda/grup anda jadi saya memohon agar bersabar jika terjadinya delay. Serta gunakan fitur yang tersedia dengan seperlunya.

7. Apapun yang anda perintah pada bot ini baik ketika menggunakan ataupun sesudahnya, OWNER TIDAK BERTANGGUNG JAWAB!

EN:
1. Don't ask this bot strange/impossible things like asking the name and getting acquainted, because this is the number of the bot.

2. BOT will not answer if the bot is offline / not registered in the command, sometimes, bots experience bugs when activated, send random messages, spam, etc.

3. If you find a bug/error, please immediately report it to the owner of the bot.

4. It is strictly forbidden to SPAM to bots, call bots, and send messages to bot owners outside of working hours. If you are identified as doing the things mentioned above, you will get a PERMANENT BLOCK AND BANNED.

5. Always remember that this bot is in development process so hopefully you can understand if the bot has many flaws.

6. And always remember that it's not just you/your group that uses this bot, so I beg you to be patient if there is a delay. And use the available features as necessary.

7. Whatever you order on this bot either while using it or after, the OWNER IS NOT RESPONSIBLE!

Thank you!✨
`.trim())
handler.help = ['tnc']
handler.tags = ['info']
handler.command = /^(tnc|snk)$/i
handler.fail = null
handler.exp = 0

export default handler