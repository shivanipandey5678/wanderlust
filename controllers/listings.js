const Listing =require("../Model/listings");

module.exports.index=async(req, res) => {
    const AllListings = await Listing.find({});
    res.render("listings/index.ejs", { AllListings });
};

module.exports.createListing=async (req, res) => {
    if(!req.body.listing){
        req.flash("error", "No data found.");
        return res.redirect("/listings");
    }
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success", "Your listing has been successfully created! 🚀 Check it out below.");
    return res.redirect("/listings");
};

module.exports.NavigateToCreatePage=async (req, res) => {
    res.render("listings/create.ejs");
}

module.exports.ShowSingleList=async (req, res) => {
    let { id } = req.params;
    let info_of_list = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!info_of_list) {
        req.flash("error", "The requested listing does not exist.");
        return res.redirect("/listings");
    }
    // console.log(info_of_list)
    res.render("listings/show.ejs", { info_of_list });
};

module.exports.DestroySingleList=async (req, res) => {
    let { id } = req.params;
    let searchList = await Listing.findByIdAndDelete(id);
    if (!searchList) {
        req.flash("error", "Unable to delete. The listing was not found.");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing deleted successfully! Hope to see a new one soon. 😊");
    return res.redirect("/listings");
};

module.exports.NavigateToEditPage=async (req, res) => {
    let { id } = req.params;
    let searchList = await Listing.findById(id);
    if (!searchList) {
        req.flash("error", "The listing you are trying to edit does not exist.");
        return res.redirect("/listings");
    }
    // console.log(searchList);
    res.render("listings/editpage.ejs", { searchList });
};

module.exports.UpdateList=async (req, res) => {
    let { id } = req.params;
    let updatedList = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (!updatedList) {
        req.flash("error", "Unable to update. The listing was not found.");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing updated successfully! 🎉 Check out the new details.");
    return res.redirect(`/listing/${id}`);
};