const mongoose = require('mongoose')

const nftSchema = new mongoose.Schema({
    img: String,
    pdf: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    title: String,
    verified: Boolean,
    description: String,
    collect: String,
    royalty: String,
    ownerWallet: String,
    creationDate: {type: Date, default: Date.now()}
})

module.exports = nftSchema