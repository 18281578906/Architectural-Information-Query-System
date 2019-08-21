var detailObj=null;
//button
var add=document.getElementsByClassName('add');
var save=document.getElementsByClassName('category');
var insert=document.getElementsByClassName('insert');
var apper_p=document.getElementById('apper');
var num=document.getElementById('num');
var value='企业';
var search=document.getElementById('search');
//company
var line_company=$('#company_line')[0];
var company_items=[];
//person
var line_person=$('#people_line')[0];


var arr_person=new Array();
//project
var line_project=$('#project_line')[0];
var proFlag=false;

// var proobj={
//     project_type:null,
//     project_nature:null,
//     project_use:null,
//     bid_way:null,
//     bid_money:null,
//     bid_date_start:null,
//     bid_date_end:null,
//     contract_type:null,
//     contract_money:null,
//     contract_scale:null,
//     contract_date_start:null,
//     contract_date_end:null,
//     finish_money:null,
//     finish_area:null,
//     finish_realbegin_start:null,
//     finish_realbegin_end:null,
//     finish_realfinish_start:null,
//     finish_realfinish_end:null
// };
var proobj={};
//search
var se=document.getElementsByClassName('type');
for(var j=0;j<se.length;j++) {
    se[j].onclick=function () {
        if (this.checked) {
            value=this.value;
            search.setAttribute('placeholder','请输入'+value+'名称')
        }
    }
}
//add
for(var i=0;i<add.length;i++) {
    if(i===0)
    {
        add[i].onclick=function () {
            addChoice_company();}
    }
    if(i===1) {
        add[i].onclick = function () {
            addChoice_person();

        }
    }
    if(i===2) {
        add[i].onclick = function () {
            // addChoice_project();
            finaaddProject();

        }
    }
}
//click
for(var i=0;i<insert.length;i++) {
    insert[i].onclick=function (e) {
        var el=e||e.target;
        var src=el.srcElement||el.target;

        if(src.className==='save save1')
        {
            var text_company=line_company.innerText;
            if(text_company==="")
            {
                var text='请选择企业资质条件';
                Appear(text);
            }

        }
        if(src.className==='save save2'){
            var text_person=line_person.innerText;
            if(text_person==="")
            {
                var text='请选择人员资质条件';
                Appear(text);
            }
            else {
                saveSelect(2);
            }
        }
        if(src.className==='save save3'){
            var text_person=line_project.innerText;
            if(text_person==="")
            {
                var text='请选择项目条件';
                Appear(text);
            }
            else {
                saveSelect(3);
            }
        }
    }
}

