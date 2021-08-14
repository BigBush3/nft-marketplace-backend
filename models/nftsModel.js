const mongoose = require('mongoose')
const nftSchema = require('./../schemas/nftSchema')


const Tokens = mongoose.model('Tokens', nftSchema)

module.exports = Tokens