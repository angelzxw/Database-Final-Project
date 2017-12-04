const express = require('express');
const router = express.Router();
const artModel = require("../models/database.js");

router.get('/', allArt);
router.get('/:id', artDetail);

function allArt(req, res) {
    artModel.getAllArts((err, allArts) => {
    if(err) {
      console.log(err.stack);
      res.redirect('/');
      return;
    }

    const context = {
        title: 'All Arts',
        allArts: allArts,
    };
    // console.log(allArts);
    res.render('art', context);
    
  });
}

function artDetail(req, res) {
  const artID = req.params.id;
  artModel.getArtByID(artID, (err, art) => {
    if(err) {
      console.log(err.stack);
      res.redirect('/art');
      return;
    }
    console.log(art);
    artModel.getNArtByArtistID(5, art[0].artist_id, art[0].painting_id, (err, relatedArts)=>{
      if(err) {
        console.log(err.stack);
        res.redirect('/art');
        return;
      }
      console.log(relatedArts);
      const context = {
        title: 'Art Information',
        art: art,
        relatedArts: relatedArts,
      };
    res.render('art_detail', context);
    
    });
    
  });
}

module.exports = router;
