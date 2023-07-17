const express =require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const path=require('path');
const bodyparser=require('body-parser')
const cookieParser = require('cookie-parser');


const port=3000 || process.env.port
dotenv.config()

const app=express()
//requiring user mean sign and out routes
const usersrouter = require('./routes/usersRoute');
//requiring expence rouit
const expencerouter = require('./routes/expenceRoute');
//requiring contact rouit
const contactrouter = require('./routes/contactRoute');
//leader rourt
const leaderrouter = require('./routes/leaderRoute');
//memership razor rourt
const membershiprouter = require('./routes/membershipRoute');

// export db
require("./server/database");
//export schemas
const signup=require("./models/signup");
const expence=require("./models/expence");
const contact=require("./models/contact");

//requiring auth middleware
const auth=require("./middleware/auth")



//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//midlleware or configuration
app.use(cors())
app.use(express.urlencoded({ extended:false}))
//app.use(express.json())
app.use(cookieParser())
app.use(bodyparser.json({extended:false}))

//public static style path
app.use(express.static(path.join(__dirname, 'public')));

// routs expors or set routers
app.use(usersrouter)

//rout for expence
app.use(expencerouter)

//rout for contact
app.use(contactrouter);

//rout for leaderboard
app.use(leaderrouter);

//rout for membership
app.use(membershiprouter);

app.listen(port,()=>{
    console.log("server started")
})


