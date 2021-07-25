//fadeInの為の.contentsデフォルト透過処理
$("head").append(
  '<style>.wrapper{ opacity: 0;-ms-filter:"alpha( opacity=0 )";filter: alpha( opacity=0 ); }</style>'
);

//ページトップへのスクロール
$(function () {
  /*var topBtn = $(".scroll-top");
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      500
    );
    return false;
  });*/

  //contentのフェード
  $(".wrapper").fadeMover();
});

/*//Googleカスタム検索
(function() {
  //↓IDをここで指定する（サンプルのため山浦のポートフォリオサイト内検索のID）
  var cx = "007245914538993224667:ogdkdkvq-bc";
  var gcse = document.createElement("script");
  gcse.type = "text/javascript";
  gcse.async = true;
  gcse.src = "https://cse.google.com/cse.js?cx=" + cx;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(gcse, s);
})();
*/




(function ($) {
  $(function () {
    $('.sub-menu').on({
      'mouseenter': function () {
        $(this).addClass('is-active');
      },
      'mouseleave': function () {
        $(this).removeClass('is-active');
      }
    });


    $('#nav-toggle,#overlay').on('click', function () {
      $('body').toggleClass('open');
    });
  });
})(jQuery);


console.log(location.pathname);
$('.sidebar li a').each(function () {
  var href = $(this).attr('href');
  if (location.href.match(href)) {
    $(this).addClass('here');
  } else {
    $(this).removeClass('here');
  }
});
if (location.pathname == '/labview.html') {
  $('.sidebar li a').first().addClass('here');
} else if (location.pathname == '/') {
  $('.sidebar li a').first().addClass('here');
}



// 画像ダウンロード//https://qumeru.com/magazine/408
function downloadImg() {
  // ファイル情報
  const url = './images/ia_oc2021_vertualbg.jpg';
  const fileName = 'ia_oc2021_vertualbg.jpg';

  // IE用
  if (window.navigator.msSaveOrOpenBlob) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (xhr.status !== 200) {
        return false;
      }
      window.navigator.msSaveOrOpenBlob(xhr.response, fileName);
    }
    xhr.send();
  } else { // Chromeなど
    let link = document.getElementById("download");
    link.href = url;
    link.download = fileName;
  }
}