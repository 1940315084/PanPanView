const service = require("../service/newsService.js");
const max = 7;


function show(req, res) {
    //接受view层的数据
    var nowpage = req.query.nowpage;
    console.log("nowpage", nowpage)
    service.queryByCutPage(nowpage, function (news) {
        console.log("news=====", news)
        res.json(news);
    });
}

//显示总页数
function showTotalPage(req, res) {
    service.gettotalpage(function (totalpage) {
        console.log(totalpage);
        res.json(totalpage);
    });
}


function show2(req, res) {
    //接受view层的数据
    var nowpage2 = req.query.nowpage2;
    console.log("nowpage2", nowpage2)
    service.queryByCutPage2(nowpage2, function (news2) { //nowpage2还没有获取到
        console.log("news2=====", news2)
        res.json(news2);
    });
}

//显示总页数2
function showTotalPage2(req, res) {
    service.gettotalpage2(function (totalpage2) {
        console.log(totalpage2);
        res.json(totalpage2);
    });
}


//根据id删除新闻
function deleteById(req, res) {
    var id = req.query.id;
    service.deleteById(id, function (affectedRows) {
        res.json(affectedRows);
    });
}


//增加

function add(req, res) {
    var title = req.query.title;
    var content = req.query.content;
    var variety = req.query.variety;
    var image_url = req.query.image_url;
    service.insert(title, content, variety, image_url, function (r) {
        res.json(r);
    })
}

exports.add = add;
exports.deleteById = deleteById;
exports.show = show;
exports.showTotalPage = showTotalPage;
exports.show2 = show2;
exports.showTotalPage2 = showTotalPage2;
