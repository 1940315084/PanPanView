const employeeservice = require("../service/employeeservice.js");
//判断是否登录得到相应的跳转
function tomain(req, res) {
	if("employee" in req.signedCookies) {
		//登陆过
		res.render("service", {name: req.signedCookies.employee.username});
		console.log( req.signedCookies.employee.username);
	}
	else {
		res.render("login", {inf:"请先登录"});
	}
}
function employeeLogin(req, res) {
	var username = req.body.username.trim();
	var password = req.body.password.trim();
	if(username == "" || password == "") {
		res.render("login", {inf: "用户名或者密码不能为空"});
	} else if(username.length > 11 || password.length > 16 || password.length < 8) {
		res.render("login", {inf: "用户名为11位数字，密码为11-16位字符"});
	} else {
		employeeservice.employeeLogin(username, password, function(result) {
			if(result.length == 1) {//登陆成功
				res.cookie("employee", result[0], {signed: true});
				res.render("service",{name: result[0].username});
			}
			else {//登录失败
				res.render("login", {inf:"用户名或者密码错误"});
			}
		})
	}
}
function employeeRegister(req, res) {
	var name = req.body.name;
	var age = req.body.age;
	var sex = req.body.sex;
	var position = req.body.position;
	var department = req.body.department;
	var username = req.body.username;
	var starttime = req.body.starttime;
	var password = req.body.password;
	// console.log(name, age, sex, position, department, username, starttime, password);
	employeeservice.employeeRegister(name, age, sex, position, department, username, starttime, password, function(result) {
		if(result.affectedRows == 1) {
			console.log("注册成功");
			res.json("注册成功");
		} else {
			res.json("注册失败");
		}
	});
}//ss
function loginout(req, res) {
	res.clearCookie('employee');
	res.render("login", {inf:"请先登录"});
}
exports.loginout = loginout;
exports.employeeRegister = employeeRegister;
exports.tomain = tomain;
exports.employeeLogin = employeeLogin;