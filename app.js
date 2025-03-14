const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongo_url = "mongodb://127.0.0.1:27017/WANDERLUST";

async function main(){
    await mongoose.connect(mongo_url);
};


main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})


app.get("/health-check",(req,res)=>{
    res.send("everything is great")
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

