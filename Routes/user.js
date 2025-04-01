const express = require("express");
const router = express.Router();
const User = require("../Model/users");
const flash = require("connect-flash");
const passport = require("passport");
const wrapAsync=require("../../wanderlust/utlis/wrapAsync");
const {settingRedirectUrl}=require("../middleware");
const userController=require("../controllers/users");

router.route("/signup")
    .get(wrapAsync(userController.OpenSignupUp))
    .post( wrapAsync( userController.signup));


router.route("/login")
      .get( wrapAsync(userController.OpenLoginPage))
      .post( settingRedirectUrl, passport.authenticate("local", { 
        failureRedirect: "/login", 
        failureFlash: true 
    }), wrapAsync(userController.login));
    











router.get("/logout",wrapAsync(async (req, res,next) => {
   req.logout((err)=>{
      if(err){
       return next(err)
      }
      req.flash("success","You are logged out!")
      res.redirect("/listings")

   })
}));





module.exports = router;
