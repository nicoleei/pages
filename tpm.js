$(function(){
  //页面数据加载方法
 function godata(detail){
   var tpl = "";
   $.map(detail,function(item){
    tpl += '<tr>'+
             '<td>' +item.name+ '</td>'+
             '<td>' +item.phone+ '</td>'+
             '<td>' +item.statu+ '</td>'+
             '<td>' +item.id+ '</td>'+
            '</tr>';
   });
   
   $("#data-content").html(tpl);
 }

//数据加载请求
  function goAjax(){


    $.ajax({
    type:"get",
    url:"data.js",
    data:{
     "id":$("#mid").val(),
     "mname":$("#mname").val()
    },
    dataType:"json",
    success:function(msg){
      var detail = msg.data;
      if(msg.result == "ok"){
        
        godata(detail);
      }else{
        alert(msg);
      }
    },
    error:function(msg){
      alert(msg);
    }
  });

 }
   
goAjax();
 //查询请求
 $("#search").click(function(){
     goAjax();
   

 });

});