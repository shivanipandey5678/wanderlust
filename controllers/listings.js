const Listing =require("../Model/listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
const flash=require("connect-flash");


module.exports.index = async (req, res) => {
    let AllListings;

    if (req.query.category) {
        let category = req.query.category;
        AllListings = await Listing.find({ category: category });

        // If no listings found for the given category
        if (AllListings.length === 0) {
            req.flash("error", `No listings available for the category: ${category}`);
            return res.redirect("/listings");
        }

        // Render with the filtered listings
        return res.render("listings/index.ejs", { AllListings, messages: req.flash() });
    } else {
        // No filter applied, show all listings
        AllListings = await Listing.find({});
        return res.render("listings/index.ejs", { AllListings, messages: req.flash() });
    }
};


module.exports.createListing = async (req, res) => {
    let response=await geocodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
      })
        .send();
  
        
    if (!req.body.listing) {
        req.flash("error", "No data found.");
        return res.redirect("/listings");
    }
    let listing = req.body.listing;
    // Check if an image was uploaded
    if (req.file) {
        listing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    } else {
        listing.image = { filename: "", url: "" }; // Default empty object
    }
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.geometry=response.body.features[0].geometry;
    console.log("NEW LISTING:", newListing);

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
    let origionalList=searchList.image.url;
    origionalList.replace('/upload', '/upload/e_blur:100');
    if (!searchList) {
        req.flash("error", "The listing you are trying to edit does not exist.");
        return res.redirect("/listings");
    }
    console.log(searchList);
    res.render("listings/editpage.ejs", { searchList,origionalList });
};

module.exports.UpdateList=async (req, res) => {
    let { id } = req.params;
    let updatedList = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (!updatedList) {
        req.flash("error", "Unable to update. The listing was not found.");
        return res.redirect("/listings");
    }
    // Check if an image was uploaded
    if (req.file) {
        updatedList.image = {
            filename: req.file.filename,
            url: req.file.path
        };
        console.log("updated list")
        await updatedList.save();
    }
   
    req.flash("success", "Listing updated successfully! 🎉 Check out the new details.");
    return res.redirect(`/listing/${id}`);
};