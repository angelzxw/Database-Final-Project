'use strict';

const express = require('express');

const app = express();

app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/partials', express.static(__dirname + '/public/partials'));
app.use('/scss', express.static(__dirname + '/public/scss'));
app.use('/fonts', express.static(__dirname + '/public/fonts'));
// Import our controllers from their files. Notice how we're
// giving the `require` built-in function the path a file
// locally instead of a dependency that was installed as
// specified in our `package.json` file, like "express".
const indexControllers = require('./controllers/index.js');

// Configure our "templating engine", which is
// Mozilla's "Nunjucks" in this case.
const nunjucks = require('nunjucks');

// Through this configuration, Nunjucks will "tell"
// our Express app that it is handling the templates,
// so that when we call the `render` function on a
// response object, it will rely on Nunjucks.
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');

// Now, attach our "controllers" to our "routes".
app.get('/', indexControllers.index);

// Start up the application and listen on the specified
// port, or default to port 4000.
app.listen(process.env.PORT || 4000);
