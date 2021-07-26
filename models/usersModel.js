const mongoose = require('mongoose')
const userSchema = require('./../schemas/userSchema')


const Users = mongoose.model('Users', userSchema)

module.exports = Users