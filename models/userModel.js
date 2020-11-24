const db 		= require('./db');
const crypto 	= require('crypto');

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

	delete: function(user_id, callback){
		var sql = "DELETE FROM `user` WHERE user_id='"+user_id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},
	searchUser: function(n, callback){
		var sql = "SELECT * FROM user WHERE "+n.searchby+" LIKE '%"+n.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
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
	/////NOtice

	insertnotice:(notice,callback)=>{
		var sql = "INSERT INTO `notice` (`nid`, `notice`) VALUES (NULL, '"+notice.notice+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
	getAllNotice: function(callback){
		var sql = "select * from notice";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	

	deleteNotice: function(id, callback){
		var sql = "DELETE FROM `notice` WHERE nid='"+id+"';";
		db.execute(sql, function(status){
			callback(status);
		});
	},

	searchNotice: function(n, callback){
		var sql = "SELECT * FROM notice WHERE "+n.searchby+" LIKE '%"+n.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	///// Posts
	getAllPost: function(callback){
		var p = "select * from post";
		db.getResults(p, function(results){
			callback(results);
		});
	},
	

	deletePost: function(id, callback){
		var p = "DELETE FROM `post` WHERE post_id='"+id+"';";
		db.execute(p, function(status){
			callback(status);
		});
	},

	/////Comments

	getAllComment: function(callback){
		var c = "select * from comment";
		db.getResults(c, function(results){
			callback(results);
		});
	},
	

	deleteComment: function(id, callback){
		var c = "DELETE FROM `comment` WHERE comment_id='"+id+"';";
		db.execute(c, function(status){
			callback(status);
		});
	},

}