/**
 * Created by kai on 08/12/2017.
 */
const express = require('express');
const router = express.Router();
const artModel = require("../controllers/database.js");

router.post('/',searchArt);

function searchArt(req,res) {
    artModel.getArtByKeyword(req.body.searchText,function (err,data) {
        if(err) {
            console.log(err.stack);
            res.redirect('/');
            return;
        }
        //console.log(data);
        const context = {
            title: 'All Arts',
            allArts: data,
        };
        // console.log(allArts);
        res.render('art', context);
    });
}

module.exports = router;
