const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync");
const ExpressError=require("../utlis/ExpressError");
const Listing=require("../Model/listings");
const Review=require("../Model/reviews");
const methodOverride = require("method-override");
const {listingSchema,reviewSchema}=require("../schema.js");
const flash=require("connect-flash");


const validateListing=((req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message.join(","));
        throw new ExpressError(400,errMsg);
    }
    else{
       next()
    }
})


 
 //navigate to create page route
 router.get("/new",async(req,res)=>{
     res.render("listings/create.ejs")
 })
 

 //show route
 router.get("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let info_of_list=await Listing.findById(id).populate("reviews");
     if(!info_of_list){
        req.flash("error","not found 404");
        res.redirect("/listings")
     }
     // console.log(info_of_list)
     res.render("listings/show.ejs",{info_of_list});
 }));
 
 //delete route
 router.delete("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let searchList= await Listing.findByIdAndDelete(id);
     if(!searchList){
        req.flash("error","not found 404");
        res.redirect("/listings")
     }
     req.flash("success"," Listing Deleted!");
     res.redirect("/listings")
     
 }));
 
 //navigate to edit page route
 router.get("/:id/editpage",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let searchList= await Listing.findById(id);
     if(!searchList){
        req.flash("error","not found 404");
        res.redirect("/listings")
     }
     console.log(searchList)
     res.render("listings/editpage.ejs",{searchList})
 }));
 
 //update route
 router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
   
    let {id}=req.params;
    let updatedList=await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if(!updatedList){
        req.flash("error","not found 404");
        res.redirect("/listings")
     }
    req.flash("success"," Listing Updated!");
    res.redirect(`/listing/${id}`)
 
 }));
 
 
 
 
 module.exports=router;