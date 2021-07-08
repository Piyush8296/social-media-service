var express = require('express'); 
var app = express();
var router = express.Router();

const config = require('../config');

const {authentication} = require("../middlewares/authentication");
const {check_if_parent_exists_for_sub_comment_with_provided_id} = require("../middlewares/common");
const {handle_add_comment,handle_add_reaction,handle_comments_fetch,handle_comment_delete} = require("../controllers/comment_controller")

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

router.use('/list_of_comments_of_a_user',authentication);
router.get('/list_of_comments_of_a_user', (req,res) => {
 	handle_comments_fetch(req,res)
})

//single API can be used to delete multiple as well, for now implementing single comment
router.use('/single_comment',authentication);
router.delete('/single_comment', (req,res) => {
 	handle_comment_delete(req,res)
})

module.exports = router;