const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");
const {isLoggedIn} =require("../middleware.js")

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
router.post("/", validateReview, isLoggedIn,wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Your review has been added! Thank you for sharing your thoughts. 😊");
    res.redirect(`/listing/${req.params.id}`);
}));

// Delete Review
router.delete("/:reviewId",isLoggedIn, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review deleted successfully! We appreciate your feedback. 👍");
    res.redirect(`/listing/${req.params.id}`);
}));

module.exports = router;
