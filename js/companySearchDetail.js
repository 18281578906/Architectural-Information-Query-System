var url="http://47.92.205.189";
var screenWidth=$(".overall").width();
var screenHeight=$(".overall").height();
var index=1;
var total_num;
var judge=true;
var page=1;
var size=10;
var urlCompany;
var personJudge=true;
var urlPerson;
var person_page=1;
var person_size=10;
var personTotal_num;
var person_index=1;
var company_detail=0;
var company_peopleNum=[];
/**
 * 搜索
 * @param company_url
 */
function searchClick(company_url) {
 var str=url+'/project_second/getProjectByCompanyurl?company_url='+company_url;
 // console.log(str);
    $.ajax({
        url:str,
        type:'get',
        success:function (data) {
            $("#page").css('display','block');
            $("#footer").css('display','block');
            $("#project_detail").css('display','block');
            var arr=data.data;
            console.log(data);
            total_num=data.page_total===0?1:data.page_total;
            $("#num i").text(data.num_total);
            $("#person_body tr").remove();
            for(var i=0;i<arr.length;i++)
            {
                var otbody=document.getElementById("person_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<9;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    person_information(j,arr[i],oth);
                }
            }
if(judge){
                urlCompany=company_url;
                // console.log(urlCompany);
                // currentPage(index,total_num);
    currentPage(index,total_num,$('#lastPage'),$('#totalPage'),$('#pageNum'))
}
judge=false;
            loading(false);
        },
        error:function (data) {
            console.log(data.data)
        }
    })
}
function getUrl(index) {
    page=index;
    var str=urlCompany+"&page="+page+"&size="+size;
    return str;
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

/**
 * 人员删除颜色
 */
function personremoveColor() {
    var items=$('#company_pageNum').find('span.pageItem');

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
        // console.log(index);
        pageNum(-1);
      var res = getUrl(index);
      searchClick(res);
    }
});
$('#company_prev').click(function(){
    if(person_index===1){
        alert("已经是第一页");
        $('#company_totalPage').html('');

    }else {
        loading(true);
        person_index--;
        person_page=person_index;
        // console.log(index);
        personpageNum(-1);
        person_Page(person_page,person_size)

    }
});
$('#next').click(function () {
    if(index===total_num){
        alert("已经是最后一页");
        $('#lastPage').html('');

    }else {
        loading(true);

        index++;
        // console.log(index);
        pageNum(1);
        var res = getUrl(index);
        searchClick(res);

    }
});
$('#company_next').click(function(){
    if(person_index===personTotal_num){
        alert("已经是最后一页");
        $('#company_lastPage').html('');

    }else {
        loading(true);

        person_index++;
        person_page=person_index;
        // console.log(index);
        personpageNum(1);
        person_Page(person_page,person_size)

    }
});

$('#pageNum').click(function (e) {

    removeColor();
    var e=e||window.event;
    var el = e.srcElement||e.target;

       while(el.nodeName!='SPAN'){
           el=el.parentNode;
       }



    $(el).css('color','#f04124');

    var t=$(el).text();
    index=parseInt(t);
    var res = getUrl(index);
    loading(true);
    searchClick(res);
});
$('#company_pageNum').click(function(){
    personremoveColor();
    var e=e||window.event;
    var el = e.srcElement||e.target;
    console.log(el);
    $(el).css('color','#f04124');

    var t=$(el).text();

    person_index=parseInt(t);
    console.log(person_index);
    person_page=person_index;

    loading(true);

    person_Page(person_page,person_size)
});
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
    // console.log(last+"+"+first);

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

//     for(var i=0,len=items.length;i<len;i++){
//         (function (i) {
//             var f = $(items[i]).text();
//             f=parseInt(f);
//             $(items[i]).html(f+flag);
//             if(f===index){
//                 console.log(index);
//                 console.log(f);
//                 console.log(i);
//                 $(items[i-1]).css('color','#f04124');
//             }
//         })(i)
//
//
//     }
//
//
}

/**
 * 人员具体页数
 * @param flag
 */
