const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");

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
router.get("/",async(req,res)=>{
    const AllListings=await Listing.find({});
    console.log(AllListings)
    res.render("listings/index.ejs",{AllListings})
 });
 
 
 
 
 //craete route
 router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
         let listing=req.body.listing;
         const newListing = new Listing(listing);
         await newListing.save();
         res.redirect("/listings");
    
     
 }));
 module.exports=router;