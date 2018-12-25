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


var productscon = require('./server/controller/productscon.js');
var introductioncon = require('./server/controller/introductioncon.js')

app.get("/*", function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/") {
		res.render('products')
	}else if (pathname =='/ask'){
		productscon.show(req, res)
	}else if (pathname == '/aboutus'){
		introductioncon.showus(req,res)
	}else if (pathname == "/connectus"){
		introductioncon.showconnect(req,res)
	}else if (pathname =="/addproduct"){
		productscon.addproduct(req,res)
	}
		
});

//post方式打开
app.post("/*", function(req, res) {
	var pathname = url.parse(req.url).pathname;
	if(pathname == "/employeeLogin") {
		employeecontrol.employeelogin(req, res);
	}
});
app.listen(9999, function() {
	console.log("服务器正在监听中");
});

