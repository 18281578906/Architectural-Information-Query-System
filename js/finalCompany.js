
initCompany();


var grade = $('#grade');

var globalstr='';
var globalids='';


function initCompany() {

    var url ="http://47.92.205.189/companycondition/qualificationType";
    var com_category = document.getElementById('com-category');
    $.ajax({
        url:url,
        type:'get',
        dataType:'json',
        success:function (data) {
            var len = data.data.length;

            for(var i = 0; i <len;i++)
            {
                var item = $("<option> </option>");
                $(item).attr('code',data.data[i].code);
                $(item).attr('id',data.data[i].id);
                $(item).attr('end',data.data[i].is_end);

                $(item).html(data.data[i].name);
                $(item).val(data.data[i].name);
                $(com_category).append($(item));
            }
        },
        error:function (data) {
            console.log(data)
        }
    })

}

$(document).ready(function () {
    $('#com-category').change(function () {
        reloadNode(1);
        beginConnect($(this))
    });
    $('#big_type').change(function () {
        reloadNode(2);

        beginConnect($(this))

    });
    $('#litter_type').change(function () {
        reloadNode(3);

        beginConnect($(this))

    });
    $('#major').change(function () {
        reloadNode(4);

        beginConnect($(this))
    });
    $(grade).change(function () {
        beginConnect($(this));
        var node = $(this).find("option:selected");
        var id = $(node).attr('id');
        var value = $(node).attr('value');
        var isColor=$(node).attr('isColor');
        var lastChild = $(grade).children("option:last-child")[0];

        if(isColor==='no') {
            // var it = $("<option> </option>");

            globalids += id + " ";

            globalstr += value + ' ';
            console.log(globalstr+"#"+globalids.substring(0,globalids.length-1));
            $(lastChild).attr('id', globalids.substring(0, globalids.length - 1));
            $(lastChild).html(globalstr);
            $(lastChild).val(globalstr);
            $(lastChild).css('display', 'none');
            lastChild.selected=true;
            // $(grade).append($(it));
            $(node).css('color', '#1e90ff');
            $(node).attr('isColor',"yes")
        }else {
            // var it = $("<option> </option>");
            console.log(id);
            console.log(value);
            globalstr=globalstr.split(value).join('');
            globalids=globalids.split(id+" ").join('');

            if(globalids.length>0){
                lastChild.selected=true;
            }else {
                $(grade).children("option:first-child")[0].selected=true;
            }
            $(lastChild).attr('id', globalids.substring(0, globalids.length - 1));
            $(lastChild).html(globalstr);
            $(lastChild).val(globalstr);
            $(lastChild).css('display', 'none');
            $(node).css('color', '#7b7878');
            $(node).attr('isColor',"no")
        }
    })
});



/**
 * 连接
 * @param node
 */
function beginConnect(node) {
    var parentNode = $(node).parent().next().children();

    removeNode(parentNode);
    var it =$(node).find("option:selected");
    var id = $(it).attr("id");
    var code = $(it).attr("code");
    var item_name = $(node).attr("class");
    var is_end=$(it).attr("end");


    if(is_end==0){

        var parentNode = $(node).parent().next().children();
        connect(code,parentNode);
    }else if(is_end==1){
        if(id.indexOf('end')<0){
            $(it).attr("id",id+"end");
        }
        var id = $(node).attr('id');
        if(id!='grade'){
            tillEnd();
            $('#grade').find('option:first-child').html("null")
            // $('#grade').css('display','none')
        }

    }

}

/**
 * 连接ajax
 * @param code
 * @param parentNode
 */
function connect(code,parentNode) {
    // var idName=$(parentNode).attr('id');
    var url ="http://47.92.205.189/companycondition/qualificationType?code="+code;
    $.ajax({
        url:url,
        type:'get',
        dataType:'json',

        success:function (data) {
            console.log(data);

              var levels=[];
              for(var i=0,len=data.data.length;i<len;i++){
                 if(data.data[i].level){
                     levels.push(data.data[i].level);
                 }
              }

                var len1 =levels.length;
                var len2 = data.data.length;

                if(len1==len2){
                    // console.log(data.data);

                    // var  gradeArray = qiyesplitState('',data.data);
                    // qiyeappendNode($('#grade'),gradeArray);
                    gradeappendNode($('#grade'),data.data);
                    tillEnd();
                }

            else {

                qiyeappendNode(parentNode,data.data);

            }


        },
        error:function (data) {
            console.log(data)
        }
    })
}


/**
 * 去掉原来的数据
 * @param node
 */
