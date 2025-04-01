const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");
const {isLoggedIn,isOwner} =require("../middleware.js");
const listingController=require("../controllers/listings.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message.join(","));
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

router.route("/:id")
.get( wrapAsync(listingController.ShowSingleList))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.DestroySingleList))
.put(isLoggedIn,isOwner, wrapAsync(listingController.UpdateList));


// Navigate to create page route
router.get("/new",isLoggedIn,wrapAsync(listingController.NavigateToCreatePage) );


// Navigate to edit page route
router.get("/:id/editpage",isLoggedIn,isOwner, wrapAsync(listingController.NavigateToEditPage));


module.exports = router;
