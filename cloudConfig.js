const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// console.log(process.env.CLOUDINARY_CLOUD_NAME,"CLOUDINARY_CLOUD_NAME")
// console.log(process.env.CLOUDINARY_API_KEY,"CLOUDINARY_API_KEY")
// console.log(process.env.CLOUDINARY_API_SECRET,"CLOUDINARY_API_SECRET")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderLust_Dev',
      allowedFormat:["png","jpg","jpeg"],
    
    },
  });

  module.exports={storage,cloudinary};