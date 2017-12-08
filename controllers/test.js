const express = require('express');
const router = express.Router();
const artistModel = require("../controllers/database.js");

router.get('/', allArtists);

function allArtists(req, res) {
  console.log('test');
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
    //console.log(allArtists);
    res.render('test', context);

});


}

module.exports = router;
