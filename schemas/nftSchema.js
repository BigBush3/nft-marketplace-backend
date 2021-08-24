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
    creationDate: {type: Date, default: Date.now()},
    location: {type: String, default: "marketplace"},
    type: String,
    price: String,
    views: {type: Number, default: 0},
    favoriteMe: {type: Boolean, default: false},
    likes: {type: Number, default: 0},
    tokenId: Number,

})

module.exports = nftSchema