const express = require('express');
const router = express.Router();
//If auth successful, user = res.locals.user
router.get('/', (req, res, next) => {
    res.render('dashboard', { user: 'Express' });
})

module.exports = router;