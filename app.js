const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./Model/listings.js")
const mongo_url = "mongodb://127.0.0.1:27017/mernproject";
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride = require("method-override");
async function main(){
    await mongoose.connect(mongo_url);
};


main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname,"/public")))
app.engine('ejs',ejsMate);

app.get("/",(req,res)=>{
    res.send("I'm the home ")
})

//index route
app.get("/listings",async(req,res)=>{
   const AllListings=await Listing.find({});
//    console.log(AllListings)
   res.render("listings/index.ejs",{AllListings})
})

//navigate to create page route
app.get("/listing/new",async(req,res)=>{
    res.render("listings/create.ejs")
})

//craete route
app.post("/listings",async(req,res)=>{
    let listing=req.body.listing;
    const newListing = new Listing(listing);
    await newListing.save();
    res.redirect("/listings")
})

//show route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    let info_of_list=await Listing.findById(id);
    // console.log(info_of_list)
    res.render("listings/show.ejs",{info_of_list});
})





//delete route
app.delete("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
    
})

//navigate to edit page route
app.get("/listing/:id/editpage",async(req,res)=>{
    let {id}=req.params;
    let searchList= await Listing.findById(id);
    console.log(searchList)
    res.render("listings/editpage.ejs",{searchList})
})

//update route
app.put("/listing/:id",async(req,res)=>{
   let {id}=req.params;
   let updatedList=await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
   console.log(updatedList)
   res.redirect(`/listing/${id}`)

})



app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

