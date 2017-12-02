const express = require('express');
const router = express.Router();


router.get('/', art);

function art(req, res) {
    res.render('art', { title: 'Art' });
}

module.exports = router;
