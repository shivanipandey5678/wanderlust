const Review =require("../Model/reviews");
const Listing =require("../Model/listings");

module.exports.PostReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Your review has been added! Thank you for sharing your thoughts. 😊");
    res.redirect(`/listing/${req.params.id}`);
};

module.exports.destroy=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review deleted successfully! We appreciate your feedback. 👍");
    res.redirect(`/listing/${req.params.id}`);
};

