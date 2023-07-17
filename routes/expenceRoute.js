const express= require('express')

//router object
const router=express.Router()
const auth=require("../middleware/auth")

const expenceController = require('../controllers/expenceController');

router.post('/expences', auth, expenceController.createexpence);
router.get('/expences', auth,expenceController.getexpences);
router.delete('/expences/:id', auth, expenceController.deleteexpence);


module.exports=router;