var express = require('express'); 
var app = express();
var router = express.Router();

const config = require('../config');

const {authentication} = require("../middlewares/authentication");
const {check_if_parent_exists_for_sub_comment_with_provided_id} = require("../middlewares/common");
const {handle_add_comment,handle_add_reaction} = require("../controllers/comment_controller")

//either a comment or a sub comment
router.use('/post_comment',authentication,check_if_parent_exists_for_sub_comment_with_provided_id);
router.post('/post_comment', (req,res) => {
 	handle_add_comment(req,res)
})

// this method should be a PUT , but i personally usually prefers POST for ease
router.use('/add_reaction',authentication);
router.post('/add_reaction', (req,res) => {
 	handle_add_reaction(req,res)
})


module.exports = router;