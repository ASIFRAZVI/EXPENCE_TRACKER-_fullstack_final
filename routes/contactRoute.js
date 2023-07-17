const express= require('express')

//router object
const router=express.Router();

const contactController=require("../controllers/contactController")
const auth=require("../middleware/auth")


router.get('/contact',auth,(req,res)=>{
    res.render("contact")
  })
router.post('/contact', contactController)

module.exports=router;