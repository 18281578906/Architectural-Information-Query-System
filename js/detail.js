initailDetailDate();

var index =1;
var total_num;
var detailVal;
var $company_project_person=$("#company_project_person");
var $company=$("#company");
var $person=$("#person");
var $company_person=$("#company_person");

/**
 * 获取到查询条件的值，并且获取
 */
function initailDetailDate() {

    var query =location.href;
    //因为参数中包括有中文，会变成乱码，需转码
    query = decodeURI(query);
    //获取参数objData
    var objData = query.split('=')[1];
    //   //将获取的objData打印出来你会发现，冒号全变成了%3A，这时用正则替换回来
    var obj= objData.replace(/%3A/g,':');
    detailVal = JSON.parse(obj);
    console.log(detailVal);
    //再将JSON字符串转为js对象即可
    // var obj={"request":{"project_condition_detail":{"project_type":"房屋建筑工程","project_nature":"新建","project_use":"办公建筑","page":1,"page_size":10}}}
    loading(true);
    connectDetail(detailVal);

}
/**
 * 请求数量的接口
 * @param resObj
 *
 */
function connectDetail(resObj) {

    var url="http://47.92.205.189/index/getData";
    $.ajax({
        url:url,
        dataType:'json',
        type:"post",
        data:resObj,
        success:function (data) {
            loading(false);
            console.log(data);
            $("#company_project_person table tbody tr").remove();
            $("#company table tbody tr").remove();
            detialJuge(data.key,data.data.data_list);
            total_num=data.data.total_page==0?1:data.data.total_page;
            currentPage(index,total_num);
        },error:function (data) {
            loading(false);
            console.log(data);
        }
    })
}

// var testObj={
//     "request":{
//         project_condition_detail: {project_type: "房屋建筑工程", project_nature: "改建", project_use: "工业建筑"}
//     }
// };

/**
 * 再次请求数据
 */
function getDetailAgain() {
    var obj = cloneObjectFn(detailVal);
    console.log(detailVal);
    // var obj = testObj;

    // console.log(obj);
    for(var s in obj.request){
        obj.request[s].page=index;
        obj.request[s].page_size=10;
    }
    console.log(obj);
    return obj;

}
$('#prev').click(function () {
    if(index==1){
        alert("已经是第一页了!")
    }else {
        loading(true);
        index--;
        currentPage(index,total_num);

        var ansObj =getDetailAgain();
        connectDetail(ansObj);
    }
});
$('#next').click(function () {
    if(index==total_num){
        alert("已经是最后一页了！")
    }else {
        loading(true);
        index++;
        currentPage(index, total_num);
        var ansObj = getDetailAgain();
        connectDetail(ansObj);
    }
});

/**
 * 加载页面
 * @param flag
 * @constructor
 */
function loading(flag) {
    if(flag){
        $('#loading').css('display','block')
    }else {
        $('#loading').css('display','none')

    }
}

/**
 * 对象的复制，
 * 利用了字符串的原理
 * @param obj
 * @returns {any}
 */
function cloneObjectFn (obj){

    return JSON.parse(JSON.stringify(obj))

}


function detialJuge(key,data) {

    switch (key){
        case 'project':
            $company_project_person.show();
            $company.hide();
            $person.hide();
            console.log(data);
            for(var i=0;i<data.length;i++)
            {
                $("#company_project_person table tbody ").append('  <tr>\n' +
                    '                <th>'+data[i].project_name+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].project_type+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].project_nature+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].project_use+'</th>\n' +
                    '                <th>'+data[i].project_allmoney+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].project_acreage+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_type+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_way+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_unitname+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_date+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_money+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_area+'\n' +
                    '                </th>\n' +
                    '                <th style="width:250px!important;">'+data[i].bid_unitagency+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].bid_url+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_type+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_money+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_signtime+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_scale+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_unitname+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].contract_add_url	+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_money+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_area+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_realbegin+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_realfinish+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_unitdsn+'\n' +
                    '                </th>\n' +
                    '                <th>'+data[i].finish_unitspv+'\n' +
                    '                </th>\n' +
                    '                <th class="http">'+data[i].finish_unitcst+'\n' +
                    '                </th>\n'+
                    '                <th>'+data[i].finish_add_url +'\n' +
                    '                </th>\n' +
                    '            </tr>');
            }
            break;
        case 'company':
            console.log(data);
            $company_project_person.hide();
            $company.show();
            $person.hide();
            for(var i=0;i<data.length;i++) {
                var otbody=document.getElementById("company_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<8;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    detail_choice(i,j,data,oth);
                }
            }
            break;
        case 'people':
            console.log(data);
            $person.show();
            $company.hide();
            $company_project_person.hide();
            for(var i=0;i<data.length;i++) {
                var otbody=document.getElementById("person_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<11;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    people_detail_choice(i,j,data,oth);
                }
            }
            break;
        case 'company_people_detail':
            console.log(data);
            $company_project_person.hide();
            $company.hide();
            $person.hide();
            $company_person.show();
            for(var i=0;i<data.length;i++) {
                var otbody=document.getElementById("company_person_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<9;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    company_person_detail_choice(i,j,data,oth);
                }
            }
            break;
        default:
            console.log('have no');
            break;

    }
}

