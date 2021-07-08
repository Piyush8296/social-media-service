const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const config = require('../config');

const {
		save_entry_in_db,update_entry_in_db,remove_entry_from_db
	} = require("./common_controller.js")

const Comment = mongoose.model('Comment');

const handle_add_comment = (req,res)=>{
	let entity = new Comment()

	entity["soc_id"] = uuidv4(); 
	entity["soc_wall_id"] = req.body["soc_wall_id"];
	entity["soc_parent_id"] = req.decoded["soc_parent_id"];
	entity["soc_timestamp"] = Date.now();
	entity["soc_user"] = req.decoded["soc_id"];
	entity["soc_type"] = req.body["soc_type"];
	entity["soc_metadata"] = {
		"soc_text":req.body["soc_metadata"]["soc_text"],
		"soc_reaction":[],
		"soc_custom":{}
	};

	save_entry_in_db('new_comment',entity,(response)=>{ 
    	if(response.success){
    		res.json({success: true, msg: 'Created Successfully'});
    	}else{
    		res.json(response)
    	}
    })
}

module.exports = {handle_add_comment}