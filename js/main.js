$(function () {
  function resize() {
    var windowW = $(window).width();
    var initWH = 1340 / 820;
    //1440尺寸下都用1280
    if (windowW <= 1440) {
      windowW = 1280;
    } else {
    }
    $("body,html").css({
      fontSize: (windowW * 12) / 1280 + "px",
    });
  }
  resize();
  $(window).bind("resize", resize);
});
$(document).ready(function () {
  // 轮播图自适应
  //$('.swiper-container').slide({mainCell:".bd ul",effect:"left",autoPlay:true});
  // $('.swiper-container').PageSwitch({
  //     direction:'horizontal',
  //     easing:'ease-in',
  //     duration:1000,
  //     autoPlay:true,
  //     loop:'false'
  // });

  //截取一定长度的字符串
  function len(str, num) {
    if (str.length <= num) {
      return str;
    } else {
      return str.substring(0, num) + "...";
    }
  }
  for (var i = 0; i < $(".newsSubTitle>span").length; i++) {
    var content = $(".newsSubTitle>span").eq(i).html();
    $(".newsSubTitle>span").eq(i).html(len(content, 76));
  }

  function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; //IE版本<=7
      }
    } else if (isEdge) {
      return "edge"; //edge
    } else if (isIE11) {
      return 11; //IE11
    } else {
      return -1; //不是ie浏览器
    }
  }
});
