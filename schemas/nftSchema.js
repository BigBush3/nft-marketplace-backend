const mongoose = require('mongoose')
const { any } = require('../middleware/uploadBanner')

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
    likes: {type: Number, default: 0},
    tokenId: Number,
    orderIndex: Number,
    currentBid: Number,
    startDate: String,
    endDate: String,

})

module.exports = nftSchema