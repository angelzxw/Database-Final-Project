const express = require('express');
const router = express.Router();


router.get('/', allArt);
router.get('/:id', artDetail);

function allArt(req, res) {
    res.render('art', { title: 'Art' });
}

function artDetail(req, res) {
  const eventId = req.params.id;
  EventModel.getAnEvent(eventId, (err, event) => {
    if(err) {
      res.redirect('/art');
      return;
    }
    console.log(event);
    const context = {
      title: 'Art Information',
      event: event,
    };
    res.render('art_detail', context);
  });
}

module.exports = router;
