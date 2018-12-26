const employeedba = require("../dba/employeedba.js");
function employeeLogin(username,password,cb) {
	employeedba.selectByNoAndPwd(username,password, function(employee) {
		cb(employee);
	});
}
function employeeRegister(name, age, sex, position, department, username, starttime, password, cb) {
	console.log(name, age, sex, position, department, username, starttime, password);

	employeedba.employeeRegister(name, age, sex, position, department, username, starttime, password, function(result) {
		cb(result);
	});
}//ss
exports.employeeRegister = employeeRegister;
exports.employeeLogin = employeeLogin;