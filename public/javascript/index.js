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
  setColorMode();
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
    if (text_colormode) text_colormode.innerHTML = 'dark';
  }
  else if (sessionStorage.getItem('colormode') == 'light') {
    document.querySelector(':root').style.setProperty('--color-text', "#1f1f1f");
    document.querySelector(':root').style.setProperty('--color-text-muted', "#595959");
    document.querySelector(':root').style.setProperty('--color-background', "#F5F5F5");
    document.querySelector(':root').style.setProperty('--color-header', "rgba(245,245,245,0.9)");
    if (text_colormode) text_colormode.innerHTML = 'light';

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

