
```markdown
# 🌍 Wanderlust - A Travel Stay Booking Web App

**Wanderlust** is a full-stack web application inspired by Airbnb. It allows users to explore, create, and manage property listings for travel stays. With features like image uploads, geolocation, reviews, and secure authentication, the platform offers a complete experience for both hosts and travelers.

---

## 🚀 Features

- 🔐 **User Authentication** – Secure signup, login, and logout using Passport.js
- 🏡 **CRUD Operations** – Create, read, update, and delete listings and reviews
- 📷 **Image Uploads** – Upload listing images using Cloudinary
- 🗺️ **Geolocation** – Location features integrated with Mapbox
- 📱 **Responsive Design** – Built with Bootstrap 5 for mobile-first experience
- ✅ **Validation** – Joi used for validating user inputs and data
- ⚠️ **Error Handling** – Custom error handling with helpful feedback
- 💬 **Flash Messages** – Real-time alerts using connect-flash

---

## 🧰 Tech Stack

### Frontend:
- **Templating**: EJS
- **CSS Framework**: Bootstrap 5
- **Custom CSS**: Additional styling for unique UI

### Backend:
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with passport-local-mongoose
- **File Uploads**: Multer and Cloudinary
- **Maps**: Mapbox SDK

---

## 📁 Folder Structure

```

wanderlust/
├── Model/               # Mongoose schemas
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── Routes/              # Express route handlers
│   ├── listings.js
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
├── controllers/         # Route logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── user/
│   ├── includes/
│   └── Error.ejs
├── public/              # Static files
│   ├── css/
│   └── js/
├── utils/               # Utility functions
│   ├── wrapAsync.js
│   └── ExpressError.js
├── init/                # Sample data
│   ├── data.js
│   └── index.js
├── app.js               # Main app entry point
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
├── .env                 # Environment variables
└── package.json         # Project metadata

````

---

## 🌐 API Endpoints

### 📌 Listings
| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/listings`      | View all listings         |
| POST   | `/listings`      | Create a new listing      |
| GET    | `/listing/:id`   | View a single listing     |
| PUT    | `/listing/:id`   | Update a listing          |
| DELETE | `/listing/:id`   | Delete a listing          |

### 📝 Reviews
| Method | Endpoint                              | Description             |
|--------|----------------------------------------|-------------------------|
| POST   | `/listing/:id/reviews`                | Add a review            |
| DELETE | `/listing/:id/reviews/:reviewId`      | Delete a review         |

### 👤 User Authentication
| Method | Endpoint     | Description               |
|--------|--------------|---------------------------|
| GET    | `/signup`    | Render signup page        |
| POST   | `/signup`    | Register a new user       |
| GET    | `/login`     | Render login page         |
| POST   | `/login`     | Login existing user       |
| GET    | `/logout`    | Logout current user       |

---

## 🛡️ Validation Schemas

### 📄 Listing Schema
```javascript
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object({
      filename: Joi.string().allow(""),
      url: Joi.string().uri().allow("")
    }).allow(null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    category: Joi.string().valid(
      "hotel", "city", "mountain", "historical", "beach",
      "lakeside", "forest", "luxury", "igloo", "exotic",
      "skiing", "tropical", "rainforest"
    ).required()
  }).required()
});
````

### 📄 Review Schema

```javascript
const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required()
  }).required()
});
```

---

## 🛠️ Middleware

### Authentication:

* **`isLoggedIn`** – Ensures the user is logged in
* **`isOwner`** – Checks if user is the owner of the listing
* **`isReviewAuthor`** – Checks if user is the author of a review

### Error Handling:

* **`wrapAsync`** – Wraps async functions to catch errors
* **`ExpressError`** – Custom error class

---

## 🌍 Deployment

### ✅ Environment Variables (`.env`)

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAP_TOKEN=your_mapbox_token
ATLASDB_URL=your_mongodb_connection_string
```

### 💻 Run Locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the application**

   ```bash
   node app.js
   ```

3. **Open in browser**

   ```
   http://localhost:8080
   ```

---

## 📌 Key Files

* `app.js` – Main app file, sets up middleware, routes, and error handlers
* `cloudConfig.js` – Cloudinary image upload config
* `schema.js` – Joi schemas for validating data
* `middleware.js` – Custom middleware functions

---

## 🤝 How to Contribute

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes

   ```bash
   git commit -m "Add feature"
   ```
4. Push to GitHub

   ```bash
   git push origin feature-name
   ```
5. Open a pull request

---

## 🙋‍♀️ Author

**Shivani Pandey**
Made with ❤️ for travelers and hosts.

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 📎 Notes

* Default images are shown if no image is uploaded
* Flash messages give users instant feedback
* Designed to be scalable and easy to maintain

```
