//url
var http='http://47.92.205.189';
var data_person=[];
var register_type='';

$.ajax({
    url:http+'/people_condition/getcondition',
    type:'get',
    success:function (data) {

        var data=data.data;
        // console.log(data)
        for(var i=0;i<data.length;i++)
        {
            data_person.push(data[i]);
            $(".category_person").append('   ' +
                ' <option id='+data[i].id+' value='+data[i].register_type+' >'+data[i].register_type+'</option>');
        }
    },
    error:function (data) {
        console.log(data);
    }
});
// console.log(data_person);

$(".category_person").change(function(){
    perreloadNode(1);

    var it = $(this).find("option:selected");
    var id=$(it).attr('id');
    var register_type=$(it).html();
    // console.log(data_person[id-1]);
    var valArray = data_person[id-1]._child;
    if(valArray){
        var res =judgeState(valArray);

        // if(res){
        //        var ansArry = splite(valArray);
        //      //  console.log(ansArry);
        //     preappendNode(ansArry);
        //     //  for (var j=0;j<ansArry.length;j++){
        //     //     var it =$("<option></option>");
        //     //     $(it).attr('id',ansArry[j].id);
        //     //     $(it).attr('register_type',ansArry[j].register_type);
        //     //     $(it).val(ansArry[j].register_type);
        //     //     $(it).html(ansArry[j].register_type);
        //     //     $('#grade_person').append($(it))
        //     // }
        // }else {
        preappendNode(valArray);
        // }


    }else {
        $('#grade_person').css('display','none');
        gradeChange(register_type);
        //     var num=data_person[id-1];
        //


    }
    // register_type=$(".category_person").val();
    // // alert($(this).find("option:checked").attr("id"));
    // $(".grade_person option").remove();
    // var id_person= $(".category_person option:selected").attr('id');
    // for(var i=0;i<data_person.length;i++)
    // {
    //     if(data_person[i].id===id_person)
    //     {
    //         var child=data_person[i]._child;
    //         $(".grade_person").append('<option value="">名称/等级</option>')
    //         if(child!==undefined){
    //             for (var j = 0; j < child.length; j++) {
    //                 $(".grade_person").append('<option pid=' + child[j].pid + ' value=' + child[j].register_type + ' >' + child[j].register_type + '</option>');
    //             }
    //             $(".grade_person").change(function(){gradeChange()});
    //         }
    //         else
    //             gradeChange();
    //     }
    // }
});



/*
* 专业*/
$('#grade_person').change(function () {
    perreloadNode(2);
    var it = $(this).find("option:selected");
    var register_type=$(it).attr("register_type");
    // console.log(register_type);
    gradeChange(register_type);

});

/**
 * 等级
 */
function gradeChange(register_type) {
    $.ajax({
        url:http+'/people_condition/getMajor',
        type:'post',
        data:{
            register_type:register_type
        },
        success:function (data) {

            // console.log(data.data);
            if(data.data.length!=0){
                var data=data.data;
                // console.log(data);
                $(".major_person option").remove();
                $(".major_person").append('<option value="">专业</option>')
                for(var i=0;i<data.length;i++)
                {
                    $(".major_person").append('<option value='+data[i]+' >'+data[i]+'</option>');
                }
            }else {
                $('#per_major').css('display','none')
            }
        },
        error:function (data) {
            console.log(data);
        }
    })
}


/**
 * 判断是否含有等级
 * @param valArray
 * @returns {boolean}
 */
function judgeState(valArray) {
    // console.log(valArray.length);
    var len = valArray.length;
    for(var i=0;i<len;i++){
        if(valArray[i].register_type.indexOf("二级")>=0||valArray[i].register_type.indexOf("乙级")>=0){return true}

    }
    // console.log("false")
    return false;
}




function preappendNode(valArray) {
    // console.log(valArray);
    for(var i=0;i<valArray.length;i++)
    {
        var it =$("<option></option>");
        $(it).attr('id',valArray[i].id);
        $(it).attr('register_type',valArray[i].register_type);
        $(it).val(valArray[i].register_type);
        $(it).html(valArray[i].register_type);
        $('#grade_person').append($(it))
    }
}

/**
 * 初始化数据
 */

function perreloadNode(index) {
    var select=$('#person_select').find('li').find('select');
    for(var i=index,len=select.length;i<len;i++){
        $(select[i]).css('display','block');
        if($(select[i]).children().length>=2){
            perremoveNode($(select[i]));
        }
    }
}

function perremoveNode(node) {
    var nodes = $(node).children();


    var len = nodes.length;
    for(var i=1;i<len;i++){
        $(nodes[i]).remove();
    }
}

/**
 * 点击save按钮获取人员需要提交的数据
 */
function getpeopleVal(resobj) {
 var perobj =perGetChoose();

// console.log(perobj);
    if(perobj.register_major||perobj.register_type){
        resobj.request.people_condition=perobj;
    }


}

/**
 * 获取到人员选择的数据
 * @returns {{register_type: null, register_major: null}}
 */

function perGetChoose() {
    var perobj={
        register_type:'',
        register_major:''
    };
    var type=[];
    var major=[];
    console.log(arr_person);
  for(var j =0,len = arr_person.length;j<len;j++){
      (function (finalobj) {
          console.log(finalobj)
          if(!finalobj.grade&&!finalobj.major) {
              type.push(finalobj.category)

          }else if (finalobj.grade==''){
              major.push(finalobj.major);
              type.push(finalobj.category);
          }
          else {
              type.push(finalobj.grade);
              major.push(finalobj.major);


          }
      })(arr_person[j])
  }

if(major.length>=1){
    perobj.register_type=type.length>=2?type.join(','):type[0];
    perobj.register_major=major.length>=2?major.join(','):major[0];
}else if(major.length==0&&type.length==0){
    perobj.register_type="";
    perobj.register_major="";
}else{
    perobj.register_type=type.length>=2?type.join(','):type[0];
    perobj.register_major="";
}


    return perobj;

}







