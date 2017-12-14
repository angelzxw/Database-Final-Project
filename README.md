## Artsify
Demo:[Express website](http://ec2-13-58-21-188.us-east-2.compute.amazonaws.com:4000)
or [Express website](https://artsify.herokuapp.com/)
Report:[Express website](https://docs.google.com/document/d/1QcMeE4aPVyfvy9l8YfbrsodZoKV5fCDbR0hRsyhHZV0/edit?usp=sharing)
Presentation: [Express website](https://docs.google.com/presentation/d/1jlNqR41D84bjY-zVK3u-MHvpB0PfF7sTUH9OVSvUYCA/edit?usp=sharing)

This project implemented a fully integrated and comprehensive fine art relational-database management system. Utilizing this database system, an online fine art gallery and marketplace, Artsify, was created to allow users browsing all the information or search specific information related to available artworks and artists in the database. In addition, users would be able to make purchases of the artworks they are interested in, and the database would store the order and update the availability of the artworks accordingly. We used HTML, CSS, JavaScript, and Node.js to build the web application, and in the server-end we deployed our database on PostgreSQL.

Below you'll find a description of each file.

* `server.js` - this is your server code. The `express` module is how you tell your application what to do with different requests -- check out the [Express website](http://expressjs.com) for more.
* `controllers/` - this directory contains our "controllers" or "handlers", functions that take an HTTP
request and write to the HTTP response. We've separated out the
controllers for the index page about page, art page, artists page, contact page, and search page.
* `models/` - this puts data storage into "models"---pieces of
code that "model" the structure of the data upon which our application depends. In this case, we
have just one model file, database.js, which "wired up"
to a database.
* `views/` - these are the "templates" or "views" for our application. These are HTML,
but with another "templating language" thrown in so that we can generate different HTML given
different data. We're using "nunjucks".
The controller gathers the data
* `sql/` - initializes the tables in the database
needed for an HTTP response, and renders the view using these data.
* `package.json` - this is Node's configuration file for our project. Inside contains information about the project, along with a list of dependencies (like Express) that you can install into `node_modules/` with `npm install`.
* `node_modules/` - the folder containing all of your dependencies. Usually you don't need to do anything to it, but if your app is misbehaving, sometimes removing and reinstalling `node_modules/` by running `rm -rf node_modules/` and `npm install` or `yarn install` will fix it.
* `yarn.lock` - this describes the exact state of your `node_modules/` tree without uploading the tree itself. npm modules are always being updated, so this allows you to know exactly what you're running and standardize this across installations.
* `.gitignore` - this tells Git which files and folders to ignore -- for example, you don't want to push `node_modules/` to GitHub.
* `README.md` - this file :)

## Installing dependencies

To install dependencies, run `yarn install`.
You can install yarn with `npm install yarn` optionally adding the `-g` flag if you
want to install it "globally", which will depend on your preferences.

## Running the code

To run this application in a development environment, use the command `yarn dev`.
That will run the "dev" script defined in `package.json`, which itself runs
[nodemon](https://github.com/remy/nodemon).

In production, you should start the app with the command either `yarn start` or
`npm start`.
