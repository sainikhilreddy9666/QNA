const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));



// connecting to mongodb server
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://abonageri:DifepXZ4D8FM0Sge@cluster0.i3p1r.mongodb.net/qna?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
.then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
});


//creating schema
const answersSchema = ({
    username:String,
    usercountry:String,
    answer1:String,
    answer2:String,
    answer3:String,
    answer4:String, 
    answer5:String
});

const Answers = mongoose.model("Answers",answersSchema);

//get method
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

//post method
app.post("/",function(req, res) {
    let newAnswers = new Answers({
        username:req.body.username,
        usercountry:req.body.country,
        answer1:req.body.answer1,
        answer2:req.body.answer2,
        answer3:req.body.answer3,
        answer4:req.body.answer4,
        answer5:req.body.answer5
    });
    newAnswers.save();
    res.redirect("/");
    console.log(req.body.username);
    console.log(req.body.country);
    console.log(req.body.answer1);
    console.log(req.body.answer2);
    console.log(req.body.answer3);
    console.log(req.body.answer4);
    console.log(req.body.answer5);
})



app.listen(3000, function() {
    console.log("server is running on 3000");
});

