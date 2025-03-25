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
const flash=require("connect-flash");
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

app.use(flash());
app.engine('ejs',ejsMate);


const sessionOption={
    secret:"mySecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}

app.get("/",(req,res)=>{
    res.send("I'm the home ")
})
app.use(session(sessionOption));
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    next()
})

app.use("/listing",listing);
app.use("/listings",listings);
app.use("/listing/:id/reviews",reviews);

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

