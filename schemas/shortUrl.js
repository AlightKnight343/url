const mongoose = require("mongoose")


const reqString = {
    type: String,
    required:true
}


const  shortUrlSchema = new mongoose.Schema({
    big:reqString,
    smol:reqString,
    date:{
        type:String,
        default:Date.Now
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)