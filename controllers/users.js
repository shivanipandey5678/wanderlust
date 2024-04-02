const User=require("../Model/users") ;

module.exports.OpenSignupUp=(req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signup=async (req, res,next) => {
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
        // console.error("Error during signup:", error);
        req.flash("error", error.message); // Store error message
        res.redirect("/signup"); // Redirect back to signup on failure
    }
}

module.exports.OpenLoginPage=(req,res) => {
    res.render("user/login.ejs");
}


module.exports.login=async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    // console.log("Final Redirecting to:", redirectUrl); 
    res.redirect(redirectUrl);
}