const userdba = require("../dba/userdba.js");
const publicData = require("../util/publicData.js");
const max = publicData.max;

//分页查询
function selectByCutPage(pagenow,cb){
	var first = (pagenow - 1)*max;
	userdba.selectByLimit(first,max,function(userArray){
		getTotlePage(function(totalPage){
		userArray.push({totalPage:totalPage});
		cb(userArray);//[object Object],[object Object]
		});
		
	});

}

//得到总页数  //根据每页显示的最大条数得到总页数
function getTotlePage(cb){
	userdba.selectTotlResult(function(totalResultArray){
		let totalResult = totalResultArray[0].totalResult;
		console.log("totalResult:",totalResult);//总条数
		totalPage = Math.ceil(totalResult / max) ; //总页数
		cb(totalPage);
		
	})
}

//修改客户订单状态
function updateState(id, remark, cb) {
	userdba.checkReExits(id,remark, function(result){
		//reslult--[{num:1}]
		var num = result[0].num;
		if(num==0) {//没有重复的
			userdba.updateOrder(id, remark, function(affectedRows){//修改
				cb(affectedRows);
			});
		}else if(num>0){//有重复的
			cb(-1);
			console.log('订单已经处于该状态')
		}
	});
}

exports.selectByCutPage = selectByCutPage;
exports.getTotlePage = getTotlePage;
exports.updateState = updateState;


