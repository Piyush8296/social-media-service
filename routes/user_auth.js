var express = require('express'); 
var app = express();
var router = express.Router();

const config = require('../config');
const {generate_token} = require("../controllers/auth_controller");

router.get('/generate_token', (req,res) => {
 	generate_token(req,res)
})

module.exports = router;