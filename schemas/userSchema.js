const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    public_key_wallet: String,
    creationDate: {type: Date, default: Date.now()}
})

module.exports = userSchema