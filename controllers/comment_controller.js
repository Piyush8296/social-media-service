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

const handle_add_reaction = (req,res)=>{
	const find_query = { "soc_id":req.body["soc_id"] }
	const data_to_update = {
		"$addToSet":{
			"soc_metadata.soc_reaction": {"soc_type":req.body["soc_type"],"soc_user":req.decoded["soc_id"]}
		}
	}

	const alt_query = {}

	update_entry_in_db("adding_reaction_to_comment",Comment,find_query,data_to_update,alt_query,(response)=>{
		res.json(response)
	})
}

//assumption but not handled specifically:- user have his own single wall
const handle_comments_fetch = (req,res)=>{
	const entity_query = [
		{"$match":{"soc_user":req.decoded["soc_id"], "soc_type":"parent"}}, //find all parent comments for a user
		{
		     $lookup:{
		         from: "comments",
		         localField: "soc_id",
		         foreignField: "soc_parent_id",
		         as: "soc_sub_comments"
		    }
	  	}
	]


	Comment.aggregate(entity_query)
	.exec(function(err, info) {
	  	if(info){
	  		if (info.length != 0) {
	  			res.json({success:true, msg:'Data found',data:info});
		  	}else{
				res.json({success:false, msg:'No data found'});
		  	}
		}else{
			console.log(err)
		  	res.json({success:false, msg:'Error fetching annotation data'});
		}
	});
}

const handle_comment_delete = (req,res)=>{
	const find_query = { 
		"$or":[
			{ "soc_id":req.body["soc_id"] }, //for particular comment
			{ "soc_parent_id":req.body["soc_id"] } // for child comments
		] 
	}

	remove_entry_from_db("removing_comment",Comment,find_query,(response)=>{
		res.json(response)
	})
}

module.exports = {handle_add_comment,handle_add_reaction,handle_comments_fetch,handle_comment_delete}