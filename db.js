const mongoose = require('mongoose')
const mongoURI = require('./config/keys')

module.exports = async function connection(){
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(mongoURI.mongoURI, connectionParams)
        console.log('Connected to database')
    } catch(err){
        console.log(err.message)
        console.log('Could not connect to database')
    }

}