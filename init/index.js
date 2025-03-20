const mongoose = require("mongoose");
const Listing=require("../Model/listings.js")
const  sampleListings =require("./data.js")
const mongo_url = "mongodb://127.0.0.1:27017/mernproject";

async function main(){
    await mongoose.connect(mongo_url);
};


main()
.then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function initDB(){
   await Listing.deleteMany({});
   await Listing.insertMany(sampleListings);
   
   console.log("data was initialized");
}
initDB();