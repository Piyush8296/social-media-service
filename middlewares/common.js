const mongoose = require('mongoose');
const config = require('../config');
const Comment = mongoose.model('Comment');

const {
		check_existence_of_data_in_collection_aync
	} = require("../controllers/common_controller.js")

const check_if_parent_exists_for_sub_comment_with_provided_id = async(req,res,next)=>{
	if(req.body["soc_type"] == "parent"){
		req.decoded["soc_parent_id"] = "0"
		return next()
	}

	const find_query = {
		"soc_type":"parent",
		"soc_id":req.body["soc_parent_id"]
	}

	const parent_existence = await check_existence_of_data_in_collection_aync(Comment,find_query,{})

	if(parent_existence.success){
		req.decoded["soc_parent_id"] = req.body["soc_parent_id"]
		return next()
	}

	return res.json(parent_existence)
}

module.exports = {check_if_parent_exists_for_sub_comment_with_provided_id}