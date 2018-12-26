const ust = require("../service/userservice.js");
ust.updateState(1,'取单',function(aff){
	console.log('修改的结果是',aff)
	//返回-1 表示已经存在 不需要改  如果返回1 就表示修改成功
})