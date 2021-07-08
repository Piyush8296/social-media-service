var jwt = require('jsonwebtoken');
var config = require('../config');

const { v4: uuidv4 } = require('uuid');

const generate_token = (req,res)=>{
	const token_metadata = {
		"soc_email":"test@gmail.com",
		"soc_password":"test134",
		"soc_id":uuidv4() //random uuid generator
	}

	const token = jwt.sign(token_metadata, config["JWT_SECRET"],{
		expiresIn: config['EXP_TIME_USER_TOKEN']
	});

	res.json({success:true,data:token,msg:"Success"})
}

module.exports = {generate_token}