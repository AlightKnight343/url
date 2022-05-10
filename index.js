const dotenv = require("dotenv")

dotenv.config()
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const shortUrl = require('./schemas/shortUrl')

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

//MongoDB Setup
const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri,{
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser: true,
})

//customRedirects
const customLinks = require("./routes/redirects")
app.use("/", customLinks)

//home route
app.get('/', async (req, res)=>{
    res.render('index')
})

//post

app.post('/smol', async (req,res)=>{
    await shortUrl.findOne({smol: req.body.backlink}, (err, data)=>{
        if(err) return;
        if(data){
            res.send("Already Used<br> <a href='/'>Home</a>")
        }else{
            shortUrl.create({big: req.body.bigUrl, smol: req.body.backlink})
            res.redirect('/') 
        }   
    })
})

//finalshorturls
app.get('/:shortUrl', async(req,res)=>{
    const smolUrl = await shortUrl.findOne({smol:req.params.shortUrl})
    if(smolUrl === null){
        res.send("URL not found")
    }else{
        res.redirect(smolUrl.big)
    }
})



//listening
const PORT = 3000 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`App Listening on ${PORT}`);
})