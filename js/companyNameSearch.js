var url="http://47.92.205.189";

//测试用的数据，这里可以用AJAX获取服务器数据
var test_list = [];
var test_id=[];
var old_value = "";
var highlightindex = -1;   //高亮
//自动完成
function AutoComplete(auto, search, mylist,myId) {
    if ($("#" + search).val() !=='') {
        var autoNode = $("#" + auto);   //缓存对象（弹出框）
        if (mylist.length === 0) {
            autoNode.hide();
            return;
        }
        autoNode.empty();  //清空上次的记录
        for (var i in mylist) {
            var wordNode = mylist[i];   //弹出框里的每一条内容

            var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
            newDivNode.attr("class",myId[i])
            newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");
            newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框
            //鼠标移入高亮，移开不高亮
            newDivNode.mouseover(function () {
                if (highlightindex !== -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
                    autoNode.children("div").eq(highlightindex).css("background-color", "white");
                }
                //记录新的高亮节点索引
                highlightindex = $(this).attr("id");
                $(this).css("background-color", "#348bda");
            });
            newDivNode.mouseout(function () {
                $(this).css("background-color", "white");
            });
            //鼠标点击文字上屏
            newDivNode.click(function () {
                //取出高亮节点的文本内容
                var comText = autoNode.hide().children("div").eq(highlightindex).text();
                var comTextId = autoNode.hide().children("div").eq(highlightindex).attr('class');
               localStorage.setItem('comText',comText);
               localStorage.setItem('comTextId',comTextId)
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#" + search).val(comText);
            })
            if (mylist.length > 0) {    //如果返回值有内容就显示出来
                autoNode.show();
            } else {               //服务器端无内容返回 那么隐藏弹出框
                autoNode.hide();
                //弹出框隐藏的同时，高亮节点索引值也变成-1
                highlightindex = -1;
            }
        }
    }
    //点击页面隐藏自动补全提示框
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != search) {
            if ($("#" + auto).is(":visible")) {
                $("#" + auto).css("display", "none")
            }
        }
    }
}
$(function () {
    old_value = $("#search_text").val();
    $("#search_text").focus(function () {
        if ($("#search_text").val() == "") {
            AutoComplete("auto_div", "search_text", test_list,test_id);
        }
    });
    $("#search_text").keyup(function () {
        old_value = $("#search_text").val();
        $.ajax({
            url:url+'/project_second/getCompanyByKeywords?keywords='+old_value+'&size=10',
            type:'post',
            success:function (data) {
                var list=data.data;

                test_list=[];
                test_id=[];
                for(var i=0;i<list.length;i++) {
                    test_list.push(list[i].company_name)
                    test_id.push(list[i].company_url)
                }
                AutoComplete("auto_div", "search_text", test_list,test_id);
            },
            error:function (data) {
                console.log(data)
            }
        })
    });
    $("#search").click(function () {
        old_value = $("#search_text").val();
        if(old_value===''){
            alert('请先输入内容！');
            return;
        }
        var comText=localStorage.getItem('comText');
        var comTextId=localStorage.getItem('comTextId');
        window.location.href='companyDetail.html?company_url='+comTextId;

    })
});


