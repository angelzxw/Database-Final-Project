const express = require('express');
const router = express.Router();
const localStorage = require('localStorage');
const path = require('path');

// const EventModel = require('../models/database');

router.get('/', index);

function index(req, res) {
    res.sendFile(path.resolve('views/shoppingcart.html'));
    // res.render('shoppingcart', {title:'shopping cart'});
}

module.exports = router;
