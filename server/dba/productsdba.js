const dbutil = require("../util/sqlUtil.js");
//根据产品种类来查出产品名字,信息以及配置图片的网络地址
function select(cb){
	dbutil.pool.getConnection(function(err,connection){
		if(err){
			throw err;
		}else{
			const sql = 'select name,message,image_url,variety from products '
			connection.query(sql,function(qerr,result){
				connection.release();//释放连接到连接池，连接并没有并闭
				// console.log("1"+result)
			
				cb(result);//把结果回调出去
			})
		}
	})
}
function addproduct(name,message,variety,image_url,cb){
	dbutil.pool.getConnection(function(err,connection){
		if(err){
			throw err;
		}else{
			const sql = 'insert into products (name,message,variety,image_url) values(?,?,?,?)';
			connection.query(sql, [name,message,variety,image_url], function(qerr,result){
				connection.release();//释放连接到连接池，连接并没有并闭
				var a = result.affectedRows;
				cb(a);//把结果回调出去
			})
		}
	})
}

exports.select=select;
exports.addproduct=addproduct;