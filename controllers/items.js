const express = require('express');
const router = express.Router();

router.get('/', items);

function items(req, res) {
  res.render('cart', { title: 'My Shopping Cart' });
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
