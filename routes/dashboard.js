const express = require('express');
const router = express.Router();
//If auth successful, user = res.locals.user
router.get('/', (req, res, next) => {
    //Redirect user to signin page if not logged in
    if (!res.locals.user) res.redirect('/');
    else {
        let userInfo;
        req.user ? userInfo = req.user.dataValues.firstName : userInfo = res.locals.user.firstName;
        res.render('dashboard', { user: JSON.stringify(userInfo) });
    }
})

module.exports = router;