const mongoose = require('mongoose')
const reportSchema = require('./../schemas/reportSchema')


const Reports = mongoose.model('Reports', reportSchema)

module.exports = Reports