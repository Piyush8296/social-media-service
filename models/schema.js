/**
  ** mongoDB schema design
  ** author: Piyush
  ** date: 07/07/2021
**/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*appending all the key names with "soc_" to have consistency and to have exact idea that this key is self defined
  and it will also help in having no conflicts if we use third party packages
*/

const comment = {
  "soc_id":{ type:String,index:true },
  "soc_wall_id":{ type:String,index:true }, //user wall id or a post id
  "soc_parent_id":{ type:String,index:true }, // it will be 0 in case or root
  "soc_timestamp":{type: Date, default: Date.now},
  "soc_user":{type:String}, //user ID
  "soc_type":{type:String,index:true}, // parent/child -> for different comments
  "soc_metadata":{
      "soc_text":String,
      "soc_reaction":[], // like/dislike etc... -->array of objects
      "soc_custom":{} //for future if required someday
  }
}

/*
  Reaction sample JSON object
  {"soc_type":"like","soc_user":""}
*/

mongoose.model('Comment',new Schema(comment));
