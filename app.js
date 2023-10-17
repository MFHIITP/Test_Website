const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

const home = fs.readFileSync("home.html");

app.set('/test_website');
app.use(express.urlencoded());

app.set('view engine', 'html');

app.get("/", (req,res)=>{
    res.status(200).sendFile(__dirname + '/home.html');
});
app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port}`);
});

// app.post('/', (req, res)=>{
//     let name = req.body.name;
//     let number = req.body.age;
//     let email = req.body.email;
//     let address = req.body.address;
    
//     let output = `The name is ${name}
//     The age is ${number}
//     The email is ${email}
//     The addrsss is ${address}`;

//     fs.writeFileSync("output.txt", output);
//     res.status(200).end(home);
// });

const server = "hossainfarshid:<password>@clusterfarshid.vcl5snh.mongodb.net/?retryWrites=true&w=majority";
const database = "Test_Database";

const mongoose = require("mongoose");
const connect = async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${server}/${database}`);
        console.log("Connection successful");
    }
    catch(err){
        console.log("Connection Unsuccessful");
    }
}
connect();

var schema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: String
});

var Collection1 = mongoose.model("Collection 1", schema);

app.post('/', (req, res)=>{
    var string = JSON.stringify(req.body);
    var data = new Collection1(JSON.parse(string));
    data.save().then(()=>{
        res.status(200).sendFile(__dirname + '/home.html');
    }).catch(()=>{
        res.send("The data has not been send");
    });
});
