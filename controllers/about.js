const express = require('express');
const router = express.Router();

router.get('/', about);
router.get('/team', team);
router.get('/membership', membership);

function about(req, res) {
    res.render('about', { title: 'About Artsify' });
}

function team(req, res) {
    res.render('team', { title: 'Team' });
}

function membership(req, res) {
    //res.render('membership', { title: 'Membership' });
}

module.exports = router;
