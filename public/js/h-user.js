$(document).ready(function(){
	user.init();
});
function User() {
	this.totalPage=0;//总页数
	this.nowpage=1;//当前页
}
var user = new User();
user.init = function() {
	$("#userUpdateView").hide();
}
user.clickShow = function(){
	$("#userButton").hide();
	$("#userUpdateView").hide();
	user.showUsers(user.nowpage);

}
//显示当前页和总页数
user.showPage = function(nowpage, totalpage) {
	$("#nowpagesp").html(nowpage);
	$("#totalpagesp").html(totalpage);
}

//显示上一页下一页的按钮处理
user.showPreNextBtn = function(nowpage, totalPage) {
	$("#preli").addClass("disabled");//设置上一页不可点
	$("#nextli").addClass("disabled");//设置下一页不可点
	if(totalPage==0 || totalPage==1) {
		$("#preli").addClass("disabled");//设置上一页不可点
		$("#nextli").addClass("disabled");//设置下一页不可点
	}else if(totalPage>1) {
		if(nowpage==1) {//上一页不可点，下一页可点
			$("#nextli").removeClass("disabled"); 
		}else if(nowpage>1 && nowpage<totalPage) {//都可点
			$("#preli").removeClass("disabled");
			$("#nextli").removeClass("disabled");
		}else if(nowpage>1 && nowpage==totalPage) {//上一页可点， 下一页不可点，因为是最后一页
			$("#preli").removeClass("disabled");
		}
	}
}
user.changePage=function(flag) {
	if(flag=="pre") {//点击上一页
		user.nowpage--;
	}else if(flag=="next") {//点击下一页
		user.nowpage++;
	}
	user.showUsers(user.nowpage);
}

//分页显示客户信息
user.showUsers = function(nowpage) {
	$.ajax({
		url: "/showUser",
		type: "get",
		data: { //请求参数
			nowpage: nowpage
		},
		dataType: "json",
		success: function(userArray) {
			var data = "<h2>用户模块</h2>";
			data += "<table class='table table-hover'>";																																																				
			data += "<thead><tr><th>id</th><th>username</th><th>sex</th><th>telphone</th><th>address</th><th>buyproduct</th><th>eyestate</th><th>remark</th><th colspan ='2'>操作</th></tr></thead>";
			data += "<tbody>";
			for (var i = 0; i < userArray.length-1; i++) {																																																												
				var users = userArray[i];																											
				data += "<tr><td>" + users.id + "</td><td>" + users.username + "</td><td>" + users.sex +"</td><td>"+users.telphone+"</td><td>"+users.address+"</td><td>"+users.buyproduct+"</td><td>"+users.eyestate+"</td><td>"+users.remark+"</td><td><a href='javascript:user.updateView(" + users.id + ",\""+users.remark +"\")'>修改订单状态</a></td>"
			}
			data += "</tbody>";
			data += "</table>";
			$("#userdata").html(data);
			user.totalPage = userArray[userArray.length-1].totalPage;//总数数
			console.log("totalPage……",user.totalPage)
			user.nowpage = nowpage;//当前页
			//显示当前页和总页数
			user.showPage(user.nowpage, user.totalPage);
			//上一页，下一页按钮显示处理
			user.showPreNextBtn(user.nowpage, user.totalPage);
			console.log("ajax请求成功 等待数据……")

		},
		error: function(error) {
			console.log("ajax访问出错", error.message)
		}
	});
}

//修改客户数据界面
user.updateView = function(id,remark) {
	$("#userUpdateView").css("width", "500px");
	$("#userUpdateView").css("height", "200px");
	$("#userUpdateView").css("display", "block");
	$("#userUpdateView").css("backgroundColor", "rgba(255,0,0,0.4)");
	$("#userUpdateView").css("position", "fixed");
	$("#userUpdateView").css("top", "100px");
	$("#userUpdateView").css("left", "300px");
	$("#userUpdateView").css("textAlign", "center");
	$("#userUpdateView").css("paddingTop", "50px");
	$("#putremark").val(remark);
	$("#getid").val(id);

}
//取消修改的界面
user.cancleUpdateView = function() {
	$("#userUpdateView").css("display","none");
}
//修改订单状态 ajax
user.updateRemark = function(){
	var getvalue = $("#putremark").val();
	var getid = $("#getid").val();
	console.log('获取到输入框中的值',getvalue);
	console.log('获取到id值',getid);
	$.ajax({
		url: "/updateOS",
		type: "post",
		data:{
			id: getid,
			remark: getvalue,
		},
		dataType: "json",
		success: function(state) {
			console.log(state,'请求成功')
			if(state=="ok") {//修改成功
				$("#updateinf").html("修改成功");
				$("#updateinf").css("color","green");
				user.showUsers(user.nowpage);
				$("#getvalinput").val(getvalue);

			}else {//修改失败
				$("#updateinf").html(state);
				$("#updateinf").css("color","red");
			}

		},
		error: function(error) {
			console.log("修改的ajax访问出错", error.message)
		}
	})
	console.log('点击成功')
	console.log("remark我修改了的",getvalue)
}



	
		



		
			
			
		
		