const express = require("express");
const ejs = require("ejs");
const app = express();
//设置ejs
app.set("view engine","html");
app.engine(".html",require("ejs").__express);
//设置视图
app.set("views",__dirname+"/views");
//设置静态资源
app.use(express.static(__dirname+"/public"));
//设置处理post请求参数
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
const url = require("url");
//导入cookie-parser模块
const cookieParser = require("cookie-parser");
//express注入cookie-parser
app.use(cookieParser("1525822sad"));//盐
const employeecontrol = require("./server/controller/employeecontrol.js");
const servicecontrol = require("./server/controller/serviceControl.js");
const productscon = require("./server/controller/productscon.js");
const introductioncon = require("./server/controller/introductioncon.js");
const usercontroller = require("./server/controller/usercontroller.js");
app.get("/*", function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/") {
		// console.log("hahah")
		employeecontrol.tomain(req, res);
	} else if(pathname == "/toregister") {
		res.render("register");
	} else if(pathname == "/getServiceData") {
		servicecontrol.getServiceData(req, res);
	} else if(pathname == "/deleteById") {
		servicecontrol.deleteById(req, res);
	} else if(pathname == "/changeService") {
		servicecontrol.changeService(req, res);
	} else if(pathname == "/showTotalPage") {
		servicecontrol.showTotalPage(req, res);
	} else if(pathname == "/toProducts") {
		// console.log("===" + req.signedCookies.employee.username);
		res.render("products", {name: req.signedCookies.employee.username});
	} else if(pathname == "/ask") {
		productscon.show(req, res);
	} else if(pathname == "/addproduct") {
		productscon.addproduct(req, res);
	} else if(pathname == "/productsreturn") {
		res.render("service");
	} else if(pathname == "/tointroduction") {
		res.render("introduction", {name: req.signedCookies.employee.username});
	} else if(pathname == "/aboutus") {
		introductioncon.showus(req, res);
	} else if(pathname == "/connectus") {
		introductioncon.showconnect(req, res);
	} else if(pathname == "/loginout") {
		employeecontrol.loginout(req, res);
	} else if(pathname == "/tohome") {
		res.render("service", {name: req.signedCookies.employee.username});
	} else if(pathname == "/showUser") {
		usercontroller.showResult(req,res);
	} else if(pathname == "/showTotalPage") {
		usercontroller.showTotalPage(req,res);
	} else if(pathname == "/touser") {
		// console.log("===" + req.signedCookies.employee.username);
		res.render('user', {name: req.signedCookies.employee.username});
	}
});
//post方式打开
app.post("/*", function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/employeeLogin") {
		employeecontrol.employeeLogin(req, res);
	} else if(pathname == "/employeeRegister") {
		employeecontrol.employeeRegister(req, res);
	} else if(pathname == "/updateOS") {
		usercontroller.updateUserOS(req,res);
	}
});

app.listen(9999, function() {
    console.log("服务器正在监听中");
});