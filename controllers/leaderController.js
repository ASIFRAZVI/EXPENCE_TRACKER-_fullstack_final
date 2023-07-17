const dotenv=require('dotenv')
const expence=require('../models/expence')
const signup=require('../models/signup')
const AWS = require('aws-sdk');
//to load.env files
dotenv.config()
// expenseController.js

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRATE,
  region: process.env.AWS_REAGION,
});
const BUCKET_NAME = 'userexpence';
// Create a new expense
exports.createexpence = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, description } = req.body;
    const expence1= new expence({ amount, description ,userId});
    await expence1.save();
 
    res.redirect("prouser")
  }catch (error) {
    res.render('error')
  }
};

// Get all expenses
exports.getexpences = async (req, res) => {
  try {
    const userId = req.user.id;
    //const expences = await expence.find();
    const expences = await expence.find({ userId });
    res.json(expences);
  } catch (error) {
    res.render('error')
  }
};

// Delete an expense
exports.deleteexpence = async (req, res) => {
    try {
      const expenceId = req.params.id;
      const deletedexpence = await expence.findByIdAndDelete(expenceId);
      if (!deletedexpence) {
        return res.status(404).json({ error: 'Expense not found.' });
      }
      //res.render('homepage')
    } catch (error) {
      console.log(error);
  
    }
  };

 // controller.js

 exports.getexpencesandleaderboard = async (req, res) => {
  try {
    const expences = await expence.find();

    const leaderboardData = {};
    expences.forEach(expence => {
      const user = expence.userId;
      if (leaderboardData[user]) {
        leaderboardData[user] += expence.amount;
      } else {
        leaderboardData[user] = expence.amount;
      }
    });

    const users = await signup.find();

    const leaderboard = [];
    users.forEach(user => {
      const totalamount = leaderboardData[user._id.toString()] || 0;
      leaderboard.push({ user: user.name, totalamount: totalamount });
    });

    leaderboard.sort((a, b) => b.totalamount - a.totalamount);

    res.json({expences,leaderboard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};




// Download expenses as a text file and uplad from db
exports.downloadexpences = async (req, res) => {
  try {
    const userId = req.user.id;
    const expences = await expence.find({ userId });

    let text = '';
    expences.forEach(expence => {
      text += `Amount: ${expence.amount}, Description: ${expence.description}\n`;
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${userId}/expences.txt`,
      Body: text,
      ContentType: 'text/plain',
      ACL: 'public-read' // Set ACL to make the object public
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while uploading the expenses.' });
      }
      const downloadUrl = data.Location;
      res.redirect(downloadUrl);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
};




