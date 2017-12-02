/*
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    response.render('index', { title: 'Hello Yale SOM hackers' });
}

function about(request, response) {
    response.render('about', {});
}

module.exports = {
    index,
    about,
};
*/
const express = require('express');
const router = express.Router();

// const EventModel = require('../models/database');

router.get('/', index);

function index(req, res) {
  res.render('index', { title: 'Artsify Home' });
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