//person
function addChoice_person() {
    var choice_person={
        category:null,
        // call:null,
        grade:null,
        major:null,
        // number:null,
    };
    var category_person=document.getElementsByClassName('category')[1];
    var call_person=document.getElementsByClassName('call')[0];
    var grade_pereson=document.getElementsByClassName('grade')[1];
    var major_pereson=document.getElementsByClassName('major')[1];
    // var number_person=document.getElementById('number');
    var category=category_person.options[category_person.selectedIndex].value;
    // var call=call_person.options[call_person.selectedIndex].value;
    var grade=grade_pereson.options[grade_pereson.selectedIndex].value;
    var major=major_pereson.options[major_pereson.selectedIndex].value;
    // var number=number_person.value;
    if(category==="")
    {
        var text='请选择人员资质条件';
        Appear(text);

    }
    else {
        choice_person.category=category;
        // choice_person.call=call;
        choice_person.grade=grade;
        choice_person.major=major;
        // choice_person.number=number;
        arr_person.push(choice_person);
        var p= document.createElement('p');
        p.innerHTML=category+" "+grade+" "+major+'<img src="img/delete.jpg" id="delete2" class="delete delete2" alt="">';
        line_person.appendChild(p);
        var delet=document.getElementsByClassName('delete2');
        Delete(line_person,delet);
    }

}
//company
function addChoice_company() {
    var category_company=document.getElementsByClassName('category')[0];
    var big_type_company=document.getElementsByClassName('big_type')[0];
    var litter_type_company=document.getElementsByClassName('litter_type')[0];
    var major_company=document.getElementsByClassName('major')[0];
    var grade_company=document.getElementsByClassName('grade')[0];
    // var region_company=document.getElementsByClassName('region')[0];
    // var register_place=document.getElementsByClassName('register_place')[0];

    var category=category_company.options[category_company.selectedIndex].value;
    var big_type=big_type_company.options[big_type_company.selectedIndex].value;
    var litter_type=litter_type_company.options[litter_type_company.selectedIndex].value;
    var major=major_company.options[major_company.selectedIndex].value;
    var grade=grade_company.options[grade_company.selectedIndex].value;

    if(category==="")
    {
        var text='请选择企业资质条件';
        Appear(text);
    }
    else {



        var p= document.createElement('p');
        p.innerHTML=category+" "+big_type+" "+litter_type+" "+major+" "+grade+" "+'<img src="img/delete.jpg" id="delete1" class="delete" alt="">';
        line_company.appendChild(p);
        var delet=document.getElementsByClassName('delete');
        Delete(line_company,delet);

    }

}
//project
function addChoice_project() {

    //project
    var category_project=document.getElementsByClassName('category_project')[0];
    var build_project=document.getElementsByClassName('build_project')[0];
    var use_project=document.getElementsByClassName('use_project')[0];
    var toubiao_type_project=document.getElementsByClassName('toubiao_type_project')[0];
    var zhongbiao_number_project=document.getElementsByClassName('zhongbiao_number_project')[0];
    var hetong_type_project=document.getElementsByClassName('hetong_type_project')[0];
    var hetong_money_project=document.getElementsByClassName('hetong_money_project')[0];
    // var xuke_money_project=document.getElementsByClassName('xuke_money_project')[0];
    // var xuke_mianji_project=document.getElementsByClassName('xuke_mianji_project')[0];
    var shi_zaojia_project=document.getElementsByClassName('shi_zaojia_project')[0];
    var shi_mianji_project=document.getElementsByClassName('shi_mianji_project')[0];
    var kai_date_project=document.getElementsByClassName('kai_date_project')[0];
    var jun_date_project=document.getElementsByClassName('jun_date_project')[0];

    var category=category_project.options[category_project.selectedIndex].value;
    var build_project=build_project.options[build_project.selectedIndex].value;
    var use_project=use_project.options[use_project.selectedIndex].value;
    var toubiao_type_project=toubiao_type_project.options[toubiao_type_project.selectedIndex].value;
    var zhongbiao_number_project=zhongbiao_number_project.value;
    var hetong_type_project=hetong_type_project.options[hetong_type_project.selectedIndex].value;
    var hetong_money_project=hetong_money_project.value;
    // var xuke_money_project=xuke_money_project.value;
    // var xuke_mianji_project=xuke_mianji_project.value;
    var shi_zaojia_project=shi_zaojia_project.value;
    var shi_mianji_project=shi_mianji_project.value;
    var kai_date_project=kai_date_project.value;
    var jun_date_project=jun_date_project.value;

        choice_project.category_project=category;
        choice_project.build_project=build_project;
        choice_project.use_project=use_project;
        choice_project.toubiao_type_project=toubiao_type_project;
        choice_project.zhongbiao_number_project=zhongbiao_number_project;
        choice_project.hetong_type_project=hetong_type_project;
        choice_project.hetong_money_project=hetong_money_project;
        // choice_project.xuke_money_project=xuke_money_project;
        // choice_project.xuke_mianji_project=xuke_mianji_project;
        choice_project.shi_zaojia_project=shi_zaojia_project;
        choice_project.shi_mianji_project=shi_mianji_project;
        choice_project.kai_date_project=kai_date_project;
        choice_project.jun_date_project=jun_date_project;

        var p= document.createElement('p');
        p.innerHTML=category+" "+build_project+" "+use_project+" "+toubiao_type_project+" "+zhongbiao_number_project+" "+hetong_type_project
            +" "+hetong_money_project+" "+shi_zaojia_project +" "+ shi_mianji_project+" "+
            kai_date_project+" "+jun_date_project+" "+'<img src="img/delete.jpg" id="delete1" class="delete delete3" alt="">';
        line_project.appendChild(p);
        var delet=document.getElementsByClassName('delete3');
        Delete(line_project,delet);

}


function finaaddProject() {

   if(!proFlag){
       var its = $('.project_select');
       var itsInput = $('.project_input');
       var visibleVal ='';
       for(var i=0,len=its.length;i<len;i++){

           (function (i) {
               var it =$(its[i]).find('option:selected').val();
               if(it){
                   visibleVal+=it+" ";
               }
           })(i)
       }
       for(var j=0,l=itsInput.length;j<l;j++){
           (function (j) {
               var inVal=$(itsInput[j]).val();
               if(inVal){
                   visibleVal+=inVal+" ";

               }
           })(j)
       }
       console.log(visibleVal);
       var p= document.createElement('p');
       p.innerHTML=visibleVal+'<img src="img/delete.jpg" id="delete1" class="delete delete3" alt="">';
       line_project.appendChild(p);
       var delet=document.getElementsByClassName('delete3');
       Delete(line_project,delet);
   }
    // setProSelectVal();



}
//delete
function Delete(line,delet) {

    var child=line.childNodes;
    var itName = $(line).attr('id');
    console.log(itName);

     console.log($(child));

    for(var d=0;d<delet.length;d++)
    {
        (function (d) {
            delet[d].onclick=function () {
           if(itName=='people_line'){
               console.log(arr_person);
               arr_person.splice(d,1);
                 $(child[d+1]).remove();
           }
           else if(itName=='company_line'){
               console.log(company_items);
               company_items.splice(d,1);
               $(child[d+1]).remove();
           }else if(itName=='project_line'){


               var objValue=this.parentNode.innerText;

               console.log(objValue);
               deleteProObj(objValue);
               proFlag=false;
               console.log(proobj);
               $(this).parent().remove();
               // $(child[d+1]).remove();

           }

            }
        })(d)
    }
}

