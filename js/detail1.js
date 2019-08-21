initailDetailDate();

var index =1;
var total_num;
var detailVal;
var $company_project_person=$("#company_project_person");
var $company=$("#company");
var $person=$("#person");
var person_project_num=[];
var detail_num=0;
var $company_person=$("#company_person");
var screenWidth=$(".overall").width();
var screenHeight=$(".overall").height();
var judge=true;
var conpanyByProject=[];
var companyIndex=-1;
var index1=1;
var total_num1;
var judge1=true;


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
 * 获取所选条件的企业详情
 */


$('#companyByproject').click(function(){

    console.log(detailVal);
    var ans = JSON.stringify(detailVal.request);
    if(ans.indexOf('people_condition_detail')<0&&ans.indexOf('project_condition_detail')>=0&&ans.indexOf('company_condition_detail')<0)
    {
     alert("项目没有这种情况！");
    }else{
        $(this).addClass('active');
        $(this).prev().removeClass('active');

        $("#companyData table tbody tr").remove();

        $("#companyData").css('display','none');
        $('#companyByProjectData').css('display','block');
        $('#page').css('display','none');
        $('#page1').css('display','block');
        loading(true);
        getCompayByProject(detailVal);

    }


});
$('#companySearch').click(function(){
    $(this).addClass('active');
    $(this).next().removeClass('active');
    loading(true);
    $("#companyData").css('display','block');
    $("#companyByProjectData table tbody tr").remove();

    $('#companyByProjectData').css('display','none');
    $('#page').css('display','block');
    $('#page1').css('display','none');
    console.log(detailVal);
    connectDetail(detailVal);
});
function getCompayByProject(data)
{    var  urlSearch="http://47.92.205.189/company/getCompanyDetailByCompanyUnionProject";
    var str = JSON.stringify(data.request);
   if(str.indexOf('people_condition_detail')>=0&&str.indexOf('project_condition_detail')>=0&&str.indexOf('company_condition_detail')<0){
       urlSearch="http://47.92.205.189/company/getCompanyDetailByPeoPleUnionProject"
       console.log("人员+项目")

   }else if(str.indexOf('people_condition_detail')>=0&&str.indexOf('project_condition_detail')&&str.indexOf('company_condition_detail')>=0){
       urlSearch="http://47.92.205.189/company/getCompanyDetailByAllUnion"
       console.log("全部联查")
   }
    console.log(urlSearch);

    $.ajax({
        url:urlSearch,
        dataType:'json',
        type:"post",
        data:data,
        success:function(data){
            console.log(data);
            $("#companyByProjectData table tbody tr").remove();
            $('.num i').html(data.data.total_num);
            total_num1=data.data.total_page==0?1:data.data.total_page;
            console.log(total_num1);
            console.log(index1);
            if(judge1){
                currentPage1(index1,total_num1);
            }
            judge1=false;
            intialCompanyData(data.data);
            loading(false);
        },error:function(data){
            console.log(data);
            loading(false);

        }
    })
}
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
 * 初始化
 * @param data
 */
function intialCompanyData(data){


    for(var i=0;i<data.data_list.length;i++) {
        var companyProjectBody=$('#companyProjectBody');
        var tr=document.createElement('tr');

        for(var j=0;j<6;j++){
            var oth=document.createElement('th');
                if(j===3){
                    oth.className='company_project';
                }

            companyDataByProject(j,data.data_list[i],oth);
            tr.appendChild(oth);
        }
        companyProjectBody[0].appendChild(tr);
    }


}
$('#companyByProjectData').click(function(){

    var e = e||window.event;
    var el = e.srcElement||e.target;
    el= el.className === "company_project"?el:el.parentNode.parentNode;
    var index = el.getAttribute('index');
    console.log(index);
    console.log(person_project_num);
    if (el.className==='company_project'&&index!='null'){

        var index = $(el).attr('index');
        console.log(index);
        console.log(conpanyByProject[index]);
        forMatArr(person_project_num[index]);
        showPeopleData1(conpanyByProject[index])
    }
});

