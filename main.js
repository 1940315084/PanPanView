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
const serviceControl = require("./server/controller/serviceControl.js");
app.get("/*", function(req, res) { 
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/") {
		employeecontrol.tomain(req, res);
	} else if(pathname == "/toregister") {
		res.render("register");
	} else if(pathname == "/getServiceData") {
		serviceControl.getServiceData(req, res);
	} else if(pathname == "/showTotalPage") {
		serviceControl.showTotalPage(req, res);
	} else if(pathname == "/deleteById") {
		serviceControl.deleteById(req, res);
	} else if(pathname == "/toIntrodution") {
		res.render("introduction");
	}
});

//post方式打开
app.post("/*", function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/employeeLogin") {
		employeecontrol.employeelogin(req, res);
	} else if(pathname == "/employeeRegister"){
		employeecontrol.employeeRegister(req, res);
	} else if(pathname == "/changeService") {
		serviceControl.changeService(req, res);
	}
});

app.listen(9999, function() {
    console.log("服务器正在监听中");
});