function personpageNum(flag) {
    personremoveColor();
    var items = $('#company_pageNum').find('span.pageItem');
    var len=items.length;
    var last=$(items[len-1]).text();
    var first=$(items[0]).text();
    // console.log(last+"+"+first);

    $(items).each(function (i,key) {
        var f=$(key).text();
        f=parseInt(f);
        var res=f+flag;
        if(flag>0){
            if(parseInt(last)!==personTotal_num){
                $(key).html(res);
                if(res===person_index){
                    $(key).css('color','#f04124')
                }
            }else {
                if(res===person_index){
                    $(items[i+1]).css('color','#f04124')
                }
            }
        }else {
            if (parseInt(first) !== 1) {
                $(key).html(res);
                if (res === person_index) {
                    $(key).css('color', '#f04124')
                }
            } else {
                if (res === person_index) {
                    $(items[i - 1]).css('color', '#f04124')
                }
            }
        }







    });

//     for(var i=0,len=items.length;i<len;i++){
//         (function (i) {
//             var f = $(items[i]).text();
//             f=parseInt(f);
//             $(items[i]).html(f+flag);
//             if(f===index){
//                 console.log(index);
//                 console.log(f);
//                 console.log(i);
//                 $(items[i-1]).css('color','#f04124');
//             }
//         })(i)
//
//
//     }
//
//
}
/**
 *
 * @param index当前页数
 * @param totalPage共有多少页
 * @param trigger--totalPage
 * @param pageNum 数字分页
 * @param lastPage--lastPage
 */
function personcurrentPage(person_index,personTotal_num,lastPage,trigger,pageNum) {
    // console.log(totalPage);
    $(trigger).html("共"+personTotal_num+"页");
    $(lastPage).html('...');
    var flag=personTotal_num>6?6:personTotal_num;


    var flags=[];
    for(var i=0;i<flag;i++){
        flags.push(i+1);
    }
    console.log(flags);

    $(flags).each(function (index,key) {
        var span =$('<span></span>');
        $(span).attr('class','pageItem');
        $(span).html(key);

        $(pageNum).append($(span));
    });
    $(pageNum).find('span').eq(0).css('color','#f04124')



}

function currentPage(index,totalPage,lastPage,trigger,pageNum) {
    // console.log(totalPage);
    $(trigger).html("共"+totalPage+"页");
    $(lastPage).html('...');
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

        $(pageNum).append($(span));
    });
    $(pageNum).find('span').eq(0).css('color','#f04124')



}
/**
 * 列表详情
 * @param j
 * @param data
 * @param oth
 */
function person_information(j,data,oth){
    switch (j)
    {
        case 0:

            var text=document.createTextNode(data.project_name);
            oth.appendChild(text);
            oth.setAttribute('id',data.project_url);
            oth.setAttribute('class','detail');

            break;
        case 1:
            var text=document.createTextNode(data.project_area);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.project_unit);
            oth.appendChild(text);
            break;
        case 3:

            var text= document.createTextNode(data.project_type);
            oth.appendChild(text);
            break;
        case 4:

            var text= document.createTextNode(data.project_nature);
            oth.appendChild(text);
            break;
        case 5:
            var text= document.createTextNode(data.project_use);
            oth.appendChild(text);
            break;
        case 6:
            var text= document.createTextNode(data.project_allmoney);
            oth.appendChild(text);
            break;
        case 7:

            var text= document.createTextNode(data.project_acreage);
            oth.appendChild(text);
            break;
        case 8:
            var text= document.createTextNode(data.project_level);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}
function person_tankuang_information1(j,data,oth){

    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.bid_type);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.bid_way);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.bid_unitname);
            oth.appendChild(text);
            break;
        case 3:
            var text= document.createTextNode(data.bid_date);
            oth.appendChild(text);
            break;
        case 4:
            var text= document.createTextNode(data.bid_money);
            oth.appendChild(text);
            break;
        case 5:
            var text= document.createTextNode(data.bid_area);
            oth.appendChild(text);
            break;
        case 6:
            var text= document.createTextNode(data.bid_unitagency);
            oth.appendChild(text);
            break;
        case 7:
            var text= document.createTextNode(data.bid_pname);
            oth.appendChild(text);
            break;
        case 8:
            var text= document.createTextNode(data.bid_pnum);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}
function person_tankuang_information2(j,data,oth){

    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.censor_unitrcs);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.censor_unitdsn);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}
