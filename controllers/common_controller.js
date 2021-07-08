const save_entry_in_db = (entry_label,entry,callback)=>{
	console.log(`${entry_label} - save_entry()`)

	entry.save(function(error_saving_entry){
        if(error_saving_entry){
        	console.log(error_saving_entry)
            callback({success:false, msg:"Error saving details"});
        }else{
            callback({success: true, msg: 'Saved successfully'});
        }
    });
}

const update_entry_in_db = (entry_label,entry,query,data_to_update,alt_query,callback)=>{
	console.log(`${entry_label} - update_entry()`)

	entry.update(
	 	query, 
	 	data_to_update,
	 	alt_query,
	 	function(err,resp) {
		 	if (err) {
		 		console.log(err)
				callback({success:false, msg:'Error: updating the data'});
		 	}else{
		 		console.log(resp)
		 		if(resp["n"] != 0){
		 			callback({success:true, msg: 'Updated Successfully'});
		 		}else{
		 			callback({success:false,msg:'No data updated with provided details'})		
		 		}
		 	}
		}
	);
}

const remove_entry_from_db = (entry_label,entry,query,callback)=>{
	console.log(`${entry_label} - remove_entry()`)

	entry.remove(query,function(err,response){
		if(err){
			console.log(err)
			callback({success:false,msg:'Error while removal'});
		}else{
			callback({success:true,msg:'Removal successfull'});
		}
		
	});
}

const check_existence_of_data_in_collection_aync = async(collection_name, json_query_1 ,json_query_2)=>{
	try {
		let records = await collection_name.find(json_query_1,json_query_2);

		if(records && records.length >0){
			return {success:true,msg:"Records Found",data:records}
		}else{
			return {success:false,msg:"No Records Found",data:[]}
		}
		
	} catch (err) {
	    console.error(err);
	    return {success:false,msg:"Something went wrong"}
	}
}

module.exports = {save_entry_in_db,update_entry_in_db,remove_entry_from_db,check_existence_of_data_in_collection_aync}