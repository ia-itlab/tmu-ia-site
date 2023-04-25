// ウェブフォント読み込みにタイムアウトを設ける。
// 3秒経過しても読み込まれなければ先にシステムフォントで表示する
// Ref: https://qiita.com/hirossyi73/items/6551bc32f0d8c2e56092
setTimeout(function () {
  document.getElementsByTagName("html")[0].classList.add("loading-delay");
}, 3000);


window.addEventListener('DOMContentLoaded', function () {

  var current = new Date();
  //console.log(`time is ${current.getHours()} and darkmode ${sessionStorage.getItem('darkmode')}`);
  if (sessionStorage.getItem('colormode') === null) {
    if (
      (0 <= current.getHours() && current.getHours() <= 6) ||
      (18 <= current.getHours() && current.getHours() <= 24)
    ) {
      sessionStorage.setItem('colormode', 'dark');
    }
    else {
      sessionStorage.setItem('colormode', 'light');
    }
  }
  let today = nf(current.getFullYear(), 4) + nf(current.getMonth() + 1, 2) + nf(current.getDate(), 2);
  //console.log(today);
  setTimeout(function () {
    setColorMode();
  }, 500);


});

// NUM=値 LEN=桁数
function nf(NUM, LEN) {
  return (Array(LEN).join('0') + NUM).slice(-LEN);
}

function toggleDarkmode() {
  if (sessionStorage.getItem('colormode') == 'dark') {
    sessionStorage.setItem('colormode', 'light');
  }
  else if (sessionStorage.getItem('colormode') == 'light') {
    sessionStorage.setItem('colormode', 'dark');
  }
  else {
    sessionStorage.setItem('colormode', 'light');
  }
  setColorMode();

}

function setColorMode() {
  let text_colormode = document.querySelector('#text_colormode');
  if (sessionStorage.getItem('colormode') == 'dark') {
    document.querySelector(':root').style.setProperty('--color-text', "#ffffff");
    document.querySelector(':root').style.setProperty('--color-text-muted', "#8C8C8C");
    document.querySelector(':root').style.setProperty('--color-background', "#1f1f1f");
    document.querySelector(':root').style.setProperty('--color-header', "rgba(31,31,31,0.9)");
    document.querySelector('#tmu_logo').style.setProperty('filter', 'invert(100%)');
    if (text_colormode) text_colormode.innerHTML = 'dark';
  }
  else if (sessionStorage.getItem('colormode') == 'light') {
    document.querySelector(':root').style.setProperty('--color-text', "#1f1f1f");
    document.querySelector(':root').style.setProperty('--color-text-muted', "#595959");
    document.querySelector(':root').style.setProperty('--color-background', "#F5F5F5");
    document.querySelector(':root').style.setProperty('--color-header', "rgba(245,245,245,0.9)");
    // document.querySelector('#tmu_logo').style.setProperty('filter', 'invert(0%)');
    if (text_colormode) text_colormode.innerHTML = 'light';
  }
  else {

  }
  // else if (sessionStorage.getItem('colormode') == 'christmas') {
  //   document.querySelector(':root').style.setProperty('--color-text', "#FFFFFF");
  //   document.querySelector(':root').style.setProperty('--color-text-muted', "#DDDDDD");
  //   document.querySelector(':root').style.setProperty('--color-background', "#EA3458");
  //   document.querySelector(':root').style.setProperty('--color-header', "rgba(58, 131, 108,1.0)");
  //   text_colormode.innerHTML = 'Xmas';
  //   //console.log(`darkmode is ${sessionStorage.getItem('darkmode')}`);
  // }
}


function createIALoadingElement() {
  /* <div class="spinner-border" role="status" style="color: var(--color-text);">
                    IA
                </div> */
  let element_return = document.createElement('div');
  element_return.classList.add('spinner-border');
  element_return.setAttribute('role', "status");
  element_return.style.color = 'var(--color-text)';
  element_return.innerHTML = ' IA';
  return element_return;
}