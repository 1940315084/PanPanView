$(document).ready(function () {
    $("#news_add").hide();
    news.showNews(news.nowpage);
    news.showNews2(news.nowpage2);
});

function News() {
    this.totalpage = 0; //总页数
    this.nowpage = 1; //当前页
    this.totalpage2 = 0; //总页数
    this.nowpage2 = 1; //当前页
}

var news = new News();

//显示当前页和总页数
news.showpage = function (nowpage, totalpage) {
    $("#nowpagespan").html(nowpage);
    $("#totalpagespan").html(totalpage);
}
//显示当前页和总页数
news.showpage2 = function (nowpage2, totalpage2) {
    $("#nowpagespan2").html(nowpage2);
    $("#totalpagespan2").html(totalpage2);
}
//上一页下一页
news.changePage = function (flag) {
    if (flag == "pre") { //点击上一页
        news.nowpage--;
    } else if (flag == "next") { //点击下一页
        news.nowpage++;
    }
    if (news.totalpage == 0 || news.totalpage == 1) {
        $(".prepage").attr("disabled", true);
        $(".nextpage").attr("disabled", true);
    } else if (news.nowpage == 1) {
        $(".nextpage").attr("disabled", false);
        $(".prepage").attr("disabled", true);
    } else if (news.nowpage == news.totalpage) {
        $(".prepage").attr("disabled", false);
        $(".nextpage").attr("disabled", true);
    } else {
        $(".prepage").attr("disabled", false);
        $(".nextpage").attr("disabled", false);
    }
    news.showNews(news.nowpage);
}

//上一页下一页2
news.changePage2 = function (flag2) {
    if (flag2 == "pre2") { //点击上一页
        news.nowpage2--;
    } else if (flag2 == "next2") { //点击下一页
        news.nowpage2++;
    }
    if (news.totalpage2 == 0 || news.totalpage2 == 1) {
        $(".prepage2").attr("disabled", true);
        $(".nextpage2").attr("disabled", true);
    } else if (news.nowpage2 == 1) {
        $(".nextpage2").attr("disabled", false);
        $(".prepage2").attr("disabled", true);
    } else if (news.nowpage2 == news.totalpage2) {
        $(".prepage2").attr("disabled", false);
        $(".nextpage2").attr("disabled", true);
    } else {
        $(".prepage2").attr("disabled", false);
        $(".nextpage2").attr("disabled", false);
    }
    news.showNews2(news.nowpage2);
}


//分页显示部门
news.showNews = function (nowpage) {
    $.ajax({
        url: "/showNews",
        type: "get",
        data: { //请求参数
            nowpage: nowpage,
        },
        dataType: "json",
        success: function (newsArray) {
            console.log("newsArray", newsArray);
            var data = "<div class='media'>";
            for (var i = 0; i < newsArray.length - 1; i++) {
                var newz = newsArray[i];
                console.log(newz)
                data += "<div class='media-left'>";
                data += "<a href='#'>";
                data += "<img src=" + newz.image_url + ">";
                data += "</a>";
                data += "</div>";
                data += "<div class='media-body'>";
                data += "<h4 class='media-heading'>" + newz.title + "</h4>";
                data += "<p>" + newz.content + "</p>";
                data += "</div>";
                data += "<div style='text-align: center;'>";
                data += "<button class='btn btn-outline-primary btn-lg del1' style='margin: 5px 20px;' onclick='news.deleteById(" + newz.id + ")'>删除此条新闻</button>";
                data += "</div>";
            }
            data += "<div class='clearfix'> </div>";
            data += "</div>"
            console.log(data)
            $("#newstable").html(data);

            news.nowpage = nowpage;
            news.totalpage = newsArray[newsArray.length - 1].totalpage; //总数
            console.log(news.nowpage + "/" + news.totalpage)
            news.showpage(news.nowpage, news.totalpage)

        },
        error: function (error) {
            console.log("ajax访问出错", error.message)
        }
    });
}

//分页显示部门
news.showNews2 = function (nowpage2) {
    $.ajax({
        url: "/showNews2",
        type: "get",
        data: { //请求参数
            nowpage2: nowpage2,
        },
        dataType: "json",
        success: function (newsArray2) {
            console.log("newsArray2", newsArray2);
            var data2 = "<div class='media'>";
            for (var i = 0; i < newsArray2.length - 1; i++) {
                var newz2 = newsArray2[i];
                console.log(newz2)
                data2 += "<div class='media-left'>";
                data2 += "<a href='#'>";
                data2 += "<img src=" + newz2.image_url + ">";
                data2 += "</a>";
                data2 += "</div>";
                data2 += "<div class='media-body'>";
                data2 += "<h4 class='media-heading'>" + newz2.title + "</h4>";
                data2 += "<p>" + newz2.content + "</p>";
                data2 += "</div>";
                data2 += "<div style='text-align: center;'>";
                data2 += "<button class='btn btn-outline-primary btn-lg del1' style='margin: 5px 20px;' onclick='news.deleteById(" + newz2.id + ")'>删除此条新闻</button>";
                data2 += "</div>";
            }
            data2 += "<div class='clearfix'> </div>";
            data2 += "</div>"
            console.log(data2)
            $("#newstable2").html(data2);

            news.nowpage2 = nowpage2;
            news.totalpage2 = newsArray2[newsArray2.length - 1].totalpage2; //总数
            console.log(news.nowpage2 + "/" + news.totalpage2)
            news.showpage2(news.nowpage2, news.totalpage2)

        },
        error: function (error) {
            console.log("ajax访问出错", error.message)
        }
    });
}

//根据id删除新闻
news.deleteById = function (id) {
    $.ajax({
        url: "/deleteById",
        type: "get",
        data: {
            id: id
        },
        dataType: "json",
        success: function (affectedRows) {
            console.log(affectedRows)
            if (affectedRows == 1) {
                $("#inf").html("删除成功");
                ;
                $("#inf").css("color", "green")
                if (news.variety = 1) {
                    news.showNews(1); //删除成功显示当前页
                } else {
                    news.showNews2(1); //删除成功显示当前页
                }
            } else {
                $("#inf").html("删除失败");
                $("#inf").css("color", "red");
            }
        },
        error: function (error) {
            console.log("ajax访问出错", error.message)
        }
    });
}


//增加
news.showAddView = function () {
    $("#news_add").show(400);
}

//取消增加
news.cancleAddView = function () {
    $("#news_add").hide(400);
}

//确认增加
news.addNews = function () {
    $.ajax({
        url: "/newsAdd",
        type: "get",
        data: { //请求参数
            id: $("#addid").val(),
            title: $("#addtitle").val(),
            content: $("#addcontent").val(),
            variety: $("#addvariety").val(),
            image_url: $("#addimg").val()
        },
        dataType: "json",
        success: function (r) {
            console.log(r)
            if (r == "ok") { //增加成功
                console.log(222222)
                $("#inf").html("增加成功");
                $("#inf").css("color", "green");
                $("#news_add").hide(400);
                if (news.variety = 1) {
                    news.showNews(news.nowpage);
                } else {
                    news.showNews2(news.nowpage2);

                }

                $("#addid").val("");
                $("#addtitle").val(""),
                    $("#addcontent").val(""),
                    $("#addvariety").val(""),
                    $("#addimg").val("")
            } else { //增加失败
                console.log(111111)
                $("#inf").html(r);
                $("#inf").css("color", "red");
            }
        },
        error: function (error) {
            console.log("ajax访问出错", error.message)
        }
    })
}
