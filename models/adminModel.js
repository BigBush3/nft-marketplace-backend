const mongoose = require('mongoose')
const nftSchema = require('./../schemas/nftSchema')


const Admins = mongoose.model('Admins', nftSchema)

module.exports = Admins