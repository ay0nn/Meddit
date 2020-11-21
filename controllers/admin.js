const e = require('express');
const express 	= require('express');
const router 	= express.Router();
const {body, validationResult} 		= require('express-validator');
const userModel		= require.main.require('./models/userModel');

router.get('/', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/index', {
				user: result
			});
		})
	} else {
		res.redirect('/login');
	}
}); 
//****************  ADDING MANAGER *************/
router.get('/adduser', (req, res) => {
	if (req.session.email != null) {
		userModel.getByEmail(req.session.email, function (result) {
			res.render('admin/adduser', {
				user: result
			});
		})
	} else {
		res.redirect('/login');
	}
}); 
router.post('/adduser', [
    //
    body('name')
    .notEmpty()
    .withMessage('Username is required'),
    
    body('phone_number')
    .notEmpty()
	.withMessage('Phone number is required'),
	
	body('address')
    .notEmpty()
	.withMessage('Address is required'),
	
	body('blood_group')
    .notEmpty()
	.withMessage('Blood Group is mendatory'),

	body('user_type')
    .notEmpty()
    .withMessage('User type is required'),
	
    body('email')
    .isEmail()
    .withMessage('Email is required'),

	body('password')
    .notEmpty()
    .withMessage('upassword is required')

  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.send(errors.array());
    }else{
        user={
            name: req.body.name,
			phone_number: req.body.phone_number,
			address: req.body.address,
			blood_group: req.body.blood_group,
			user_type: req.body.user_type,
            email: req.body.email,
	        password: req.body.password
        };

        userModel.insert(user,(status)=>{
            if(status){
				console.log('Insertion Succesful');
				res.redirect('/admin/userlist');                              
            }else{
                res.send("Insertion Failed!");                
            } 
        });
    }
  });
  //////////Users list/////////////////
  router.get('/userlist', (req, res) => {
	if (req.session.email != null) {
		userModel.getAllUser(function (result) {
			res.render('admin/userlist', {
				users: result
			});
		})
	} else {
		res.redirect('/login');
	}
});

////Update
router.get('/updateuser/:user_id',(req, res)=>{
	var user ={
		name:req.params.name
	};
	res.render('admin/updateuser',user);
});
router.post('/updateuser/:user_id',(req,res)=>{
	var user={
		user_id:req.params.user_id,
		name:req.body.name
	}
	
	userModel.update(user,function(status){
		if(status){
			console.log('Done');
			res.redirect('/admin/userlist');
		}
		else{
			res.render('/admin/updateuser')
		}
	});
});


////Deletion
router.get('/delete/:user_id', (req, res)=>{
	userModel.delete(req.params.user_id,(status)=>{
		if(status){
			res.redirect('/admin/userlist');
		}else{
			res.send('Deletion failed');
		}
  });
});
		
module.exports = router;