function person_tankuang_information3(j,data,oth){

    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.contract_type);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.contract_money);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.contract_signtime);
            oth.appendChild(text);
            break;
        case 3:
            var text= document.createTextNode(data.contract_scale);
            oth.appendChild(text);
            break;
        case 4:
            var text= document.createTextNode(data.company_out_name);
            oth.appendChild(text);
            break;
        case 5:
            var text= document.createTextNode(data.contract_unitname);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}
function person_tankuang_information4(j,data,oth){

    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.permit_money);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.permit_area);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.permit_certdate);
            oth.appendChild(text);
            break;
        case 3:
            var text= document.createTextNode(data.permit_unitrcs);
            oth.appendChild(text);
            break;
        case 4:
            var text= document.createTextNode(data.permit_unitdsn);
            oth.appendChild(text);
            break;
        case 5:
            var text= document.createTextNode(data.permit_unitspv);
            oth.appendChild(text);
            break;
        case 6:
            var text= document.createTextNode(data.permit_unitcst);
            oth.appendChild(text);
            break;
        case 7:
            var text= document.createTextNode(data.permit_manager);
            oth.appendChild(text);
            break;
        case 8:
            var text= document.createTextNode(data.permit_managerid);
            oth.appendChild(text);
            break;
        case 9:
            var text= document.createTextNode(data.permit_monitor);
            oth.appendChild(text);
            break;
        case 10:
            var text= document.createTextNode(data.permit_monitorid);
            oth.appendChild(text);
            break;

        default:
            console.log('error');
            break;
    }

}
function person_tankuang_information5(j,data,oth){

    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.finish_money);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.finish_area);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.finish_realbegin);
            oth.appendChild(text);
            break;
        case 3:
            var text= document.createTextNode(data.finish_realfinish);
            oth.appendChild(text);
            break;
        case 4:
            var text= document.createTextNode(data.finish_unitdsn);
            oth.appendChild(text);
            break;
        case 5:
            var text= document.createTextNode(data.finish_unitspv);
            oth.appendChild(text);
            break;
         case 6:
            var text= document.createTextNode(data.finish_unitspv);
            oth.appendChild(text);
            break;
        default:
            console.log('error');
            break;
    }

}

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
$(function () {
    loading(true);
    var name=localStorage.getItem('comText');
    $('header').text(name);
    var company_url=window.location.href.split('=')[1];
    searchClick(company_url);
    //点击项目名称
    $("#person_body").click(function (e) {
        var el=e||window.event;
        var src=el.target||el.srcElement;
        if(src.className==='detail') {
            for(var i=1;i<=5;i++)
            {
                var text=$("#"+i+" h5").text();
                text=text.split('>>')[0]+">>";
                $("#"+i+" h5").text(text);
            }
            var project_url=src.id;
            xiangqing(project_url);
           var project_name=$('#'+project_url).text();
           $("#project_name").text(project_name+"(详情显示)");
            $("#person_tankuang").css({
                'display': 'block'
            });
            $(".black").css({
                'display': 'block',
                'width': screenWidth + 'px',
                'height': screenHeight + 'px',
            });
            $(".black").click(function () {
                // window.location.reload();

                for(var i=1;i<=5;i++)
                {
                    $("#"+i+' .det').css('display','none');
                    $("#person_tankuang_body"+i+" tr").remove();

                }

                loading(false);
                $("#person_tankuang").css('display', 'none');
                $(".black").css('display', 'none');
            })
        }



    })

    //点击企业名称
    // $('#header').click(function () {
    //     loading(true);
    //     tanKuang();
    // })
    $(".black").click(function () {

        $("#company_tankuang").css('display','none');
        $(".black").css('display','none');
    })

    //企业项目界面切换
    project_company_change();

});
//企业项目界面切换
function project_company_change() {

    $(".nav").click(function (e) {
        var el=e||window.event;
        var src=el.srcElement||el.target;

        if(src.id==='project'){
            $("#project_detail").css('display','block');
            $("#company_detail").css('display','none');
            $("#person_detail").css('display','none');
            $("#page").css('display','block');
            $("#com_page").css('display','none');
            var li=src.parentNode;
            $(li).addClass('active');
            var li2=$("#company").parent();
            var li3=$("#persons").parent();
            $(li2).removeClass('active');
            $(li3).removeClass('active');
        }
        if(src.id==='company'){
            $("#project_detail").css('display','none');
            $("#company_detail").css('display','block');
            $("#person_detail").css('display','none');
            $("#page").css('display','none');
            $("#com_page").css('display','none');
            $("#footer").css('display','none');
            var li=src.parentNode;
            $(li).addClass('active');
            var li2=$("#project").parent();
            var li3=$("#persons").parent();
           $(li2).removeClass('active');
           $(li3).removeClass('active');
            loading(true);
            tanKuang();
        }

        if(src.id==='persons'){
            $("#project_detail").css('display','none');
            $("#company_detail").css('display','none');
            $("#person_detail").css('display','block');
            $("#page").css('display','none');
            $("#com_page").css('display','none');
            $("#footer").css('display','none');
            var li=src.parentNode;
            $(li).addClass('active');
            var li2=$("#project").parent();
            var li3=$("#company").parent();
            $(li2).removeClass('active');
            $(li3).removeClass('active');
            loading(true);
            tanKuang_person();
        }
    })

}

