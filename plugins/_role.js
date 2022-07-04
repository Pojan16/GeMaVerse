import db from '../lib/database.js'

export function before(m) {
  let user = db.data.users[m.sender]
        let role = (user.level <= 10) ? 'Newbie'
          : ((user.level >= 10) && (user.level <= 50)) ? 'Warrior'
          : ((user.level >= 50) && (user.level <= 100)) ? 'Elite'
          : ((user.level >= 100) && (user.level <= 500)) ? 'Master'
          : ((user.level >= 500) && (user.level <= 1000)) ? 'Reasonable'
          : ((user.level >= 1000) && (user.level <= 5000)) ? 'Epic'
          : ((user.level >= 5000) && (user.level <= 10000)) ? 'Legend'
          : ((user.level >= 10000) && (user.level <= 50000)) ? 'Mythic'
          : 'Beyond the limit'
  user.role = role
  return true
}
export const disabled = true