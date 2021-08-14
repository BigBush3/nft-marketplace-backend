const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    wallet: String,
})

module.exports = userSchema