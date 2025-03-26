const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");

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
    console.log(AllListings);
    res.render("listings/index.ejs", { AllListings });
});

// Create Route - Add a New Listing
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    
    req.flash("success", "Your listing has been successfully created! 🚀 Check it out below.");
    res.redirect("/listings");
}));

module.exports = router;
