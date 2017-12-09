const express = require('express');
const router = express.Router();
const localStorage = require('localStorage');
const path = require('path');
const orderModel = require("../controllers/database.js");
const async = require('async');


router.get('/', index);
router.post('/checkout', checkout);

function index(req, res) {
    res.sendFile(path.resolve('views/shoppingcart.html'));
    // res.render('shoppingcart', {title:'shopping cart'});
}

function checkout(req, res) {
    console.log("call checkout");
    console.log(req.body);
    console.log(req.body.painting_id);
    
    async.map( req.body.painting_id, orderModel.addBuy, (err) => {
        if(err) {
            console.log(err.stack);
            res.redirect('/');
            return;
        }
        console.log("succeess add buy");
        res.redirect('/');
    });
    
}

module.exports = router;
