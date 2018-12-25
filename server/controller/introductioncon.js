const service = require("../service/introductionservice.js");
function showus(req,res){
	service.selectus(function(result){
		res.json(result)
	})
}
function showconnect(req,res){
	service.selectconnect(function(result){
		res.json(result)
	})
}

exports.showus = showus;
exports.showconnect = showconnect;