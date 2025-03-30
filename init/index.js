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

const initData=async()=>{
   await Listing.deleteMany({});
   data=sampleListings.map((obj)=>({...obj,owner:"67e3c0273ca22cd543cc18af"}));
   await Listing.insertMany(data);
   
   console.log("data was initialized");
}
initData();

 