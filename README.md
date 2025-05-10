

```markdown
# Wanderlust 🧳🌍

Wanderlust is a dynamic web application for listing and exploring travel stays, similar to Airbnb. It allows users to create, view, update, and delete property listings with proper validations and error handling.

## 🔧 Tech Stack

- **Frontend:** EJS, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Validation:** Joi
- **Templating Engine:** EJS-Mate (for layout support)
- **Other Tools:** Method-Override, Express Error Handling

---

## 🚀 Features

- 🏠 Create, Read, Update, and Delete (CRUD) listings
- 🛡️ Server-side validation using Joi
- 🚫 Custom error handling for cleaner UX
- 🌐 Responsive UI using Bootstrap
- 🖼️ Upload image URLs (nested image object format: `{ image: { url } }`)
- 🗺️ Location and country input for each listing

---

## 📁 Folder Structure

```

Wanderlust/
│
├── Model/
│   └── listings.js
├── utils/
│   ├── wrapAsync.js
│   └── ExpressError.js
├── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── create.ejs
│   │   ├── editpage.ejs
│   │   └── show\.ejs
│   ├── error.ejs
│   └── layouts/
│       └── boilerplate.ejs
├── public/
│   └── (static assets like CSS, images)
├── schema.js
├── app.js

````

---

## 🧪 Validation Schema (`schema.js`)

```js
const Joi = require("joi");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().uri().allow("").required()
        }).required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

module.exports = listingSchema;
````

---

## ⚠️ Error Handling

All routes are wrapped with `wrapAsync()` to catch async errors.
Custom errors are handled using `ExpressError`, and an error view is rendered with status code and message.

---

## 🛠️ How to Run Locally

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start MongoDB (locally)

4. Run the server

   ```bash
   node app.js
   ```

5. Open in browser

   ```
   http://localhost:8080
   ```

---

## 🙋‍♀️ Author

Made with ❤️ by Shivani Pandey

---

## 📌 Note

* Image is stored as an object `{ image: { url } }`, not just a string.
* Default image logic is handled if URL is empty.




