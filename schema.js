

const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().allow(""), // Allow empty filename
            url: Joi.string().uri().allow("") // Allow empty URL (for file uploads)
        }).allow(null), // Allow null image
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string().valid(
            "hotel", 
            "city", 
            "mountain", 
            "historical", 
            "beach", 
            "lakeside", 
            "forest", 
            "luxury", 
            "igloo", 
            "exotic", 
            "skiing", 
            "tropical", 
            "rainforest"
        ).required() // Ensure category is one of the valid values
    }).required()
});


const reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required(),
    }).required()
});

module.exports={listingSchema,reviewSchema};