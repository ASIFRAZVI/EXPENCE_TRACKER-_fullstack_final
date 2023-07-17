
const express= require('express')

//router object
const router=express.Router();

const leaderController = require('../controllers/leaderController');

const auth=require("../middleware/auth")

router.get('/prouser',auth,(req,res)=>{
    res.render('leader')
   })


router.post('/expences1', auth, leaderController.createexpence);
router.get('/expences1', auth,leaderController.getexpences);
router.delete('/expences1/:id', auth, leaderController.deleteexpence);
router.get('/expences1/leaderboard', auth, leaderController.getexpencesandleaderboard);

router.get('/expences1/download', auth, leaderController.downloadexpences);

module.exports=router;