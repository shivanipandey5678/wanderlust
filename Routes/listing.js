const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message.join(","));
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// Navigate to create page route
router.get("/new", async (req, res) => {
    res.render("listings/create.ejs");
});

// Show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let info_of_list = await Listing.findById(id).populate("reviews");
    if (!info_of_list) {
        req.flash("error", "The requested listing does not exist.");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { info_of_list });
}));

// Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let searchList = await Listing.findByIdAndDelete(id);
    if (!searchList) {
        req.flash("error", "Unable to delete. The listing was not found.");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully! Hope to see a new one soon. 😊");
    res.redirect("/listings");
}));

// Navigate to edit page route
router.get("/:id/editpage", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let searchList = await Listing.findById(id);
    if (!searchList) {
        req.flash("error", "The listing you are trying to edit does not exist.");
        return res.redirect("/listings");
    }
    console.log(searchList);
    res.render("listings/editpage.ejs", { searchList });
}));

// Update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let updatedList = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (!updatedList) {
        req.flash("error", "Unable to update. The listing was not found.");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing updated successfully! 🎉 Check out the new details.");
    res.redirect(`/listing/${id}`);
}));

module.exports = router;
