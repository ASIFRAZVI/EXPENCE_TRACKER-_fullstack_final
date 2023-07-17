
const contact=require('../models/contact')


//signup rout controller fn
const contactController=async (req,res)=> {
    try{
      const contactSchema= new contact({
        email:req.body.email,
        phnumber:req.body.phnumber,
        problemdescription:req.body.problemdescription,
      })
    
     const registered = await contactSchema.save()
      res.redirect("contact")
    }catch(error){
      res.render('error')
    }
  };

module.exports=contactController;
