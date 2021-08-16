const mongoose = require('mongoose')
const nftSchema = require('./../schemas/adminSchema')


const Admins = mongoose.model('Admins', nftSchema)

module.exports = Admins