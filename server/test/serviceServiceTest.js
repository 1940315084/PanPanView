const serviceService = require("../service/serviceService.js");
serviceService.getServiceData(1, function(result) {
	console.log(result);
})//s