var dt = require("../../../前端培训/项目/PanPanView/PanPanView/server/dba/newsDba.js");

dt.selectByLimit(0, 8, function (news) {//取1~6条测试
    console.log(news)
});

dt.selectTotalResult(function (totalResultArray) {
    console.log(totalResultArray)
});

dt.deleteById(1, function (affectedRows) {
    console.log(affectedRows)
})
dt.insert(2, 2, function (result) {
    console.log(result)
})