function tanKuang() {
    var company_url=window.location.href.split('=')[1];
    $.ajax({
        url:url+'/project_second/getCompanyInfoByUrl?company_url='+company_url,
        type:'get',
        dataType:'json',
        success:function (data) {
           console.log(data);
            $("#company_detail").css('display','block');
            $("#footer").css('display','block');
            $("#company_body tr").remove();
                var otbody=document.getElementById("company_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<8;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    detail_choice(j,data.data,oth);
                }
            loading(false);
        },
        error:function (data) {
            console.log(data)
            loading(false);
        }
    })

}
function tanKuang_person() {
   person_Page(person_page,person_size)

}
function person_Page(person_page,person_size){
    var company_url=window.location.href.split('=')[1];
    company_url=company_url.replace('#','');
    console.log(person_page+":"+person_size);
    var resUrl = url+'/project_second/getPeopleInfoByUrl?company_url='+company_url+'&page='+person_page+'&page_size='+person_size;
    console.log(resUrl);
    $.ajax({
        url:resUrl,
        type:'get',
        dataType:'json',
        success:function (data) {
            console.log(data);
            personTotal_num=data.total_page===0?1:data.total_page;
            $("#person_detail").css('display','block');
            $("#footer").css('display','block');
            $("#com_page").css('display','block');
            $("#persons_body tr").remove();
            for(var i=0;i<data.data.length;i++) {
                var otbody=document.getElementById("persons_body");
                var otr=document.createElement('tr');
                otbody.appendChild(otr);
                for(var j=0;j<11;j++){
                    var oth=document.createElement('th');
                    otr.appendChild(oth);
                    people_detail_choice(i,j,data.data,oth);
                }
            }
            if(personJudge){
                urlPerson=company_url;
                // console.log(urlCompany);
                // currentPage(index,total_num);
                personcurrentPage(person_index,personTotal_num,$('#company_lastPage'),$('#company_totalPage'),$('#company_pageNum'))
            }
            personJudge=false;
            loading(false);
        },
        error:function (data) {
            console.log(data)
            loading(false);
        }
    })
}
//企业数据显示
function detail_choice(j,data,oth){
    switch (j)
    {
        case 0:
            var text=document.createTextNode(data.basic.company_name);
            oth.appendChild(text);
            break;
        case 1:
            var text=document.createTextNode(data.basic.company_legalreprst);
            oth.appendChild(text);
            break;
        case 2:
            var text= document.createTextNode(data.basic.company_regadd);
            oth.appendChild(text);
            break;
        case 3:
            var qualification=data.qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_type_name);
                op.appendChild(text);
            }
            break;
        case 4:
            var qualification=data.qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_name);
                op.appendChild(text);
            }
            break;
        case 5:
            var qualification=data.qualification;
            for(var m=0;m<qualification.length;m++)
            {
                var op=document.createElement('p');
                oth.appendChild(op);
                var text=document.createTextNode(qualification[m].ion_institution);
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
//人员数据显示
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

                company_peopleNum.push(data[i].people_project);
                oth.setAttribute('index',company_detail++);

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

$('#persons_body').click(function (e) {
    // console.log(1);
    var e = e||window.event;
    var el = e.srcElement||e.target;
    el= el.className === "people_num"?el:el.parentNode.parentNode;
    var index = el.getAttribute('index');
    console.log(index);
    if (el.className==='people_num'&&index!='null'){

        var index = $(el).attr('index');
        console.log(index);
        console.log(company_peopleNum[index]);
        companyforMatArr(company_peopleNum[index]);
        companyshowPeopleData(company_peopleNum[index])
    }

});
function companyshowPeopleData(dataNum) {
// var e = window.event||e;
//    var el = e.target||e.srcElement;
//  var node = el.id||el.parentNode.id;
    // if(node=="people_change"){
    console.log(dataNum);
    var height=$(document).height();
    var width = $(document).width();
    $('#mask').height(height);
    $('#mask').width(width);
    $('#num_remove').css('display','block');

    $('#showPeopleNum').css('display','block');
    cominitialPeopleNum($('#detail_num'),dataNum);

    // }

}
/**
 * 添加信息在页面上
 * @param node
 * @param arr
 */
function cominitialPeopleNum(node,arr) {
    console.log(arr);

    for(var i in arr){

        var tr =document.createElement('tr');
        for(var j in arr[i]){
            var str=document.createElement('td');
            if(j=="project_url"){
                var a= document.createElement('a');
                a.innerHTML=arr[i][j];
                a.href=arr[i][j];
                str.appendChild(a);
            }else{
                str.innerHTML=arr[i][j];
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
    $('#num_remove').css('display','none');
    $('#detail_num').html('')


});
function companyforMatArr(arr) {
    for(var i in arr){
        for (var j in arr[i]){
            if(j=='project_url'){
                arr[i][j]="http://jzsc.mohurd.gov.cn/dataservice/query/project/projectDetail/"+arr[i][j];
            }
        }
    }
}
function xiangqing(project_url) {
    //点击详情
    $('h5').one('click',function(e){

        var el = e || window.event;
        var src = el.target || el.srcElement;
        loading(true);

        if(src.parentNode.id==='1')
        {
            appendDetail(project_url,1);
        }
        if(src.parentNode.id==='2')
        {
            appendDetail(project_url,2);
        }
        if(src.parentNode.id==='3')
        {
            appendDetail(project_url,3);

        }
        if(src.parentNode.id==='4')
        {
            appendDetail(project_url,4);
        }
        if(src.parentNode.id==='5')
        {
            appendDetail(project_url,5);

        }

    })

}
function appendDetail(project_url,detail_type) {
    loading(true);
    var company_url=window.location.href.split('=')[1];
    // console.log(url+'/project_second/getProjectDetail?company_url='+company_url+'&project_url='+project_url+'&detail_type='+detail_type)

    $.ajax({
        url:url+'/project_second/getProjectDetail?company_url='+company_url+'&project_url='+project_url+'&detail_type='+detail_type,
        type:'get',
        success:function (data) {
            console.log(data);
            loading(false);
            $("#"+detail_type+' .det').css('display','block');
            switch (detail_type)
            {
                case 1:
                    var contract=data.data.bid;
                    if(contract.length===0)
                    {
                        $("#"+detail_type+' .det').css('display','none');
                        var text=$("#"+detail_type+' h5').text();
                        text=text.split('>>')[0]+">>";
                        text=text+"<i style='color: red'>暂无数据</i>";
                        $("#"+detail_type+' h5').html(text);
                        // $("#"+i+" h5").text(text);

                        break;
                    }

                    $("#person_tankuang_body1 tr").remove();
                    for(var i=0;i<contract.length;i++)
                    {
                        var otbody=document.getElementById("person_tankuang_body1");
                        var otr=document.createElement('tr');
                        otbody.appendChild(otr);
                        for(var j=0;j<9;j++){
                            var oth=document.createElement('th');
                            otr.appendChild(oth);
                            person_tankuang_information1(j,contract[i],oth);
                        }
                    }
                    break;
                case 2:
                    var contract=data.data.censor;
                    if(contract.length===0)
                    {
                        $("#"+detail_type+' .det').css('display','none');
                        var text=$("#"+detail_type+' h5').text();
                        text=text.split('>>')[0]+">>";
                        text=text+"<i style='color: red'>暂无数据</i>";
                        $("#"+detail_type+' h5').html(text);
                        break;
                    }
                    $("#person_tankuang_body2 tr").remove();
                    for(var i=0;i<contract.length;i++)
                    {
                        var otbody=document.getElementById("person_tankuang2_body2");
                        var otr=document.createElement('tr');
                        otbody.appendChild(otr);
                        for(var j=0;j<2;j++){
                            var oth=document.createElement('th');
                            otr.appendChild(oth);
                            person_tankuang_information2(j,contract[i],oth);
                        }
                    }
                    break;
                case 3:
                    var contract=data.data.contract;
                    if(contract.length===0)
                    {
                        $("#"+detail_type+' .det').css('display','none');
                        var text=$("#"+detail_type+' h5').text();
                        text=text.split('>>')[0]+">>";
                        text=text+"<i style='color: red'>暂无数据</i>";
                        $("#"+detail_type+' h5').html(text);
                        // $("#"+i+" h5").text(text);
                        break;
                    }
                    $("#person_tankuang_body3 tr").remove();
                    for(var i=0;i<contract.length;i++)
                    {
                        var otbody=document.getElementById("person_tankuang_body3");
                        var otr=document.createElement('tr');
                        otbody.appendChild(otr);
                        for(var j=0;j<6;j++){
                            var oth=document.createElement('th');
                            otr.appendChild(oth);
                            person_tankuang_information3(j,contract[i],oth);
                        }
                    }
                    break;
                case 4:
                    var contract=data.data.permit;
                    if(contract.length===0)
                    {
                        $("#"+detail_type+' .det').css('display','none');

                        var text=$("#"+detail_type+' h5').text();
                        text=text.split('>>')[0]+">>";
                        text=text+"<i style='color: red'>暂无数据</i>";
                        $("#"+detail_type+' h5').html(text);
                        // $("#"+i+" h5").text(text);
                        break;
                    }
                    $("#person_tankuang_body4 tr").remove();
                    for(var i=0;i<contract.length;i++)
                    {
                        var otbody=document.getElementById("person_tankuang_body4");
                        var otr=document.createElement('tr');
                        otbody.appendChild(otr);
                        for(var j=0;j<11;j++){
                            var oth=document.createElement('th');
                            otr.appendChild(oth);
                            person_tankuang_information4(j,contract[i],oth);
                        }
                    }
                    break;
                case 5:
                    var contract=data.data.finish;
                    if(contract.length===0)
                    {
                        $("#"+detail_type+' .det').css('display','none');

                        var text=$("#"+detail_type+' h5').text();
                        text=text.split('>>')[0]+">>";
                        text=text+"<i style='color: red'>暂无数据</i>";
                        $("#"+detail_type+' h5').html(text);
                        // $("#"+i+" h5").text(text);
                        break;
                    }
                    $("#person22_tankuang_body5 tr").remove();
                    for(var i=0;i<contract.length;i++)
                    {
                        var otbody=document.getElementById("person_tankuang_body5");
                        var otr=document.createElement('tr');
                        otbody.appendChild(otr);
                        for(var j=0;j<7;j++){
                            var oth=document.createElement('th');
                            otr.appendChild(oth);
                            person_tankuang_information5(j,contract[i],oth);
                        }
                    }
                    break;

            }


        },
        error:function (data) {
            console.log(data)
        }
    })
}

$('#export').click(function(){
    var fear="company_url="+urlCompany;
    // console.log(fear);
    loading(true);
companyExport(fear);
});

/**
 * 导出数据的连接
 * @param fear
 */
function companyExport(fear) {
    var url=" http://47.92.205.189/project_second/exportProjectV2?"+fear;
    // console.log(url);
    $.ajax({
        url:url,
        type:"get",
        success:function (e) {
            loading(false);
            console.log(e);
            // console.log(e.data.path);
            window.location.href = 'http://47.92.205.189/upload/file/'+e.data.path;
        },error:function (data) {
            console.log(data);
        }
    })
}