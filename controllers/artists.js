const express = require('express');
const router = express.Router();
const artistModel = require("../models/artistModel.js");
// router.get('/', artists);

router.get('/', allArtists);
router.get('/:id*', artistDetail);

function allArtists(req, res) {
  console.log("controller allArtists");
  
  let allArtists = artistModel.getAllArtists();
  context = {
    allArtists : allArtists,
  }
    res.render('artists', context);
}

function artistDetail(req, res) {
  const artist_id = req.params.id;
  console.log("anchor" + req.params[0]);
  artistModel.getArtist(artist_id, (err, artist) => {
    if(err) {
      res.redirect('/artists');
      return;
    }
    console.log(artist);
    const context = {
      title: 'Art Information',
      artist: artist,
    };
    res.render('artist_detail', context);
  });
}

module.exports = router;
