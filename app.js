const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./Model/listings.js")
const mongo_url = "mongodb://127.0.0.1:27017/mernproject";
const path=require("path");

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


app.get("/health-check",(req,res)=>{
    res.send("everything is great")
})

//index route
app.get("/listings",async(req,res)=>{
   const AllListings=await Listing.find({});
   res.render("listings/index.ejs",{AllListings})
})

//create route
app.get("/listing/new",async(req,res)=>{
    res.render("listings/create.ejs")
})

//show route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const info_of_list=await Listing.findById(id);
    res.render("listings/show.ejs",{info_of_list});
})



//delete route
app.delete("listing/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
    
})




app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

