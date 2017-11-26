
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
