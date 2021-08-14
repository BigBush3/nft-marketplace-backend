const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    email: String,
    creationDate: {type: Date, default: Date.now()}
})

module.exports = adminSchema