//appear
function Appear(text) {
    var apper=document.getElementsByClassName('apper')[0];
    apper.style.cssText="display:block;";
    apper_p.innerText=text;
    setTimeout(function () {
        apper.style.cssText="display:none;";
    },2500);
}


/**
 * 点击save按钮提交数据
 */
function promitData() {

    var index =isLaw();
    if(index==0){
        alert("请选择查询条件!")
    }else {

        var resobj = {
            "request": {}
        };



      getCompanyCode(resobj);
        getpeopleVal(resobj);
        getLastVal(resobj);
      //   getProlast(resobj);
proFlag=false;
       // console.log(resobj);
        console.log(resobj);
        loading(true);
      connectFinish(resobj);
          detailObj =initDetailData(resobj);
          console.log(detailObj);
      //arr_person.length=0;//是否包含上次的数据
    }


}
$('#save').click(function () {
    console.log(proobj);

    promitData();
});

/**
 * 是否选择条件
 */
function isLaw() {
    var line = $('.line');
    var index=0;
    for(var i =0,len=line.length;i<len;i++){
      if($(line[i]).children().length>0){
          index++;
      }
        // if($(line[]).find('p')){
        //     index++;
        // }
    }
  // alert(index);
    return index;
}

/**
 * 请求数量的接口
 * @param resObj
 */
function connectFinish(resObj) {
    var url="http://47.92.205.189/index/getData";
 $.ajax({
     url:url,
     dataType:'json',
     type:"post",
     data:resObj,
     success:function (data) {
         loading(false);
         console.log(data);
         apperNum(data.count)
     },error:function (data) {
         loading(false);
         console.log(data);
     }
 })
}

/**
 * 出现数字
 * @param num
 */
function apperNum(num) {
    var numappear = $('#num');
    $(numappear).html(num)

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

/**
 * 点击查看详情，跳转到详情页面
 * 判断对象是否为空，如果为空的话就没有选择条件
 */
$('#showDetail').click(function () {

    console.log(detailObj);
   var num = $('#showDetail').html();
    if(Object.keys(detailObj).length==0){
        alert("您没有选择任何查询条件哟！或者当前查询结果为0")
        $('#showDetail').click(function (event) {
            event.preventDefault();

        })

    }else {

        window.localStorage.setItem('num',num);
        location.href="detail.html?detailObj="+JSON.stringify(detailObj);
        removeObjVal(detailObj);

    }
});

/**
 * 格式化请求详情数据的格式
 * @param resObj
 * @returns {{request: {}}}
 */
function initDetailData(resObj) {

    var bbb= JSON.parse(JSON.stringify(resObj).replace(/company_condition/g,"company_condition_detail").replace(/project_condition/g,"project_condition_detail").replace(/people_condition/g,"people_condition_detail"));
return bbb;
}

/**
 * 每次点击完查看详情的按钮后就清空原来的数据
 * @param obj
 */
function removeObjVal(obj) {
    for(var s in obj){
        delete obj[s]
    }
}

/**
 * 删除了之后把页面项目的情况删除了
 *
 * @param objValue
 */
function deleteProObj(objValue) {

    setProSelectVal();
console.log(objValue);
console.log(proobj);
    // proobj[objValue]=null;
    for (var s in proobj){
        if(proobj[s]&&objValue.indexOf(proobj[s])>=0){
            proobj[s]='';
        }
    }
}

/**
 * 重新设置
 */
function setProSelectVal() {


    var its = $('.project_select');
    var itsInput = $('.project_input');
    for(var i=0,len=its.length;i<len;i++){

        (function (i) {
           $(its[i]).find('option:first').prop("selected", 'selected');
        })(i)
    }
    for(var j=0,l=itsInput.length;j<l;j++){
        (function (j) {
            $(itsInput[j]).val('');

        })(j)
    }


}


