//fadeInの為の.contentsデフォルト透過処理
$("head").append(
  '<style>.contents{ opacity: 0;-ms-filter:"alpha( opacity=0 )";filter: alpha( opacity=0 ); }</style>'
);

//ページトップへのスクロール
$(function() {
  var topBtn = $(".scroll-top");
  topBtn.hide();
  //スクロールが100に達したらボタン表示
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  //スクロールしてトップ
  topBtn.click(function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      500
    );
    return false;
  });

  //contentのフェード
  $(".contents").fadeMover();
});

//Googleカスタム検索
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
