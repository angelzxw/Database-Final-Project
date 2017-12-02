const express = require('express');
const router = express.Router();

router.get('/', artists);

function artists(req, res) {
  res.render('artists', { title: 'Artists' });
  /*
  EventModel.getAllEvents((err, events) => {
    const context = {
      title: 'List of Events',
      events: events,
    };
    res.render('index', context);
  });
  */
}

module.exports = router;
