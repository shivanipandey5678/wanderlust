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




module.exports.settingRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        console.log("Original Redirect URL:", req.session.redirectUrl);
        // Check if the redirect URL contains '/reviews'
        if (req.session.redirectUrl.includes('/reviews')) {
            // Split the URL into parts (e.g., "/listing/123/reviews" becomes ["", "listing", "123", "reviews"])
            const parts = req.session.redirectUrl.split('/');
            // The ID is the third part (index 2)
            const id = parts[2];
            // Set the redirect URL to just '/listing/:id'
            req.session.redirectUrl = `/listing/${id}`;
            console.log("Updated Redirect URL:", req.session.redirectUrl);
        }
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

