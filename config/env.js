var util = require(__dirname + '/../libs/util.js');
var middleware = require(__dirname + '/../middleware');
var express = require('express');
var passport = require('passport');
var authentication = require(__dirname + '/../internal/services/authentication');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (express, app) {

    // Common configuration
    app.configure(function () {
        // Configure jQuery template engine
        express.version = require('express/package.json').version;
        app.set('views', __dirname + '/../views');
        app.set('view engine', 'jqtpl');
        app.engine('jqtpl', require('jqtpl').__express);

		//Configuring middleware
		middleware.init(app);
		passport.serializeUser(function(user, done) {  done(null, user.id);});
		passport.deserializeUser(function(id, done) { done(null, id);});
		
		//Configure Express Elements
		app.use(express.cookieParser());  
		app.use(express.cookieSession({ secret: 'secret'}));
		app.use(express.bodyParser());
		app.use(express.session({ secret: 'esoognom'}));
		app.use(passport.initialize());
		app.use(passport.session());
        app.use(app.router);
		
		//Configuring Passport
		passport.use(new LocalStrategy(authentication.authenticate));

        // Make sure build folders exist
        util.mkdir(__dirname + '/../build');
        util.mkdir(__dirname + '/../build/css');

        // Configure LESS compiler
       /* app.use('/css', require('less-middleware')({
            src: __dirname + '/../src/less',
            dest: __dirname + '/../build/css'
        }));
		
		*/

        // Create static file servers for the build and public folders
        //app.use(express.static(__dirname + '/../build'));
        app.use(express.static(__dirname + '/../public'));
    });

    // Development specific configuration
    app.configure('development', function () {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    // Production specific configuration
    app.configure('production', function () {
        app.use(express.errorHandler());
    });

};