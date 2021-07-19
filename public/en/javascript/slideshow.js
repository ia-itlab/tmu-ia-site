function slickImage(){
  $(function(){
    $('.viewer').slick({
      arrows: false,
      dots: true,
      infinite: true,
      draggable: true,
      speed: 300,
      fade: true,
      cssEase: 'linear',
      pauseOnHover: false,
      autoplay: true,
      autoplaySpeed: 4000,
      variableWidth: false,
      centerMode: true
    });
  });
}
