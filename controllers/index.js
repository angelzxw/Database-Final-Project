
// Create a function which is a "controller", it
// handles a request, writing the response.
function index(request, response) {
    response.render('index', { title: 'Hello Yale SOM hackers' });
}

module.exports = {
    index,
};