function people_detail_choice(i,j,data,oth){
    switch (j)
    {
        case 0:
            var text=document.createTextNode(data[i].people_name);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data[i].people_sex);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data[i].people_cardtype);
            oth.appendChild(text);
            break;
        case 3:
            var text= document.createTextNode(data[i].people_cardnum);
            oth.appendChild(text);
            break;
        case 4:
            var qualification=data[i].register_type;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                var text=document.createTextNode(qualification[m]);
                op.appendChild(text);
                oth.appendChild(op);
            }
            // var text= document.createTextNode(data[i].register_type);

            break;
        case 5:
            var qualification=data[i].register_major;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m]);
                op.appendChild(text);
            }
            break;
        case 6:
            // var text= document.createTextNode(data[i].register_date);
            // oth.appendChild(text);
            var qualification=data[i].register_date;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m]);
                op.appendChild(text);
            }
            break;
        case 7:
            var qualification=data[i].register_unit;
            var text=document.createTextNode(qualification[0]);
            oth.appendChild(text);
            break;
        case 8:
            var text= document.createTextNode(data[i].people_project.length);
            oth.appendChild(text);
            break;

        case 9:
            var text= document.createTextNode(data[i].people_miscdct);
            oth.appendChild(text);
            break;

        case 10:
            var text= document.createTextNode(data[i].people_change);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}

function detail_choice(i,j,data,oth){
    switch (j)
    {
        case 0:
            var text=document.createTextNode(data[i].company_name);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data[i].company_legalreprst);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data[i].company_regadd);
            oth.appendChild(text);
            break;
        case 3:
            var qualification=data[i].qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_type_name);
                op.appendChild(text);
            }
            break;
        case 4:
            var qualification=data[i].qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_name);
                op.appendChild(text);
            }
            break;
        case 5:
            var qualification=data[i].qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_validity);
                op.appendChild(text);
            }
            break;
        case 6:
            break;
        case 7:
            break;
        default:
            console.log('error');
            break;
    }

}

/**
 * 导出数据到excel里面
 */
$('#export').click(function () {
    loading(true);
    var ansObj =initDetailExport(detailVal);
    connectExport(ansObj);

});

/**
 * 格式化请求详情数据的格式
 * @param resObj
 * @returns {{request: {}}}
 */
function initDetailExport(resObj) {

    var bbb= JSON.parse(JSON.stringify(resObj).replace(/company_condition_detail/g,"company_condition_down").replace(/project_condition_detail/g,"project_condition_down").replace(/people_condition_detail/g,"people_condition_down"));
    return bbb;

}

/**
 * 导出数据的连接
 * @param resOb
 */
function connectExport(ansObj) {


    var url="http://47.92.205.189/index/getdata";
    console.log(url);
    console.log(ansObj);
//url=encodeURI(encodeURI(url))
    $.ajax({
        url:url,
        type:"post",
        data:ansObj,
        success:function (e) {
            loading(false);
            console.log(e.data.path);
            window.location.href = 'http://47.92.205.189/upload/file/'+e.data.path;
        },error:function (data) {
            loading(false);

            console.log(data);
        }
    })
}

/**
 * 显示当前的页数
 */
function currentPage(index,totalPage) {
    $('#currentPage').find('span').html(index+"/"+totalPage)
}