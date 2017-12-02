const express = require('express');
const router = express.Router();

router.get('/', account);

function account(req, res) {
  res.render('account', { title: 'My Account' });
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
