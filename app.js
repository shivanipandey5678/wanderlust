if(process.env.NODE_ENV!="production"){
    require("dotenv").config()
}




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
const userRouter=require("./Routes/user.js")
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./Model/users.js");


const dbUrl=process.env.ATLASDB_URL;
async function main(){
    await mongoose.connect(dbUrl);
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
app.use(express.json());  // Ensure JSON requests are parsed correctly
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



app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user; 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next()
})



app.use("/listing",listing);
app.use("/listings",listings);
app.use("/listing/:id/reviews",reviews);
app.use("/",userRouter);

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

