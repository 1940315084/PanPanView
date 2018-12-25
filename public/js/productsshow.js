var data1 = '';
var data2 = '';

function askpro() {
	console.log("aaaaaa")
	$.ajax({
		url: "/ask",
		type: "get",
		dataType: "json",
		success: function(result) {

			console.log(result.length);
			for (var i = 0; i < result.length; i++) {
				var url = result[i].image_url;
				var name = result[i].name;
				var message = result[i].message;
				var variety = result[i].variety;
				if (variety == 1) {
					data1 += "<div class='media'><div class='media-left'><a href='#'><img src=" + url +
						" style='height:80px;width:80px'></a></div>"
					data1 += "<div class='media-body'><h4 class='media-heading' >" + name + "</h4><p>" + message +
						"</p></div></div>"
				} else if (variety == 2) {
					data2 += "<div class='media'><div class='media-left'><a href='#'><img src=" + url +
						"  style='height:80px;width:80px'></a></div>"
					data2 += "<div class='media-body'><h4 class='media-heading' >" + name + "</h4><p>" + message +
						"</p></div></div>"
				}

			}
			$("#hospital1").html(data1);
			$("#hospital2").html(data2);


		},
		error: function(error) {
			console.log("ajax访问出错")
		}
	});
}
var name,message,variety,image_url
function addshow(){
	$("#add").css("display", "block")
	
	
}
function addproduct() {
	name = $("#name").val()
	message = $("#message").val()
	variety = $("#variety").val()
	image_url = $("#image_url").val()
		if (name == "" || message == "" || variety == "" || image_url == "") {
			alert("请输入完整的产品信息")
		} else {
			$.ajax({
				url: "/addproduct",
				type: "get",
				dataType: "json",
				data: {
					name: name,
					message: message,
					variety: variety,
					image_url: image_url
				},
				success: function(result) {
					alert(result);
					$("#add").css("display", "none")
					askpro();
				},
				error: function(error) {
					console.log("ajax访问出错")
				}
			});
		}
	}
