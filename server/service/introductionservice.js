var dba = require("../dba/introductiondba.js");
function selectus(cb){
	dba.selectus(function(result){
		cb(result)
	});
}
function selectconnect(cb){
	dba.selectconnect(function(result){
		cb(result)
	})
}
exports.selectconnect=selectconnect;
exports.selectus=selectus;