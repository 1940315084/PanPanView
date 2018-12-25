const dbutil = require("../util/sqlUtil.js");
//根据username和pwd查询employee
function selectByNoAndPwd(username, password, cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query("select id,username,password from employee where username=? and password=?", [username, password], function(err, employee) {
			cb(employee);
			connection.release();//释放连接到连接池，连接并没有并闭
		});
	});
}
function employeeRegister(name, age, sex, position, department, username, starttime, password, cb) {
	dbutil.pool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query("insert into employee (name,age,sex,position,department,username,starttime,password) values(?,?,?,?,?,?,?,?)", [name,age,sex,position,department,username,starttime,password], function(err, result) {
			cb(result);
			connection.release();//释放连接到连接池，连接并没有并闭
		});
	});
}
exports.employeeRegister = employeeRegister;
exports.selectByNoAndPwd = selectByNoAndPwd;  