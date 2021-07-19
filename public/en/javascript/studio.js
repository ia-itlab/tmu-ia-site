$(function(){
  // デバイスの種類を取得
  var getDevice = (function(){
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
      return 'smartPhone';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
      return 'tablet';
    } else {
      return 'pc';
    }
  })();

  // スマホ、タブレットでの処理
  if(getDevice !== 'pc'){
    $('.mask').css('display', 'none');
    $('.studio').children('div').click(function(){
      location.href = $(this).find('a').attr('href')
    });
  }
});
