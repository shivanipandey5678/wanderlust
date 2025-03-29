const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const flash = require("connect-flash");
const passport = require("passport");
const {settingRedirectUrl}=require("../middleware");
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {
    try {
        let user = req.body.user;
        let newUser = new User(user);
        const registerUser = await User.register(newUser, user.password);
        
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to WanderLust!");
            res.redirect("/listings")
        })
        
    } catch (error) {
        console.error("Error during signup:", error);
        req.flash("error", error.message); // Store error message
        res.redirect("/signup"); // Redirect back to signup on failure
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

// router.post("/login",settingRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
// async(req,res)=>{
//     req.flash("success","Welcome back to wanderLust");
//     res.redirect(req.session.redirectUrl);
// })

router.post("/login", settingRedirectUrl, passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true 
}), async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    console.log("Final Redirecting to:", redirectUrl); 
    res.redirect(redirectUrl);
});






router.get("/logout", async (req, res,next) => {
   req.logout((err)=>{
      if(err){
       return next(err)
      }
      req.flash("success","You are logged out!")
      res.redirect("/listings")

   })
});





module.exports = router;
