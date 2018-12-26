const service = require("../service/productsservice.js");
//请求数展示产品
function show(req,res){
	service.select(function(result){
		res.json(result)
	})
}
//添加产品
function addproduct(req,res){
	var name =req.query.name;
	var message =req.query.message;
	var variety =req.query.variety;
	var image_url =req.query.image_url;
	service.addproduct(name,message,variety,image_url,function(result){
		if(result==1){
			res.json("添加成功")
		}else {
			res.json("添加失败")
		}
	})
}
function loginout(req, res) {
	res.clearCookie('employee');
	res.render("login", {inf:"请先登录"});
}
 exports.loginout = loginout;
exports.show = show;
exports.addproduct = addproduct;