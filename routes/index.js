function routes(app)
{
routes = {
    dev_website: require('./dashboard')(app)
}
}

module.exports = routes;
