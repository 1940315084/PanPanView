var dba = require("../dba/productsdba.js");

function select(cb){
	dba.select(function(result){
		console.log(result+'2')
		cb(result)
	})
}
function addproduct(name,message,variety,image_url,cb){
	dba.addproduct(name,message,variety,image_url,function(result){
		
		cb(result)
	})
}

exports.select=select;
exports.addproduct=addproduct;