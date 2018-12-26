function askintroction() {
	$.ajax({
		url: "/aboutus",
		type: "get",
		dataType: "json",
		success: function(result) {
			var data1 = '';
			for (var i = 0; i < result.length; i++) {
				var content = result[i].content;
				var name = result[i].name;
				data1 += "<div class='media'><div class='media-body'><h4 class='media-heading'>" + name + ":</h4><p>" + content +
					"</p></div></div>"
			}
			$("#us").html(data1);
		},
		error: function(error) {
			console.log("ajax访问出错")
		}
	});
}
function askaddress() {
	// console.log("aaaaaaaaa")
	$.ajax({
		url: "/connectus",
		type: "get",
		dataType: "json",
		success: function(result) {
			var address = result.address
			var phone = result.phone
			var fax = result.fax
			var email = result.email
			var enumber = result.enumber
			var web = result.web
			var data = "<div class='media'><div class='media-body'>"
			data += "<p><span>地址：</span>" + address + "</p>"
			data += "<p><span>电话：</span>" + phone + "</p>"
			data += "<p><span>传真：</span>" + fax + "</p>"
			data += "<p><span>邮箱：</span>" + email + "</p>"
			data += "<p><span>邮编：</span>" + enumber + "</p>"
			data += "<p><span>网址：</span>" + web + "</p>"
			data += "<div></div>"
			$("#address").html(data);
		},
		error: function(error) {
			console.log(error)
		}
	});
}
function productsreturn() {
	window.location.href = "http://localhost:9999";
}