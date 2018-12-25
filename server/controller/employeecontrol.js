


//判断是否登录得到相应的跳转
function tomain(req, res) {
	if("employee" in req.signedCookies) {
		//登陆过
		res.render("main", req.signedCookies.employee);
	}
	else {
		res.render("login", {inf:"请先登录"});
	}
}