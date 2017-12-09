'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');
const app = express();

// Through this configuration, Nunjucks will "tell"
// our Express app that it is handling the templates,
// so that when we call the `render` function on a
// response object, it will rely on Nunjucks.
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/partials', express.static(__dirname + '/public/partials'));
app.use('/scss', express.static(__dirname + '/public/scss'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
// Import our controllers from their files. Notice how we're
// giving the `require` built-in function the path a file
// locally instead of a dependency that was installed as
// specified in our `package.json` file, like "express".
const indexControllers = require('./controllers/index.js');

// Now, attach our "controllers" to our "routes".
app.get('/', indexControllers.index);
app.get('/about', indexControllers.about);
*/
app.use('/', require('./controllers/index.js'));
app.use('/about', require('./controllers/about.js'));

app.use('/art', require('./controllers/art.js'));
app.use('/artists', require('./controllers/artists.js'));
app.use('/items', require('./controllers/items.js'));
app.use('/account', require('./controllers/account.js'));
app.use('/contact', require('./controllers/contact.js'));
app.use('/test', require('./controllers/test.js'));
app.use("/search",require("./controllers/search.js"));
app.use("/shoppingcart", require("./controllers/shoppingcart.js"));

// Start up the application and listen on the specified
// port, or default to port 4000.
app.listen(process.env.PORT || 4000);
