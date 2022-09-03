const router = require('express').Router();


router.get('/index', (req, res) => {
    res.send('Hello World');
})

module.exports = router;