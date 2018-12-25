const serviceService = require("../service/serviceService.js");

function getServiceData(req, res) {
	var pagenow = req.query.pagenow;
	serviceService.getServiceData(pagenow, function(serviceArray) {
		res.json(serviceArray);
	});
}

function showTotalPage(req, res) {
	serviceService.showTotalPage(function(totalpage) {
		res.json(totalpage);
	})
}
//
//根据id删除服务信息
function deleteById(req, res) {
	var id = req.query.id;
	serviceService.deleteById(id, function(affectenRows) {
		res.json(affectenRows);
	})
}
//修改部门
function changeService(req, res) {
	var servicename = req.body.servicename;
	var servicecontent = req.body.servicecontent;
	var id = req.body.id;
	serviceService.changeService(id, servicename, servicecontent, function(num) {
		if (num == 1) {
			res.json("ok");
		} else {
			res.json("修改失败");
		}
	})

}
exports.changeService = changeService;
exports.deleteById = deleteById;
exports.showTotalPage = showTotalPage;
exports.getServiceData = getServiceData;
