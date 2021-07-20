const crypto = require('crypto')

const key = crypto.randomBytes(48).toString('hex')
console.log("🔑 Key is -> ",key)