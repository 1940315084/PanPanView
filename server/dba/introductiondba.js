const dbutil = require("../util/sqlUtil.js");
//根据产品种类来查出产品名字,信息以及配置图片的网络地址
function selectus(cb){
	dbutil.pool.getConnection(function(err,connection){
		if(err){
			throw err;
		}else{
			const sql = 'select name,content from aboutus '
			connection.query(sql,function(qerr,result){
				connection.release();//释放连接到连接池，连接并没有并闭
				// console.log("1"+result)
			
				cb(result);//把结果回调出去
			})
		}
	})
}
function selectconnect(cb){
	dbutil.pool.getConnection(function(err,connection){
		if(err){
			throw err;
		}else{
			const sql = 'select address,phone,fax,email,enumber,web from connect '
			connection.query(sql,function(qerr,result){
				connection.release();//释放连接到连接池，连接并没有并闭
				
			
				cb(result[0]);//把结果回调出去
			})
		}
	})
}

exports.selectus=selectus;
exports.selectconnect=selectconnect;