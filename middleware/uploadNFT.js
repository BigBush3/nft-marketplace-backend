const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const mongoURI = require('../config/keys')

const storage = new GridFsStorage({
    url: mongoURI.mongoURI,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req,file) => {
        const match = ["image/png", "image/jpeg", "image/jpg","application/pdf"]

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-any-name-${file.originalname}`
            return filename
        }
        return {
            bucketName: "nft",
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    }
})

module.exports = multer({storage})