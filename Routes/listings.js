const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");
const {isLoggedIn} =require("../middleware.js")

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
// Index Route - Display All Listings
router.get("/", async (req, res) => {
    const AllListings = await Listing.find({});
    res.render("listings/index.ejs", { AllListings });
});

// Create Route - Add a New Listing
router.post("/", validateListing,isLoggedIn, wrapAsync(async (req, res, next) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner=req.user._id;
    await newListing.save();
    
    req.flash("success", "Your listing has been successfully created! 🚀 Check it out below.");
    res.redirect("/listings");
}));

module.exports = router;
