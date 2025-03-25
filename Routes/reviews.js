const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");

const validateReview=((req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message.join(","));
        throw new ExpressError(400,errMsg);
    }
    else{
       next()
    }
})


//review
 //Post Review
 router.post("/",validateReview,wrapAsync(async(req,res)=>{
     let listing =await Listing.findById(req.params.id);
     let newReview=new Review(req.body.review);
     listing.reviews.push(newReview);
 
     await newReview.save();
     await listing.save();
     req.flash("success","New Review created!");
     // console.log("New Review Saved");
     // res.send("New Review Saved")
     res.redirect(`/listing/${req.params.id}`)
 }));


 
 //review 
 //Delete Review
 router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted!");
    res.redirect(`/listing/${req.params.id}`)
}))

module.exports=router;