const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");
const {isLoggedIn,isReviewAuthor} =require("../middleware.js");
const  reviewController=require("../controllers/reviews.js")



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

// Post Review
router.post("/", validateReview, isLoggedIn,wrapAsync(reviewController.PostReview));

// Delete Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroy));

module.exports = router;
