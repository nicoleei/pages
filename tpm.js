$(function() {
  //页面数据加载方法
  function godata(detail) {
    var tpl = "";
    $.map(detail, function(item) {
      tpl += '<tr>' +
        '<td>' + item.name + '</td>' +
        '<td>' + item.phone + '</td>' +
        '<td>' + item.statu + '</td>' +
        '<td>' + item.id + '</td>' +
        '</tr>';
    });

    $("#data-content").html(tpl);
  }

  //翻页
  function page(incount, currentpage, pageSize) {
    var pages = Math.ceil(incount / pageSize);
    var pagetpl = "";
  
    

    for (var i = 1; i <= pages; i++) {
      if (i === currentpage) {
        pagetpl += "<li class='num curr' data-page='" + i + "'>" + i + "</li>";
      } else {
        pagetpl += "<li class='num' data-page='" + i + "'>" + i + "</li>";
      }
      if(i>6){
        pagetpl += "<li class='num'>...</li>";
        break;
      }

      
    }
    

    var prenum = currentpage-1;
    var prenum2 = currentpage-2;
    var nextnum = currentpage+1;
    var nextnum2 = currentpage+2;
    var last3page = pages-3;
    if(pages<6){
       for (var k = 1; k <= pages; k++) {
      if (k === currentpage) {
        pagetpl += "<li class='num curr' data-page='" + k + "'>" + k + "</li>";
      } else {
        pagetpl += "<li class='num' data-page='" + k + "'>" + k + "</li>";
      }
      
    }

    }
    if(currentpage>6&&currentpage<last3page){
     pagetpl = "<li class='num'>1</li>"+
               "<li class='num'>2</li>"+
               "<li class='num dot'>...</li>"+
               "<li class='num'>"+prenum2+"</li>"+
              "<li class='num'>"+prenum+"</li>"+
                "<li class='num curr'>"+currentpage+"</li>"+
                "<li class='num'>"+nextnum+"</li>"+
                "<li class='num'>"+nextnum2+"</li>"+
                "<li class='num dot'>...</li>";
     

    }
  
    if(currentpage>=last3page&&currentpage<pages){
       pagetpl = "<li class='num'>1</li>"+
               "<li class='num'>2</li>"+
               "<li class='num dot'>...</li>"+
               "<li class='num'>"+prenum2+"</li>"+
              "<li class='num'>"+prenum+"</li>"+
                "<li class='num curr'>"+currentpage+"</li>"+
                "<li class='num'>"+nextnum+"</li>";
              
                

    }

   if(currentpage == pages){
      pagetpl = "<li class='num'>1</li>"+
               "<li class='num'>2</li>"+
               "<li class='num dot'>...</li>"+
               "<li class='num'>"+prenum2+"</li>"+
                "<li class='num '>"+prenum+"</li>"+
                "<li class='num curr'>"+currentpage+"</li>";
      
    }
   
    
    var finapagetpl = "<li class='num' data-page='"+prenum+"'><上一页</li>"+pagetpl+"<li class='num' data-page='"+nextnum+"'>下一页></li>";

    $("#pageArea").html(finapagetpl);
    $("#all_count").text(pages);

    if (currentpage == 1) {
      
      $("#pageArea li:first").addClass("prepage");
      $("#pageArea li:first").click(function(){
        return false;
      });
    }
    if(currentpage == pages){
      $("#pageArea li:last").addClass("prepage");
      $("#pageArea li:last").click(function(){
        return false;
      });
    }
   
    

  }

  //数据加载请求
  function goAjax(_page, pageSize) {
    $.ajax({
      type: "post",
      url: "/data",
      data: {
        "page": _page,
        "pageSize": pageSize
      },
      cache: false,
      dataType: "json",
      success: function(msg) {
        var pageincount = msg.incount;
        var pageSize = msg.pageSize;
        var currentpage = msg.currentpage;

        var detail = msg.data;
        if (msg.result == "ok") {

          godata(detail);
          page(pageincount, currentpage, pageSize);
        } else {
          alert(msg);
        }
      },
      error: function(msg) {
        alert(msg);
      }
    });

  }

  goAjax(1, 4);

  $(document).delegate('li.num', 'click', function() {
    var page = $(this).data('page') - 0;
    if ($(this).hasClass('curr')) {
      return false;
    }

    goAjax(page, 4);
  });


$("#go_submit").click(function(){
  var currentpage = $("#go_page").val();
  goAjax(currentpage,4);
  // $("#pageArea li").removeClass("curr");


});
 



});