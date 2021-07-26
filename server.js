const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const mongoURI = require('./config/keys')
const Users = require('./models/usersModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(helmet())


mongoose.connect(mongoURI.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB', err.message))



app.get('/', (req, res) => {
    res.send('Hello world!')
})


const port = process.env.PORT || "8000"
app.listen(port, () => console.log(`Listening on port ${port}...`))