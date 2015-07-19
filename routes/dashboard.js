var controllers = require('../controllers');
var authorize = require('../middleware/authorize');
var passport = require('passport');

module.exports = function routes(app) {
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	app.post('/candidate/step1', controllers.account.candidate_step1);
	app.post('/candidate/step2', controllers.account.candidate_step2);
	app.get('/tracker/map/:id', controllers.account.tracker_map);
	app.post('/login', controllers.account.login);
	app.get('/get_journey', controllers.account.get_journey);


	/*
	app.get('/', controllers.account.login_page);
	app.get('/register', controllers.account.register_page);
	app.post('/register', controllers.account.register)
	app.get('/login', controllers.account.login_page);
	app.post('/login', passport.authenticate('local', {
			failureRedirect : '/login'
		}), controllers.account.login);
	app.get('/logout', authorize, controllers.account.logout);
	app.get('/dashboard', authorize, controllers.account.dashboard);

	app.get('/verifyemail', controllers.account.verify_email);
	app.get('/verify', controllers.account.verify_email_page);
    app.get('/application/create', authorize, controllers.dashboard.get_application_create);
    app.post('/application/save', authorize, controllers.dashboard.post_application_save);
    app.get('/application/:id', authorize, controllers.dashboard.get_all_entity);
    app.get('/entity/create', authorize, controllers.dashboard.get_entity_create);
    */
};
