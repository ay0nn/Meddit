const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "SELECT * FROM `user` WHERE email='"+user.email+"' AND password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getUser: (user, callback) => {
        var sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
        db.getResults(sql, [user.email, user.password], (result) => {
            callback(result);
        });
    },
   
	getByEmail: function(email, callback){
		var sql = "SELECT * FROM `user` WHERE email='"+email+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAllUser: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getById: function(user_id, callback){
		var sql = "select * from user where user_id='"+user_id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert:(user,callback)=>{
        var sql="INSERT INTO `user`(`name`,`phone_number`,`address`,`blood_group`,`user_type`,`email`,`password`) VALUES ('"+user.name+"','"+user.phone_number+"','"+user.address+"','"+user.blood_group+"','"+user.user_type+"','"+user.email+"','"+user.password+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
	update: function(user, callback){
		console.log(user);
		var sql ="UPDATE `user` SET `name` = '"+user.name+"',`phone_number` = '"+user.phone_number+"',`address` = '"+user.address+"',`blood_group` = '"+user.blood_group+"',`user_type` = '"+user.user_type+"',`email` = '"+user.email+"' WHERE user_id = '"+user.user_id+"'";
		db.execute(sql, (result) => {
			callback(result);
		});
	},

	delete: function(id, callback){
		var sql = "DELETE FROM `user` WHERE user_id='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	}
}