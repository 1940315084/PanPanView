const employeedba = require("../dba/employeedba.js");
// employeedba.selectByNoAndPwd("18456234587", "123456789", function(result) {
// 	console.log(result);
// });ccc
//name, age, sex, position, department, username, starttime, password
employeedba.employeeRegister("haha",18, "男", "职员", "公关部", "14885263568",  "2018-12-21", "125485", function(result) {
	console.log(result);
})