const serviceDba = require("../dba/serviceDba.js");
const publicdata = require("../util/publicData.js")

function getServiceData(pagenow, cb) {
	var first = (pagenow - 1) * 5;
	serviceDba.getServiceData(first, publicdata.max, function(serviceArray) {
		cb(serviceArray);
	});
}
//ss
//根据每页显示的最大条数显示总页数
function showTotalPage(cb) {
	serviceDba.showTotalPage(function(totalCountResult) {
		var totalpage = Math.ceil(totalCountResult[0].totalCount / publicdata.max);
		cb(totalpage);
	});
}//s
//根据id删除服务信息
function deleteById(id, cb) {
	serviceDba.deleteById(id, function(affectedRows) {
		cb(affectedRows);
	});
}
//修改服务信息
function changeService(id, servicename, servicecontent, cb) {
	serviceDba.changeService(id, servicename, servicecontent, function(result) {
		cb(result);
	});
}
exports.changeService = changeService;
exports.deleteById = deleteById;
exports.showTotalPage = showTotalPage;
exports.getServiceData = getServiceData;
