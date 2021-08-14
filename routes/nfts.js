const uploadNFT = require('../middleware/uploadNFT')
const uploadBanner = require('../middleware/uploadBanner')
const express = require('express')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const pinataSDK = require('@pinata/sdk')
const Tokens = require('./../models/nftsModel')
const Users = require('./../models/usersModel')
const { query } = require('../schemas/nftSchema')
var fs = require('fs')
const router = express.Router()


let nfts

const conn = mongoose.connection
conn.once("open", function(){
    nfts = Grid(conn.db, mongoose.mongo)
    nfts.collection("nft")
})

const pinata = pinataSDK('7a0e01d7b7ea27cdd9f9', 'd02fc23c05b60f766cb3b884149c2274e1c41c4837c1592ba9f26b8a2ce4e8b3');


router.post('/create', async (req, res) => {
    const result = await Tokens.create({
        title: req.body.title,
        collect: req.body.collect,
        description: req.body.description,
        royalty: req.body.royalty,
        owner: req.body.userId,
        img: req.body.img,
        pdf: req.body.pdf,
        verified: true
    })
    console.log(result)
    if (result) {
        const query = await Users.findOneAndUpdate({_id: req.body.userId}, {$push: {nfts: result._id}})
        return res.status(200).send({result, query})
    }
    return res.send(result)
    
})

router.get('/', async(req, res) => {
    const result = await Tokens.find().populate('owner')
    res.send(result)
})

router.get('/:tokenId', async(req, res) => {
    const result = await Tokens.findOne({"_id": req.params.tokenId}).populate('owner')
    if (result){
        console.log(result)
        return res.send(result)
    }
})

router.post("/upload", uploadNFT.single("file"), async (req, res) => {
    console.log(req)
    if (req.file === undefined) return res.send('you must select a file')
    const imgUrl = `http://localhost:8000/nft/ipfs/${req.file.filename}`
    try{
        const file = await nfts.files.findOne({filename: req.file.filename})
        const readStream = nfts.createReadStream(file.filename)
        pinata.pinFileToIPFS(readStream).then((result) => {
            return res.send({url: imgUrl, result})
        }).catch((err) => {
            //handle error here
            console.log(err);
        })
    } catch(err){
        res.send(err.message)
    }
})

router.post('/uploadPdf', uploadNFT.single("file"), async(req,res) => {
    if (req.file === undefined) return res.send('you must select a file')
    const pdfUrl = `http://localhost:8000/nft/ipfs/${req.file.filename}`
    try{
        const file = await nfts.files.findOne({filename: req.file.filename})
        const readStream = nfts.createReadStream(file.filename)
        pinata.pinFileToIPFS(readStream).then((result) => {
            return res.send({url: pdfUrl, result})
        }).catch((err) => {
            //handle error here
            console.log(err);
        })
    } catch(err){
        res.send(err.message)
    }
})

router.get("/ipfs/:filename", async (req, res) => {
    try{
        const file = await nfts.files.findOne({filename: req.params.filename})
        const readStream = nfts.createReadStream(file.filename)
        readStream.pipe(res)
    } catch(err){

        res.send(err.message)
    }
})


module.exports = router