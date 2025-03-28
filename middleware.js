module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (!req.session.redirectUrl) {
            req.session.redirectUrl = req.originalUrl;  // Store the requested URL
            console.log("Stored redirect URL:", req.session.redirectUrl);  // Debugging
        }
        req.flash("error", "You must be logged in first.");
        return res.redirect("/login");
    }
    next();
};




module.exports.settingRedirectUrl=(req,res,next)=>{
    if (req.session.redirectUrl) {
        console.log("settingRedirectUrl:",req.session.redirectUrl)
       res.locals.redirectUrl=req.session.redirectUrl;
       

    }
    next();
}