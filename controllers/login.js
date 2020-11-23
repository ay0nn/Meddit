const express 	= require('express');
const fs		= require('fs');
const router 	= express.Router();
const userModel = require.main.require('./models/userModel');



router.get('/', (req, res)=>{
	res.render('login');	
});
router.post('/', (req, res)=>{
	
	var user = {
		email: req.body.email,
		password: req.body.password

	};
	userModel.validate(user, function(status){
		if(status == true){
			req.session.email = user.email;	
			 userModel.getByEmail(user.email, function(result){
				req.session.name = result[0].name;
			 	req.session.user_type = result[0].user_type;
				if(result[0].user_type =="admin"){
			 		res.redirect('/admin');
				 }
				 else if(result[0].user_type=="doctor"){
					res.redirect('/doctor');
			 	}
			 	else if(result[0].user_type=="patient"){
					res.redirect('/patient');
			 	}
			 }	);
        } else {
			console.log("Invalid Password/Email");
			res.send("Failed Login");
        }
			})	
	});
module.exports = router;