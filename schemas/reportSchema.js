const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: String,
    description: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    creationDate: {type: Date, default: Date.now()}
})

module.exports = reportSchema