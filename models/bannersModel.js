const mongoose = require('mongoose')
const bannerSchema = require('./../schemas/bannerSchema')


const Banners = mongoose.model('Banners', bannerSchema)

module.exports = Banners