function companyDataByProject(j,data,parent){

    switch(j){
        case 0:
            var text=document.createTextNode(data.company_name);
            parent.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.company_legalreprst);
            parent.appendChild(text);
            break;
        case 2:
            var text=document.createTextNode(data.company_regadd);
            parent.appendChild(text);
            break;
        case 3:
            var text=document.createTextNode(data.qualification.length);
            companyIndex+=1;
            $(parent).attr('index',companyIndex);
            conpanyByProject.push(data.qualification);
            parent.appendChild(text);
            break;
        case 4:
            var text=document.createTextNode(data.cpny_miscdct);
            parent.appendChild(text);
            break;
        case 5:
            var text=document.createTextNode(data.cpny_change);
            parent.appendChild(text);
            break;
    }
}


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
        var ansObj = getDetailAgain1(index1);

        getCompayByProject(ansObj)


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
        var ansObj = getDetailAgain1(index1);

        getCompayByProject(ansObj)

    }
});

$('#pageNum1').click(function (e) {
    console.log(1);
    removeColor1();
    var e=e||window.event;
    var el = e.srcElement||e.target;

    $(el).css('color','#f04124');

    var t=$(el).text();
    index1=parseInt(t);
    loading(true);

    var ansObj = getDetailAgain1(index1);

    getCompayByProject(ansObj)


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
/**
 * 再次请求数据
 */
function getDetailAgain1(index1) {
    var obj = cloneObjectFn(detailVal);
    console.log(detailVal);
    // var obj = testObj;

    // console.log(obj);

        obj.request['company_condition_detail'].page=index1;
    obj.request['company_condition_detail'].page_size=10;



    console.log(obj);
    return obj;

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
            $("#page").css('display','block');
            $("#footer").css('display','block');
            $("#companyData table tbody tr").remove();
            $("#company table tbody tr").remove();
            $("#company_person_body tr").remove();
            $('#person_body tr').remove();
            $(".num i").text(data.data.total_num);

            detialJuge(data.key,data.data.data_list);
            total_num=data.data.total_page==0?1:data.data.total_page;
            console.log(total_num);
            console.log(index);
            if(judge){
                currentPage(index,total_num);
            }
            judge=false;
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
function getDetailAgain(index) {
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
/**
 * 清掉以前的颜色
 */
function removeColor() {
    var items=$('#pageNum').find('span.pageItem');

    $(items).each(function (index,key) {
        $(key).css('color','#348bd5')
    })
}

$('#prev').click(function () {
    if(index===1){
        alert("已经是第一页");
        $('#lastPage').html('');

    }else {
        loading(true);
        index--;
        console.log(index);
        pageNum(-1);
        var ansObj = getDetailAgain(index);

        connectDetail(ansObj);
    }
});
$('#next').click(function () {
    if(index===total_num){
        alert("已经是最后一页");
        $('#lastPage').html('');

    }else {
        loading(true);

        index++;
        console.log(index);
        pageNum(1);
        var ansObj = getDetailAgain(index);
        console.log(ansObj);
        connectDetail(ansObj);
    }
});

$('#pageNum').click(function (e) {
    console.log(1);
    removeColor();
    var e=e||window.event;
    var el = e.srcElement||e.target;

    $(el).css('color','#f04124');

    var t=$(el).text();
    index=parseInt(t);
    var ansObj = getDetailAgain(index);
    console.log(ansObj);
    loading(true);
    connectDetail(ansObj);

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
                $("#companyData table tbody ").append('  <tr>\n' +
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
                    '                <th><a href="'+data[i].bid_url+'">'+data[i].bid_url+'</a>\n' +
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
                    '                <th><a href="'+data[i].contract_add_url+'">'+data[i].contract_add_url+'</a>\n' +
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
            oth.className="people_num";
            oth.innerHTML=data[i].people_project.length;

            if(data[i].people_project.length>=1){
                person_project_num.push(data[i].people_project);
                oth.setAttribute('index',detail_num++);

            }else {
                oth.setAttribute('index','null');

            }
            // oth.appendChild(text);
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
 * 具体页数
 * @param index
 */
function pageNum(flag) {
    removeColor();
    var items = $('#pageNum').find('span.pageItem');
    var len=items.length;
    var last=$(items[len-1]).text();
    var first=$(items[0]).text();
    console.log(last+"+"+first);

    $(items).each(function (i,key) {
        var f=$(key).text();
        f=parseInt(f);
        var res=f+flag;
        if(flag>0){
            if(parseInt(last)!==total_num){
                $(key).html(res);
                if(res===index){
                    $(key).css('color','#f04124')
                }
            }else {
                if(res===index){
                    $(items[i+1]).css('color','#f04124')
                }
            }
        }else {
            if (parseInt(first) !== 1) {
                $(key).html(res);
                if (res === index) {
                    $(key).css('color', '#f04124')
                }
            } else {
                if (res === index) {
                    $(items[i - 1]).css('color', '#f04124')
                }
            }
        }







    });

}
/**
 * 显示当前的页数
 */
function currentPage(index,totalPage) {

    $('#totalPage').html("共"+totalPage+"页");
   if(totalPage>6){
       $('#lastPage').html('...');
   }
    var flag=totalPage>6?6:totalPage;


    var flags=[];
    for(var i=0;i<flag;i++){
        flags.push(i+1);
    }
    console.log(flags);

    $(flags).each(function (index,key) {
        var span =$('<span></span>');
        $(span).attr('class','pageItem');
        $(span).html(key);

        $('#pageNum').append($(span));
    });
    $('#pageNum').find('span').eq(0).css('color','#f04124')



}
function company_person_detail_choice(i,j,data,oth){
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
            var text= document.createTextNode(data[i].cpny_miscdct);
            oth.appendChild(text);

            break;
        case 7:
            var text= document.createTextNode(data[i].cpny_change);
            oth.appendChild(text);
            break;
        case 8:
            var qualification=data[i].people_names;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m]);
                op.appendChild(text);
                op.setAttribute('id',data[i].people_ids[m])
                op.setAttribute('class','person_detail');
                op.onclick=function (e) {
                    var el=window.event||e;
                    var src=el.srcElement||el.target;
                    var name=this.innerText;
                    if(src.className==='person_detail')
                    {
                        var id=src.id;
                        $("#person_tankuang").css({
                            'display': 'block',
                        });
                        $(".black").css({
                            'display': 'block',
                            'width':screenWidth+'px',
                            'height':screenHeight+'px',
                        });
                        $(".black").click(function () {
                            $("#person_tankuang").css('display','none');
                            $(".black").css('display','none');
                        })
                        $.ajax({
                            url:'http://47.92.205.189/people_condition/getPeopleDetail?people_id='+id,
                            type:'get',
                            success:function (data) {
                                console.log(data);
                                $("#person_tankuang_body tr").remove();
                                var otbody=document.getElementById("person_tankuang_body");

                                var otr=document.createElement('tr');
                                otbody.appendChild(otr);
                                for(var j=0;j<8;j++){
                                    var oth=document.createElement('th');
                                    otr.appendChild(oth);
                                    person_information(j,data,oth,name);
                                }


                            },
                            error:function (data) {
                                console.log(data)

                            }

                        })
                    }

                }
            }
            break;
        default:
            console.log('error');
            break;
    }

}
function person_information(j,data,oth,name){
    console.log(data)
    switch (j)
    {
        case 0:
            var text=document.createTextNode(name);
            oth.appendChild(text);
            break;
        case 1:
            var register=data.people_info.register;
            for(var m=0;m<register.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(register[m].register_type);
                op.appendChild(text);
            }

            break;
        case 2:
            var register=data.people_info.register;
            for(var m=0;m<register.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(register[m].register_major);
                op.appendChild(text);
            }
            // var text= document.createTextNode(data.people_info.register.register_major);
            // oth.appendChild(text);
            break;
        case 3:
            var register=data.people_info.register;
            for(var m=0;m<register.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(register[m].register_date);
                op.appendChild(text);
            }
            // var text= document.createTextNode(data.people_info.register.register_date);
            // oth.appendChild(text);
            break;
        case 4:
            var register=data.people_info.register;
            for(var m=0;m<register.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(register[m].register_unit);
                op.appendChild(text);
            }
            // var text= document.createTextNode(data.people_info.register.register_unit);
            // oth.appendChild(text);
            break;
        case 5:
            var project=data.people_info.project;
            for(var m=0;m<project.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(project[m]);
                op.appendChild(text);
            }
            break;
        case 6:
            var miscdct=data.people_info.miscdct;
            for(var m=0;m<miscdct.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(miscdct[m]);
                op.appendChild(text);
            }
            break;
        case 7:
            var change=data.people_info.change;
            for(var m=0;m<change.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var textDate='变更专业：'+change[m].change_type+"。变更信息："+change[m].change_record;
                var text=document.createTextNode(textDate);
                op.appendChild(text);
            }
            break;
        default:
            console.log('error');
            break;
    }
}


$('#person_body').click(function (e) {
    // console.log(1);
    var e = e||window.event;
    var el = e.srcElement||e.target;
    el= el.className === "people_num"?el:el.parentNode.parentNode;
    var index = el.getAttribute('index');
    console.log(index);
    console.log(person_project_num);
    if (el.className==='people_num'&&index!='null'){

        var index = $(el).attr('index');
        console.log(index);
        console.log(person_project_num[index]);
        forMatArr(person_project_num[index]);
        showPeopleData(person_project_num[index])
    }

});
function showPeopleData1(dataNum) {
// var e = window.event||e;
//    var el = e.target||e.srcElement;
//  var node = el.id||el.parentNode.id;
    // if(node=="people_change"){
    console.log(dataNum);
    var height=$(document).height();
    var width = $(document).width();
    $('#mask').height(height);
    $('#mask').width(width);


    $('#showPeopleNum1').css('display','block');
    initialPeopleNum($('#detail_num1'),dataNum);

    // }

}
function showPeopleData(dataNum) {
// var e = window.event||e;
//    var el = e.target||e.srcElement;
//  var node = el.id||el.parentNode.id;
    // if(node=="people_change"){
    console.log(dataNum);
    var height=$(document).height();
    var width = $(document).width();
    $('#mask').height(height);
    $('#mask').width(width);


    $('#showPeopleNum').css('display','block');
    initialPeopleNum($('#detail_num'),dataNum);

    // }

}

/**
 * 添加信息在页面上
 * @param node
 * @param arr
 */
function initialPeopleNum(node,arr) {
    console.log(arr);

    for(var i in arr){
        var tr =document.createElement('tr');
        for(var j in arr[i]){
            var str=document.createElement('td');
           if(j=="project_url"){
               var a= document.createElement('a');
               a.innerHTML=arr[i][j].trim();
               a.href=arr[i][j].trim();
               str.appendChild(a);

           }else{

               $(str).html(arr[i][j].trim())
           }
            // console.log(str);
            $(tr).append($(str));
        }
        $(node).append($(tr))

    }
}
$('#mask').click(function () {
    $('#mask').height(0);
    $('#mask').width(0);
    $('#showPeopleNum').css('display','none');
    $('#showPeopleNum1').css('display','none');
    $('#detail_num').html('')
    $('#detail_num1').html('')


});

/**
 * 格式化个人业绩格式
 * @param arr
 */
function forMatArr(arr) {
    for(var i in arr){
        for (var j in arr[i]){
            if(j=='project_url'){
                if(arr[i][j].indexOf("http://jzsc.mohurd.gov.cn/dataservice/query/project/projectDetail")<0){
                    arr[i][j]="http://jzsc.mohurd.gov.cn/dataservice/query/project/projectDetail"+arr[i][j];
                }
            }
        }
    }
}