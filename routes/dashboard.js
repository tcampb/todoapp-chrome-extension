const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(res.locals.user);
    res.end('test');
})

module.exports = router;