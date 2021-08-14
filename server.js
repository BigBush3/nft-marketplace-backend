const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const uploadBanner = require('./middleware/uploadBanner')
const mongoURI = require('./config/keys')
const Grid = require('gridfs-stream')
const upload = require('./routes/upload')
const connection = require('./db')
const Users = require('./models/usersModel')
const Reports = require('./models/reportModel')
const Admins = require('./models/adminModel')
const Banners = require('./models/bannersModel')
const Whitelist = require('./models/whitelistModel')
const cors = require('cors')
const tokens = require('./routes/nfts')
const app = express()


let gfs
let nfts
let banners

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())
app.use('/file', upload);
app.use('/nft', tokens)


const conn = mongoose.connection
conn.once("open", function() {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection("photos")
})
conn.once('open', function(){
    banners = Grid(conn.db, mongoose.mongo)
    banners.collection("banners")
})

connection()




app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/whitelist', async (req, res) => {
    const result = await Whitelist.create({'wallet': req.body.wallet})
    res.send(result)
})

app.delete('/banner/:id', async (req, res) => {
    const result = await Banners.findOneAndDelete({"_id": req.params.id})
    res.send(result)
})

app.post('/banner/upload',uploadBanner.single("file"), async (req,res) => {
    if (req.file === undefined) return res.send('you must select a file')
    const imgUrl = `http://localhost:8000/banner/${req.file.filename}`
    return res.send({img: imgUrl})
})
app.get('/banner/:filename', async (req, res) => {
    try{
        const file = await banners.files.findOne({filename: req.params.filename})
        const readStream = banners.createReadStream(file.filename)
        readStream.pipe(res)
    } catch(err){

        res.send(err.message)
    }
})
app.post('/banner', async(req ,res) => {
    const result = await Banners.create({
        "title": req.body.title,
        "text": req.body.text,
        "imgUrl": req.body.imgUrl,
        "url": req.body.url
    })
    console.log(result)
    if (result){
        return res.send(result)
    }
    return res.send(result)
})
app.get('/banner', async(req, res) => {
    const result = await Banners.find()
    console.log(result)
    res.send(result)
})

app.get('/reports', async(req, res) => {
    const result = await Reports.find().populate('sender')
    console.log(result)
    return res.send(result)
})
app.post('/report', async(req, res) => {
    const result = await Reports.create({
        title: req.body.title,
        description: req.body.description,
        sender: req.body.sender
    })
    if (result){
        return res.send(result)
    }
    return res.send({data: 'failed'})
})

app.get('/users', async (req, res) => {
    const result = await Users.find()
    return res.send(result)
})

app.delete('/user/:id', async(req, res)=>{
    const result = await Users.findOneAndDelete({"_id": req.params.id})
    return res.send(result)
})

app.get('/user/:id', async (req, res) => {
    try{
            const result = await Users.findOne({"_id": req.params.id}).populate('nfts')
    return res.send(result)
    } catch(err){
        console.log(err.message)
    }

})

app.post('/user/login', async (req, res) => {
    var auth = await Users.findOne({"wallet": req.body.wallet}).exec()
    if (auth){
        res.send({name: auth.name, email: auth.email, id: auth._id, imgUrl: auth.imgUrl})
    } else {
        res.send({data: 'not found'})
    }

/*     const query = Users.findOne({wallet: req.body.wallet}) */
    
})

app.post('/user/register', async (req, res) => {
        let doc = await Users.findOneAndUpdate({wallet: req.body.wallet}, {
            name: req.body.name,
            email: req.body.email,
            imgUrl: req.body.imgUrl, 
        }, {
            useFindAndModify: true
        })
        if (doc){
          res.send(doc) 
        } else {
            const newUser = await Users.create({
                name: req.body.name,
                email: req.body.email,
                imgUrl: req.body.imgUrl,
                wallet: req.body.wallet 
            })
            res.send(newUser)
        }
        
})

app.get('/file/:filename', async(req,res)=>{
    try{
        const file = await gfs.files.findOne({filename: req.params.filename})
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } catch(err){

        res.send(err.message)
    }
})

app.delete('/file/:filename', async(req,res)=>{
    try {
        await gfs.files.deleteOne({filename: req.params.filename})
        res.send('successfull')
    } catch (err) {
        console.log(err)
        res.send('An error occured')
    }
})


const port = process.env.PORT || "8000"
app.listen(port, () => console.log(`Listening on port ${port}...`))