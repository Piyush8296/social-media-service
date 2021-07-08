var jwt = require('jsonwebtoken');

var config = require('../config');

const authentication = (req,res,next)=>{
	const token = req.body.token || req.query.token || req.headers.authorization;

	if(!token){
		res.status(403).send({
			success: false,
			msg: 'No Authentication Provided'
		});
		return;
	}

	jwt.verify(token, config["JWT_SECRET"], (err,decoded)=>{
		if(err){
			console.log(err)
			res.status(440).send({success: false, msg: 'Un-Authorized Access, expired session'});
		}else{
    		req.decoded = decoded;
			next();
		}
	});
}

module.exports = {authentication}