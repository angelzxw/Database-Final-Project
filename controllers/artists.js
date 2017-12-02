const express = require('express');
const router = express.Router();

router.get('/', artists);

router.get('/', allArtists);
router.get('/:id', artistDetail);

function allArtists(req, res) {
    res.render('art', { title: 'Art' });
}

function artistDetail(req, res) {
  const eventId = req.params.id;
  EventModel.getAnEvent(eventId, (err, event) => {
    if(err) {
      res.redirect('/artists');
      return;
    }
    console.log(event);
    const context = {
      title: 'Art Information',
      event: event,
    };
    res.render('artist_detail', context);
  });
}

module.exports = router;
