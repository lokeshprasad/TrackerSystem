var services = require('../internal/services');

module.exports.get_application_create = function (req, res) {
        console.log('get_application_create');
        return res.render('application_create');
}

module.exports.post_application_save = function (req, res) {
    services.application.save_application(req.body,req.user, function(err, cb){
        return res.redirect('/dashboard');
    });

}

module.exports.get_all_entity = function (req, res) {
    return res.render('all_entity');

}

module.exports.get_entity_create = function (req, res) {
    console.log('get_entity_create');
    return res.render('entity_create');
}