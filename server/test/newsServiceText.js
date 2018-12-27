var newsService = require("../../../前端培训/项目/PanPanView/PanPanView/server/service/newsService.js");


newsService.queryByCutPage(1, function (news) {
    console.log("news:", news)
})

newsService.gettotalpage(function (totalResultArray) {
    console.log("totalpage", totalpage)
})

newsService.deleteById(1, function (affectedRows) {
    console.log(affectedRows)
});