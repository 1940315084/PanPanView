function isLogin() {
	var username = document.getElementsByClassName("text")[0];
	var password = document.getElementsByClassName("password")[0];
	var tips = document.getElementsByClassName('tips')[0];
	if(username.value == "" || password.value == "") {
		tips.style.display = block;
		username.value = "";
		password.value = "";
	} else if(username.value.trim().length > 11 || password.value.trim().length > 16) {
		tips.style.display = block;
		username.value = "";
		password.value = "";
	} else {
		$.ajax({
			url:"/employeeLogin",
			type:"post",
			dataType:"json",
			data: {//请求参数
				username: username,
				password: password
			}
			success:function(totalpage) {
				
			},
			error:function(error){
				console.log("ajax访问出错");
			}
		});
	}
}