const upload = require('../middleware/upload')
const uploadNFT = require('../middleware/uploadNFT')
const express = require('express')
const router = express.Router()

router.post("/upload", upload.single("file"), (req, res) => {
    if (req.file === undefined) return res.send("you must select a file")
    const imgUrl = `https://desolate-inlet-76011.herokuapp.com/file/${req.file.filename}`
    return res.send(imgUrl)
})


module.exports = router