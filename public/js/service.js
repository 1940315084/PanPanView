$(document).ready(function() {
	ser.init();
});
function service() {
	this.pagenow = 1;
	this.totalPage = 0;
}
var ser = new service();
ser.init = function() {
	$("#showdatacontainer").hide();
	$(".changeServiceMsg").hide();
}
ser.showService = function() {
	$("#showdatacontainer").show();
	ser.showTotalPage();
	ser.showServiceData(ser.pagenow);
}
//获得服务信息
ser.showServiceData = function(pagenow) {
	$.ajax({
		url: "/getServiceData",
		type: "get",
		dataType: "json",
		data: { //请求参数
			pagenow: pagenow
		},
		success: function(serviceArray) {
			var data = "<table class='table table-hover'>";
			data += "<caption>服务信息</caption>";
			data += "<thead><tr><th>序号</th><th>服务名称</th><th>服务信息</th></thead><tbody>";
			for(var i = 0; i < serviceArray.length; i ++) {
				var service = serviceArray[i];
				data += "<tr><td>"+service.servicename+"</td><td>"+service.servicecontent+"</td><td><a href='javascript:ser.deleteById("+service.id+")'>删除</a></td><td><a href='javascript:ser.showChangeService("+service.id+",\""+service.servicename+"\",\""+service.servicecontent+"\")'>修改</a></td></tr>";
			}
			data += "</tbody>";
			data += "</table>";	
			$("#showservicedata").html(data);
			$("#pagenow").html(ser.pagenow); 
			
		},
		error: function(error) {
			console.log("ajax访问出错");
		}
	});
}
//显示总页数
ser.showTotalPage = function() {
	$.ajax({
		url:"/showTotalPage",
		type:"get",
		dataType:"json",
		success:function(totalpage) {
			ser.totalPage = totalpage;
			$("#totalpage").html(ser.totalPage);
		},
		error:function(error){
			console.log("ajax访问出错");
		}
	});
}
//切换页数并刷新
ser.changePage = function(f) {
	$("#pre").addClass("disabled");	
	$("#next").addClass("disabled");
	if(f == "pre") {
		ser.pagenow --;
		if(ser.pagenow <= 1) {
			ser.pagenow = 1;
		}
	}
	else if(f == "next") {
		ser.pagenow ++;
		if(ser.pagenow >= ser.totalPage) {
			ser.pagenow = ser.totalPage;
		}
	}
	if(ser.totalPage == 0 || ser.totalPage == 1) {
		$("#pre").addClass("disabled");	
		$("#next").addClass("disabled");
	}
	else if(ser.totalPage > 1) {
		if(ser.pagenow == 1) {
			$("#next").removeClass("disabled");
		} else if(ser.pagenow > 1 && ser.pagenow < ser.totalPage) {
			$("#next").removeClass("disabled");
			$("#pre").removeClass("disabled");	
		}
		else if(ser.pagenow > 1 && ser.pagenow == ser.totalPage) {
			$("#pre").removeClass("disabled");
		}
	}
	ser.showServiceData(ser.pagenow);
	ser.showTotalPage();
}	
//删除服务信息
ser.deleteById = function(id) {
	$.ajax({
		url:"/deleteById",
		type:"get",
		dataType:"json",
		data: {//请求参数
			id: id
		},
		success:function(affectedRows) {
			if(affectedRows == 1) {
				//删除成功
				ser.pagenow = 1;
				//重新更新页面
				ser.showServiceData(ser.pagenow);
				ser.showTotalPage();
			}
		},
		error:function(error){
			console.log("ajax访问出错");
		}
	});
}
//显示修改界面
ser.showChangeService = function(id, servicename, servicecontent) {
	$(".changeServiceMsg").show();
	$("#updateid").val(id);
	$("#updateName").val(servicename);
	$("#updateRemark").val(servicecontent);
}
//取消修改服务信息
ser.concelDepartment = function() {
	$(".changeServiceMsg").hide();
}
//提交修改信息界面
ser.changeService = function() {
	$.ajax({
		url:"/changeService",
		type:"post",
		dataType:"json",
		data: {//请求参数
			id: $("#updateid").val(),
			servicename: $("#updateName").val(),
			servicecontent: $("#updateRemark").val()
		},
		success:function(result) {
			if(result == "ok") {
				//修改成功
				ser.pagenow = 1;
				//重新更新页面
				console.log("修改成功");
				ser.showServiceData(ser.pagenow);
				ser.showTotalPage();
				$(".change").html("修改成功");
				setTimeout(function() {
					$(".changeServiceMsg").hide();
				},2000);
				
			}
			else {//修改失败
				$(".change").html("修改失败");
			}
		},
		error:function(error){
			console.log("ajax访问出错");
		}
	});
}
// ser.showAboutUs = function() {
// 	$.ajax({
// 		url:"/toIntroduction",
// 		type:"get",
// 		dataType:"json",
// // 		data: {//请求参数
// // 			id: $("#updateid").val(),
// // 			servicename: $("#updateName").val(),
// // 			servicecontent: $("#updateRemark").val()
// // 		},
// 		success:function(result) {
// 			console.log("请求成功");
// // 			if(result == "ok") {
// // 				//修改成功
// // 				ser.pagenow = 1;
// // 				//重新更新页面
// // 				console.log("修改成功");
// // 				ser.showServiceData(ser.pagenow);
// // 				ser.showTotalPage();
// // 				$(".change").html("修改成功");
// // 				setTimeout(function() {
// // 					$(".changeServiceMsg").hide();
// // 				},2000);
// // 				
// // 			}
// // 			else {//修改失败
// // 				$(".change").html("修改失败");
// // 			}
// 		},
// 		error:function(error){
// 			console.log("ajax访问出错");
// 		}
// 	});
// }