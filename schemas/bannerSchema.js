const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    text: String,
    imgUrl: String,
    url: String,
    creationDate: {type: Date, default: Date.now()}
})

module.exports = bannerSchema