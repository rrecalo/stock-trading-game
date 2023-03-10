//dependency//const declaration
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose')
const StockModel = require('./models/Stock')
const UserModel = require('./models/User');


//connect Express' backend to React's frontend
const cors = require('cors');
const { ObjectId } = require("mongodb");
var mongodb = require('mongodb');
const { equal } = require('assert');

//express can auto parse JSON body
app.use(express.json());
//use cors for connecting front and back end
app.use(cors());

let api_token = process.env.API_TOKEN;
let token = process.env.MONGODB_TOKEN;

mongoose.connect("mongodb+srv://robertrecalo:"+token+"@freecluster.ywz3xk7.mongodb.net/StockTradingGame?retryWrites=true&w=majority", {minPoolSize: 1 }).
catch(error => handleError(error));
//mongodb+srv://robertrecalo:<password>@freecluster.ywz3xk7.mongodb.net/?retryWrites=true&w=majority

mongoose.connection.on('error', err => {
  logError(err);
});

//req = request
//res = response
// "/getUsers" == request name
app.get("/getStocks", (req, res)=>{
  StockModel.find({}, (err, result)=>{
    if(err){
      res.json(err);
      console.log("Error making /getStocks request!!!");
    }
    else{
      console.log("/getStocks request received, result was returned!");
      res.json(result);
    }
  });
});

app.get("/getStock", (req, res)=>{
    
    StockModel.findOne({ticker : req.query.ticker}, (err, result)=>{
        if(err){
            res.json(err);
            console.log("Error finding Stock!");
        }
        else res.json(result);
    })
});

app.get("/getUserAuthToken", (req, res)=>{
    UserModel.findOne({userName : req.query.userName}, (err, result)=>{
        if(err){
            res.json(err);
            console.log("Error finding User!");
        }
        else res.json(result);
    })
});

app.get("/login", (req, res)=>{
    UserModel.findOne({userName : req.query.userName, password : req.query.password}, (err, result)=>{
        if(err){
            res.json(err);
            console.log("Error logging in!");
        }
        else res.json(result);
})});

app.post("/createUser", (req, res)=>{
    
    const user = req.body;

    const newUser = new UserModel(user);

    newUser.save();
    res.json(user);

});



app.post("/updateStock", (req, res)=>{
    if(req.header("token") !== api_token){
        res.json("Unauthenticated Request! Error 401");
        return;
    }
    StockModel.findOneAndUpdate({ticker : req.query.ticker}, {price : req.query.price}, (err, result)=>{
        if(err){
            res.json(err);
            console.log("Error updating stock price for : " + req.query.price);
        }
        else res.json(result);

    })});




//setInterval(updateSPY(), 3000);

/**
app.get("/", (req, res)=>{
    if(err){
        res.json(err);
        console.log("Error talking to server!");
    }
    else{
        res.json(res);
    }
})

/**
app.post("/createUser", async (req, res) =>{
  const user = req.body;
  //make new user using the UserModel schema, passing the data given in the 'req' parameter
  const newUser = new UserModel(user);

  //insert the newUser document to the DB
  await newUser.save();

  //return back the new user's data
  res.json(user);

});

app.get("/getAllInquiries", (req, res)=>{
  InquiryModel.find({}, (err, result)=>{
    if(err){
      res.json(err);
      console.log("Error making /getAllInquiries request!!!");
    }
    else{
      res.json(result);
    }
  });
});

app.post("/createInquiry", async(req, res)=>{
  const inquiry = req.body;
  
  const newInquiry = new InquiryModel(inquiry);

  await newInquiry.save();
  
  res.json(inquiry);

});

app.delete("/deleteInquiry", async (req, res)=>{

      //console.log(req.body);
      //var a = req.data
      InquiryModel.findOneAndDelete({UTCTime : req.body.UTCTime}, (err, result) =>{
        if(err){
          res.json(err);
        }
        else{
          res.json(result);
        }
      });
});
*/


app.listen(3001, ()=>{
  console.log("SERVER RUNNING ON PORT 3001");
})