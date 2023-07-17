const mongoose=require("mongoose");

//contact schema
const contactSchema=new mongoose.Schema({  
    email:{
        type:String,
        required:true,
    },
    phnumber:{
        type:Number,
        required:true,
    },
    problemdescription:{
        type:String,
        required:true,
    }

})


//creating collection
const contact= new mongoose.model("contact", contactSchema);

module.exports=contact;
