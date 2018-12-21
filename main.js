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