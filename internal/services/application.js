var db = require('../database/models');
var util = require('../../libs/util');
var email = require('../../libs/email');

module.exports.save_application = function (applicationParams,user, cb) {
    var app = new db.Application();
    app.type = applicationParams.application_type;
    app.name = applicationParams.application_name;
    app.owner_id = user;
    app.save(function(err,app){
        if(err){
            console.log(err);
            return cb('Some error occurred, please try again.',null);
        }
        db.Account.findOne({'_id' : user},function(err,account){
            if(err){
                console.log(err);
                return cb('Some error occurred, please try again.',null);
            }
            account.application.push(app);
            account.save(function(err,account){
                app.owner.push(account);
                app.save();
            });
            return cb(null,app);
        });
    });


}
module.exports.dashboard = function (user, cb) {
    db.Application.find({ owner_id: user  },function(err,application){
        if(err){
            return cb(err,null);
        }
            return cb(null,application);
        });
}



module.exports.candidate_step1 = function (data, cb) {

	console.log('data:',data);
	db.Child.find({ name: data.name, email: data.mail,phone: data.phone },function(err,child){
		console.log(child);
		if(err){
			console.log(err);
			return cb(err,null);
		}

		else if(child == null || child == ''){
			console.log('null');
			var c= new db.Child();
			c.name = data.name;
			c.email = data.mail;
			c.phone = data.phone;
			c.save(function(err, child){
				return cb(null,child);
			});
		}
		else{
			console.log('else');
			return cb(null,child);
		}

	});
}

module.exports.candidate_step2 = function (data, cb) {
			var p= new db.Parent();
			p.name = data.d1.name;
			p.email = data.d1.mail;
			p.phone = data.d1.phone;
			p.save(function(err, parent){
				var j= new db.Journey();
				j.to = data.d1.to;
				j.from = data.d1.from;
				j.parent = p;
				console.log(data.d1);
				console.log(':',data.d2.data);
				db.Child.findOne({_id : data.d2.data._id}, function(err,child){
					console.log('child',child);
					j.child = child;
					j.save(function(err,journey){
						if(err){
							console.log(err);
						}
						return cb(null,{child : child, parent: parent,journey : journey});
					})

				})



			});
}


module.exports.tracker_map = function (id, cb) {
	db.Journey.findOne({_id : id}, function(err, journey){
		if(err){
			console.log(err);
			return cb(err, null);
		}
		return cb(null, journey);
	})
}

module.exports.get_journey = function (cb) {
	db.Journey.find({}, function(err, journey){
		if(err){
			console.log(err);
			return cb(err, null);
		}
		return cb(null, journey);
	})
}
