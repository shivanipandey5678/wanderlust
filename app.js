const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/mernproject";
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError=require("./utlis/ExpressError.js");
const listing=require("./Routes/listing.js");
const listings=require("./Routes/listings.js");
const reviews=require("./Routes/reviews.js");
const session=require("express-session");
async function main(){
    await mongoose.connect(mongo_url);
};


main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname,"/public")))
app.use("/listing",listing);
app.use("/listings",listings);
app.use("/listing/:id/reviews",reviews);
app.engine('ejs',ejsMate);


const sessionOption={
    secret:"mySecretKey",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOption));

app.get("/",(req,res)=>{
    res.send("I'm the home ")
})


app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"Page Not Found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.render("error.ejs",{statusCode,message})
    
})

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

