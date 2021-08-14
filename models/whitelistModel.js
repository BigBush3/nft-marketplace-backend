const mongoose = require('mongoose')
const userSchema = require('./../schemas/whitelistSchema')


const Whitelist = mongoose.model('Whitelist', userSchema)

module.exports = Whitelist