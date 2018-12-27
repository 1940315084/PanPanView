var max = 7;
var ok = "ok";
var no = "no";
var dba = require("../../../前端培训/项目/PanPanView/PanPanView/server/dba/newsDba.js");
var service = require("../service/newsService.js");


//分页查询
function queryByCutPage(nowpage, cb) {
    var first = (nowpage - 1) * max;
    dba.selectByLimit(first, max, function (news) {
        service.gettotalpage(function (totalpage) {
            news.push({"totalpage": totalpage});
            cb(news);
        });
    });
}

queryByCutPage(1, function (news) {
    console.log(news)
})

//根据总条数获得总页数
function gettotalpage(cb) {
    dba.selectTotalResult(function (totalResultArray) {
        let totalResult = totalResultArray[0].totalResult;
        console.log("totalResult:" + totalResult);//打印共有多少条
        totalpage = Math.ceil(totalResult / max);
        cb(totalpage);
    })
}


//分页查询2
function queryByCutPage2(nowpage2, cb) {
    var first2 = (nowpage2 - 1) * max;
    dba.selectByLimit2(first2, max, function (news2) {
        service.gettotalpage2(function (totalpage2) {
            news2.push({"totalpage2": totalpage2});
            cb(news2);
        });
    });
}

queryByCutPage2(2, function (news2) {
    console.log("news2--------------", news2)
})

//根据总条数获得总页数2
function gettotalpage2(cb) {
    dba.selectTotalResult2(function (totalResultArray2) {
        let totalResult2 = totalResultArray2[0].totalResult2;
        console.log("totalResult2:" + totalResult2);//打印共有多少条
        totalpage2 = Math.ceil(totalResult2 / max);
        cb(totalpage2);
    })
}

gettotalpage2(function (totalResultArray2) {
    console.log("totalpage2-----------", totalpage2)//2
})


//根据id删除新闻
function deleteById(id, cb) {
    dba.deleteById(id, function (affectedRows) {
        cb(affectedRows);
    });
}


//增加新闻
function insert(title, content, variety, image_url, cb) {
    dba.insert(title, content, variety, image_url, function (affectedRows) {
        console.log(affectedRows)
        if (typeof affectedRows == "undefined") {
            //增加失败
            cb(no);
        } else {
            //增加成功
            cb(ok);
        }
    })
}


exports.insert = insert;
exports.deleteById = deleteById;
exports.gettotalpage = gettotalpage;
exports.queryByCutPage = queryByCutPage;
exports.gettotalpage2 = gettotalpage2;
exports.queryByCutPage2 = queryByCutPage2;