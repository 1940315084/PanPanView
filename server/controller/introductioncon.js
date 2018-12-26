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
function loginout(req, res) {
	res.clearCookie('employee');
	res.render("login", {inf:"请先登录"});
}
 exports.loginout = loginout;
exports.showus = showus;
exports.showconnect = showconnect;