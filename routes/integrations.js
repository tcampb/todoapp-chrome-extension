const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('integrations', {
        img: res.locals.user.picture,
        document: "integrations"
    });
})

module.exports = router;