const express = require('express');
const auth=require("../middleware/auth")
const router = express.Router();

const membershipController = require('../controllers/membershipController');
// Route to create a new order
router.post('/createorder',auth,membershipController.createOrder);
// update signup schema field with ispro to true

// Define the route to handle saving membership and updating isPro field
router.post('/save-membership',auth, membershipController.saveMembership);

module.exports = router;
