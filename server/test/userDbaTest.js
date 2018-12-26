var ut = require("../dba/userdba.js");
// ut.selectByLimit(1,1,function (result) {
//     console.log('查询结果如下：',result)
// })
// ut.selectTotlResult(function(totalResultArray){
// 	console.log(totalResultArray)
// })
// ut.updateOrder(4,'预约成功',function(afferected){
// 	console.log('修改信息：',afferected)
// })
ut.checkReExits(4,'预约成功',function(result){
	console.log(result)
})