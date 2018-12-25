const employeeservice = require("../service/employeeservice.js");
employeeservice.employeeRegister("haha",18, "男", "职员", "公关部", "14885263568",  "2018-12-21", "125485", function(result) {
	console.log(result);
});