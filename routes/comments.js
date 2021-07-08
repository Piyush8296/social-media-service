var express = require('express'); 
var app = express();
var router = express.Router();

const config = require('../config');

const {authentication} = require("../middlewares/authentication");
const {check_if_parent_exists_for_sub_comment_with_provided_id} = require("../middlewares/common");
const {handle_add_comment} = require("../controllers/comment_controller")

//either a comment or a sub comment
router.use('/post_comment',authentication,check_if_parent_exists_for_sub_comment_with_provided_id);
router.post('/post_comment', (req,res) => {
 	handle_add_comment(req,res)
})

module.exports = router;