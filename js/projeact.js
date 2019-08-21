initProject();
var category_project=$('#project_type');//项目分类
var build_project=$('#project_nature');//建设性质
var use_proiect =$('#project_use');//工程用途
var toubiao_type=$('#bid_way');//投标类型
var heton_type=$('#contract_type');//合同类型
var bid_money=$('#bid_money');//投标金额
var bid_date_start=$('#bid_date_start');//中标开始日期
var bid_date_end =$('#bid_date_end');//中标结束日期
var contract_money = $('#contract_money');//合同金额
var contract_scale= $('#contract_scale');//合同规模
var contract_date_start =$('#contract_date_start');//合同开始日期
var contract_date_end=$('#contract_date_end');//合同结束日期
var finish_money=$('#finish_money');//实际金额
var finish_area=$('#finish_area');//实际面积
var finish_realbegin_start=$('#finish_realbegin_start');//实际开工开始日期
var finish_realbegin_end=$('#finish_realbegin_end');//实际开工结束日期
var finish_realfinish_start=$('#finish_realfinish_start');//实际竣工开始日期
var finish_realfinish_end =$('#finish_realbegin_end');//实际竣工结束日期





/**
 * 初始化项目条件数据
 */
function initProject() {

    var url ="http://47.92.205.189/project/projectcondition";
    $.ajax({
        url:url,
        dataType:'json',
        type:'get',
        success:function (data) {

          proappendNode(category_project,data.data.project_type);
          proappendNode(build_project,data.data.project_nature);
          proappendNode(use_proiect,data.data.project_use);
          proappendNode(toubiao_type,data.data.bid_way);
          proappendNode(heton_type,data.data.contract_type)

        },
        error:function (data) {
            console.log(data)
        }

    })
}

/**
 * 初始化项目数据
 * @param parentNode
 * @param ansArray
 */
function proappendNode(parentNode,ansArray) {
    for(var i=0,len=ansArray.length;i<len;i++){
        var it = $("<option> </option>");
        $(it).html( ansArray[i]);
        $(it).val( ansArray[i]);
        $(parentNode).append($(it));

    }
}

/**
 * 获取到下拉框下面的值
 */
function getProSelectVal() {
   var proData={};
    var its = $('.project_select');
    var itsInput = $('.project_input');
    for(var i=0,len=its.length;i<len;i++){

        (function (i) {
            var it =$(its[i]).find('option:selected').val();
            var str = $(its[i]).attr('id');
            proData[str]=it;
        })(i)
    }
    for(var j=0,l=itsInput.length;j<l;j++){
        (function (j) {
            var idName = $(itsInput[j]).attr('id');
            proData[idName]=$(itsInput[j]).val();
        })(j)
    }
    return proData;


}
$("#add3").click(function () {
    if(proFlag){
        alert('项目只能单次查询')
    }
   else {
        var proRes = getProSelectVal();
        console.log(proRes);

        for (var obj in proRes) {
            if (!proobj.hasOwnProperty(obj) || proobj[obj] === '') {
                proobj[obj] = proRes[obj]
                proFlag = true;
            }

        }
    }
console.log(proobj);

    setProSelectVal();
});

function getLastVal(resobj) {
    console.log(proobj+"1");
    var proansObj = removeProtoType(proobj);
    console.log(proansObj);
    var isVal =projudgeVal(proansObj);
    if(isVal){
        resobj.request.project_condition=proansObj;
        // return proansObj;
    }
}
/**
 * 删除里面没有val的属性
 * @param obj
 * @returns {*}
 */

function removeProtoType(obj) {
    for(var s in obj){
        if(!obj[s]){
          delete obj[s]
        }
    }
    return obj;
}

/**
 * 判断是否有值
 * @param proObj
 * @returns {boolean}
 */
function projudgeVal(proObj) {

    for(var s in proObj){
        if(proObj[s]){
            return true;
        }
    }
    return false;
}








