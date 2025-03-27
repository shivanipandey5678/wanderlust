const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const flash = require("connect-flash");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let user = req.body.user;
        let newUser = new User(user);
        const registerUser = await User.register(newUser, user.password);
        console.log(registerUser);

        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings"); // Redirect to listings after successful signup
    } catch (error) {
        console.error("Error during signup:", error);
        req.flash("error", error.message); // Store error message
        res.redirect("/signup"); // Redirect back to signup on failure
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
async(req,res)=>{
    
    req.flash("success","Welcome back to wanderLust");
    res.redirect("/listings")
})



router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users from the database
        res.send(users); // Send the user data as response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/logout", async (req, res,next) => {
   req.logout((err)=>{
      if(err){
        next(err)
      }
      req.flash("success","You are logged out!")
      res.redirect("/listings")

   })
});





module.exports = router;
