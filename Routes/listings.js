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
const listingController=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage})
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
// Create Route - Add a New Listing

router.route("/")
   .get( wrapAsync(listingController.index))
//    .post( validateListing,isLoggedIn, wrapAsync(listingController.createListing));
   .post(upload.single('listing[image][url]'),(req,res)=>{
      res.send(req.file);
   });



module.exports = router;
