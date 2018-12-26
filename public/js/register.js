$(document).ready(function() {
	regem.init();
});
function resemployee() {
	this.name = "";
	this.age = "";
	this.sex = "";
	this.department = "";
	this.position = "";
	this.starttime = "";
	this.username = "";
	this.password = "";
}
var regem = new resemployee();
regem.init = function() {
	$(".departmentspan").css("opacity","0");
	$(".positionspan").css("opacity","0");
	$(".repasswordspan").css("opacity","0");
	$(".usernamespan").css("opacity","0");
	$(".passwordspan").css("opacity","0");
	$(".showmsg").hide();

}//
regem.register = function() {
	this.name = $(".name")[0].value;
	this.age = $(".age")[0].value;
	this.sex = $("#sex option:selected").text();
	this.department = $("#department option:selected").text();
	this.position = $("#position option:selected").text();
	this.starttime = $("#starttime").val();
	this.username = $(".username")[0].value.trim();
	this.password = $(".password")[0].value.trim();
	this.repassword = $(".repassword")[0].value.trim();
	if(this.name == "undefined" || this.name == "") {
		$("#name").value = "姓名（不能为空）";
	}
	if(this.age == "undefined" || this.age == "") {
		$("#age").value = "年龄（不能为空）";
	}
	if(this.sex == "undefined" || this.sex == "") {
		$("#sex").value = "性别（不能为空）";	
	}
	if(this.department == "部门" || this.department == "") {
		$(".departmentspan").css("opacity","1");
	}
	if(this.position == "职位" || this.position == "") {
		$(".positionspan").css("opacity","1");
	}
	if(this.starttime == "undefined" || this.starttime == "") {
		$("#starttime").value = "入职时间（不能为空）";
	}
	if(this.username == "undefined" || this.username == "") {
		$("#username").value = "用户名（不能为空）";
		$(".usernamespan").css("opacity","1");
	}
	if(this.password == "undefined" || this.password == "") {
		$("#password").value = "密码（不能为空）";
	}
	if(this.repassword == "undefined" || this.repassword == "") {
		$("#repassword").value = "确认密码（不能为空）";
		$(".passwordspan").css("opacity","1");
	}
	if(this.password != this.repassword) {
		$(".repasswordspan").css("opacity","1");
	}
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.username))) {
		$("#username").value = "用户名格式不正确，请重新输入";
		$(".usernamespan").css("opacity","1");
		$(".usernamespan").value = "用户名格式不正确，请重新输入";
	}
	if(!$("#checkbox1").is(':checked')) {
		$(".checkbox-custom>label").css("color", "red");
	}
	if(this.password.length <= 16 && this.password.length >= 6 ) {
		if( this.username.trim().length == 11) {
			$.ajax({
				url: "/employeeRegister",
				type: "post",
				dataType: "json",
				data: { //请求参数
					name: this.name,
					age: this.age,
					sex: this.sex,
					department: this.department,
					position: this.position,
					starttime: this.starttime,
					username: this.username,
					password: this.password
				},
				success: function(result) {
					if(result == "注册成功") {
						$(".showmsg").show();
						$(".departmentspan").css("opacity","0");
						$(".positionspan").css("opacity","0");
						$(".repasswordspan").css("opacity","0");
						$(".usernamespan").css("opacity","0");
						$(".passwordspan").css("opacity","0");
						$(".checkbox-custom>label").css("color", "#000");
						setTimeout(function() {
							$(".showmsg").hide();		
						},2000);
					} else if(result == "注册失败") {
						$(".showmsg").show();
						$(".showmsg")[0].value = "注册失败,请重新注册";
					}
				
					
				},
				error: function(error) {
					console.log("ajax访问出错");
				}
			});
		} else {
			$(".usernamespan").css("opacity","1");
			
		}
	} else {
		$(".passwordspan").css("opacity","1");
	}
	
}