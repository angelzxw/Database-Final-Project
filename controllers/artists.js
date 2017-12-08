const express = require('express');
const async = require('async');
const router = express.Router();
const artistModel = require("../controllers/database.js");
// router.get('/', artists);

router.get('/', allArtists);
router.get('/:id', artistDetail);

function allArtists(req, res) {

  artistModel.getAllArtists((err, allArtists) => {
    if(err) {
      console.log(err.stack);
      res.redirect('/');
      return;
    }

    // async.map(allArtists, (artist, callback) => {

    //   artistModel.getNArtByArtistID(1, artist.artist_id, callback);
    // }, function(getOneArtFromEachErr, getOneArtFromEachResult) {
    //   // results is now an array of stats for each file
    //   console.log(getOneArtFromEachResult);
    //   if(getOneArtFromEachErr) {
    //     console.log(getOneArtFromEachErr.stack);
    //     res.redirect('/');
    //     return;
    //   }
    //   console.log(getOneArtFromEachResult);
    //   const context = {
    //     title: 'All Artists',
    //     allArtists: allArtists,
    //   };
    // });



    const context = {
        title: 'All Artists',
        allArtists: allArtists,
    };
    console.log(allArtists);
    res.render('artists', context);

  });



}

function artistDetail(req, res) {
  const artist_id = req.params.id;
  const anchor = req.params.anchor;
  async.parallel([
      function(callback) {
        artistModel.getArtistByID(artist_id, callback);
      },
      function(callback) {
        artistModel.getArtByArtistID(artist_id, callback);
      },
  ],
  // callback and the reults is an array combining results from the function in array
  function(err, results) {

    if(err) {
      console.log(err);
      res.redirect('/artists');
      return;
    }
    const context = {
      title: 'Art Information',
      artist: results[0],
      anchor: anchor,
      arts:  results[1],
    };

    res.render('artist_detail', context);

  });

}



module.exports = router;