function removeNode(node) {
    var nodes = $(node).children();

    $('#grade').find('option:first-child').html("等级");

    var len = nodes.length;
    for(var i=1;i<len;i++){
        $(nodes[i]).remove();
    }
}


/**
 * 加载后的数据显示在页面
 * @param parentNode
 * @param ansArray
 */
function qiyeappendNode(parentNode,ansArray) {
    // console.log(ansArray);
    for(var i=0,len=ansArray.length;i<len;i++){
        var it = $("<option> </option>");
        $(it).attr('code', ansArray[i].code);
        $(it).html( ansArray[i].name);
        $(it).val( ansArray[i].name);
        $(it).attr('id', ansArray[i].id);
        $(it).attr('end',ansArray[i].is_end);
        // $('#grade').append($(it));
        $(parentNode).append($(it));
        // $(parentNode).parent().nextAll().remove();
        // company_items.push(item);

    }
}

/**
 * 企业加载
 * @param parentNode
 * @param ansArray
 */
function gradeappendNode(parentNode,ansArray) {

    for(var i=0,len=ansArray.length;i<len;i++){
        var it = $("<option> </option>");
        $(it).attr('code', ansArray[i].code);
        $(it).html( ansArray[i].level);
        $(it).val( ansArray[i].level);
        $(it).attr('id', ansArray[i].id);
        $(it).attr('end',ansArray[i].is_end);
        $(it).attr('isColor',"no");
        $(parentNode).append($(it));
    }
    var it = $("<option> </option>");
    $(parentNode).append($(it));
}
/**
 * 进行到等级的时候看前面是否还有没有值的node
 * 如果有的话就清除
 */
function tillEnd() {
    var nodes = $('#select_company').find('li').find('select');
    var len = $(nodes).length;

    for(var i=0;i<len-1;i++){
        var len1= $(nodes[i]).children().length;
        if(len1<2){
            $(nodes[i]).css('display','none');
        }
    }



}

/**
 * 重新加载企业条件
 */
function reloadNode(index) {
    globalstr='';
    globalids='';
    var select=$('#select_company').find('li').find('select');
    for(var i=index,len=select.length;i<len;i++){
        $(select[i]).css('display','block');

        if($(select[i]).children().length>=2){
            removeNode($(select[i]));
        }
    }
}

/**
 * 获取到选中的值
 */
function getVal() {
    var item={
        category:null,
        big_type:null,
        litter_type:null,
        major:null,
        grade:null
    };
    // ("#select1  option:selected").text()
    var nodes = $('#select_company').find('li').find('select');
    var len = nodes.length;
    for(var i=0;i<len;i++ ){
        (function () {
            var itParent = $(nodes[i]).attr('class');
            var it =$(nodes[i]).find('option:selected');
             var grades=$(it).attr('id');

            item[itParent]=grades;


        })(i)
    }
    console.log(item);
    return item;




}

/**
 * 添加筛选
 */

$('#add1').click(function () {
    var obj = getVal();
    console.log(obj);
    company_items.push(obj);
    console.log(company_items);


});

function getCompanyCode(resobj) {
    var currentArray=[].concat(company_items);
    console.log(currentArray);
    //  company_items.length=0;//是否叠加
    var len = currentArray.length;
    var codeArr=[];

    for(var i=len-1;i>=0;i--){
        for( var s in currentArray[i]){
            var item = currentArray[i][s];
            if(item){
                var res =juadgeEnd(item);


                if(res){
console.log(res);
                    res=res.toString().replace(/\s/g,'|');
                    var index = codeArr.indexOf(res);
                    if(index<0){
                        codeArr.push(res);

                    }
                }
            }

        }
    }
    console.log(codeArr);
    if(codeArr.length>=1){
        var comobj={
            code:''
        };
        comobj.code=codeArr.join(',');
        resobj.request.company_condition=comobj;
    }


}
// $("#save").click(function () {
//    getCompanyCode();
//
//
//
// });

/**
 * 判断传入数量接口都code
 * @param str
 * @returns {*}
 */
function juadgeEnd(str) {

    if(str.indexOf('end')>=0){
        var fin = str.indexOf('end')===str.lastIndexOf('end')?str.split('end').join(''):"("+str.split('end').join('')+")";
        return fin;
    }
    return null;
}


/**
 * 查看某个值是否存在数组里面
 * @param val
 * @returns {number}
 */
Array.prototype.indexOf=function (val) {

    for(var i =0,len=this.length;i<len;i++){
        if(this[i]===val){
            return 1
        }
    }
    return -1
};


