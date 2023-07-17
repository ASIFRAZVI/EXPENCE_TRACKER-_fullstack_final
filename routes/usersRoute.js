const express= require('express')

//router object
const router=express.Router()

//signup requiring controller
const {loginController, signupController, forgotController, resetpassController}=require("../controllers/usersController")



//requiring auth middleware
const auth=require("../middleware/auth")

//login part rout
router.post('/login', loginController)

//registration part
router.post('/signup', signupController)

//forgot pass rout
router.post('/forgotpass',forgotController)

router.post('/resetpass', resetpassController)


//extra routers
router.get('/signup', (req, res)=>{
    res.render("signup")
  })
  
  router.get('/login', (req, res)=>{
    res.render("login")
  })
  
  router.get('/', (req, res)=>{
      res.render("frontpage")
  })
  
  router.get('/homepage',auth,(req,res)=>{
      res.render("homepage")
    })
    //rout or orgot paasss
    router.get('/forgotpass',(req,res)=>{
      res.render("forgotpass")
    })

    //rout for reset pass after email werification
    router.get('/resetpass', (req, res)=>{
      res.render("resetpass")
    })

    router.get('/about',auth,(req,res)=>{
      res.render("about")
    })

    router.get('/contact',auth,(req,res)=>{
      res.render("contact")
    })
//logout funtion
    router.get('/logout',auth ,async(req,res)=>{
      try{
      //remove from db one user token or single out
      //req.user.tokens=req.user.tokens.filter((currenttoken)=>{
          // return currenttoken.token !== req.token;
      //})
    
      //logout from all devices
      req.user.tokens=[];

      //clear cookies
        res.clearCookie("jwt")
        await req.user.save();
        res.render("login")
      }catch{
        res.send("your not a logged-in")
      }
    })
    
    router.get('/error',(req,res)=>{
      res.render("error")
    })

module.exports=router;