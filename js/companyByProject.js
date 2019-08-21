function currentPage1(index1,totalPage1) {

    $('#totalPage1').html("共"+totalPage1+"页");
    if(totalPage1>6){
        $('#lastPage1').html('...');
    }
    var flag=totalPage1>6?6:totalPage1;


    var flags=[];
    for(var i=0;i<flag;i++){
        flags.push(i+1);
    }
    console.log(flags);

    $(flags).each(function (index,key) {
        var span =$('<span></span>');
        $(span).attr('class','pageItem');
        $(span).html(key);

        $('#pageNum1').append($(span));
    });
    $('#pageNum1').find('span').eq(0).css('color','#f04124')



}
/**
 * 清掉以前的颜色
 */
function removeColor1() {
    var items=$('#pageNum1').find('span.pageItem');

    $(items).each(function (index,key) {
        $(key).css('color','#348bd5')
    })
}

$('#prev1').click(function () {
    if(index===1){
        alert("已经是第一页");
        $('#lastPage1').html('');

    }else {
        loading(true);
        index1--;
        console.log(index1);
        pageNum1(-1);


    }
});
$('#next1').click(function () {
    if(index===total_num){
        alert("已经是最后一页");
        $('#lastPage1').html('');

    }else {
        loading(true);

        index1++;
        console.log(index);
        pageNum1(1);

    }
});

$('#pageNum1').click(function (e) {
    console.log(1);
    removeColor1();
    var e=e||window.event;
    var el = e.srcElement||e.target;

    $(el).css('color','#f04124');

    var t=$(el).text();
    index=parseInt(t);


});
/**
 * 具体页数
 * @param index
 */
function pageNum1(flag) {
    removeColor1();
    var items = $('#pageNum1').find('span.pageItem');
    var len=items.length;
    var last=$(items[len-1]).text();
    var first=$(items[0]).text();
    console.log(last+"+"+first);

    $(items).each(function (i,key) {
        var f=$(key).text();
        f=parseInt(f);
        var res=f+flag;
        if(flag>0){
            if(parseInt(last)!==total_num1){
                $(key).html(res);
                if(res===index1){
                    $(key).css('color','#f04124')
                }
            }else {
                if(res===index1){
                    $(items[i+1]).css('color','#f04124')
                }
            }
        }else {
            if (parseInt(first) !== 1) {
                $(key).html(res);
                if (res === index1) {
                    $(key).css('color', '#f04124')
                }
            } else {
                if (res === index1) {
                    $(items[i - 1]).css('color', '#f04124')
                }
            }
        }







    });

}
function getUrlData(page,pageSize,detailVal){
detailVal['request']['company_condition_detail'].page=page;
    detailVal['request']['company_condition_detail'].page_size=pageSize;
    console.log(detailVal);


}