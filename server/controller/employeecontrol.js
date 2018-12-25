const employeeservice = require("../service/employeeservice.js");
//判断是否登录得到相应的跳转
function tomain(req, res) {
	if("employee" in req.signedCookies) {
		//登陆过
		res.render("service", req.signedCookies.employee);
	}
	else {
		res.render("login");
	}
}
//登录
function employeelogin(req, res){
	var username = req.body.username.trim();
	var password = req.body.password.trim();
	if(username == "" || password == "") {
		res.render("login", {inf: "用户名或者密码不能为空"});
	} else if(username.length > 11 || password.length > 16 || username.length < 11) {
		res.render("login", {inf: "用户名为11位数字，密码为11-16位字符"});
	} else {
		employeeservice.employeeLogin(username, password, function(employee) {
				if(employee.length == 1) {//登陆成功
					res.cookie("employee", employee[0],{signed: true});
					res.render("service");
					// res.json("0");
					console.log("hahah")
				}
				else {//登录失败
					res.render("login",{inf: "用户名为11位数字，密码为11-16位字符"});
					// res.json("1");
				}
			});
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
	employeeservice.employeeRegister(name, age, sex, position, department, username, starttime, password, function(result) {
		if(result.affectedRows == 1) {
			// res.render("login" );
			res.json("注册成功");
		} else {
			res.json("注册失败");
		}
	})
}
exports.employeeRegister = employeeRegister;
exports.tomain = tomain;
exports.employeelogin = employeelogin;