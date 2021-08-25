const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    nfts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tokens' }],
    email: String,
    wallet: String,
    verified: Boolean,
    imgUrl: String,
    headerUrl: String,
    creationDate: {type: Date, default: Date.now()}
})

module.exports = userSchema