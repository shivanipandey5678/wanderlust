const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./Model/listings.js")
const mongo_url = "mongodb://127.0.0.1:27017/mernproject";
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync=require("./utlis/wrapAsync.js");
const ExpressError=require("./utlis/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./Model/reviews.js");
const listing=require("./Routes/listing.js");
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
app.engine('ejs',ejsMate);

app.get("/",(req,res)=>{
    res.send("I'm the home ")
})

const validateListing=((req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message.join(","));
        throw new ExpressError(400,errMsg);
    }
    else{
       next()
    }
})

//index route
app.get("/listings",async(req,res)=>{
   const AllListings=await Listing.find({});
   console.log(AllListings)
   res.render("listings/index.ejs",{AllListings})
})




//craete route
app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
        let listing=req.body.listing;
        const newListing = new Listing(listing);
        await newListing.save();
        res.redirect("/listings");
   
    
}));













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

