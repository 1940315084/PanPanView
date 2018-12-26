const userservice = require("../service/userservice.js");
const publicdata = require("../util/publicData.js");

//显示客户信息
function showResult(req,res) {
	//接收view层数据
	var nowpage = req.query.nowpage;
	userservice.selectByCutPage(nowpage, function(userArray){
		console.log("userArray~~~~~~from controller~~~~~~~~~~~~",userArray)
		// res.render('user');
		res.json(userArray);
	});
}

//显示总页数
function showTotalPage(req,res) {
	userservice.getTotlePage(function(totalPage){
		console.log('打印总页数',totalPage);
		res.json(totalPage);
	})
}

//修改客户订单状态

//问题id取不到？
function updateUserOS(req, res) {
	var id = req.body.id;
	var remark = req.body.remark;
	console.log("###################id:",id);
	console.log("##################remark#",remark);//得到了
	if(remark.length>=100) {
		res.json("remark超过100字符了");
	}else {
		userservice.updateState(id,remark, function(num){
			console.log('一共几条？----------------------------------------',num)
			if(num==1) {//修改了1条
			console.log('是不是ok了',publicdata.ok)
				res.json(publicdata.ok);//"ok";
			}else if(num==-1) {//部门名称重复
				res.json("已经是该状态");
			}
		});
	}
}
function loginout(req, res) {
	res.clearCookie('employee');
	res.render("login", {inf:"请先登录"});
}
exports.loginout = loginout;
exports.showResult = showResult;
exports.showTotalPage = showTotalPage;
exports.updateUserOS = updateUserOS;