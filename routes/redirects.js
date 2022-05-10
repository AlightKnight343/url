const router = require("express").Router()


router.get("/example", (req, res)=>{
    res.redirect("https://youtube.com")
})

module.exports = router;