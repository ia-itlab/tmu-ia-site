var current = new Date();
var is_darkmode = false;
if (sessionStorage.getItem('darkmode') == 'true') {
  is_darkmode = true;
}
else {
  if (0 <= current.getHours() <= 6 || 18 <= current.getHours() <= 24) {
    is_darkmode = true;
  }
  else {
    is_darkmode = false;
  }
  sessionStorage.setItem('darkmode', is_darkmode);

}

setDarkmode();
console.log(`time is ${current.getHours()} and darkmode ${is_darkmode}`);

function toggleDarkmode() {
  // --color-background:#1F1F1F;
  // --color-text-muted: #737373;
  // --color-text: #fff;
  // --color-header: rgba(31,31,31,0.5);
  is_darkmode = !is_darkmode;
  setDarkmode();

}

function setDarkmode() {
  if (is_darkmode) {
    document.querySelector(':root').style.setProperty('--color-text', "#fff");
    document.querySelector(':root').style.setProperty('--color-text-muted', "#737373");
    document.querySelector(':root').style.setProperty('--color-background', "#1f1f1f");
    document.querySelector(':root').style.setProperty('--color-header', "rgba(31,31,31,0.9)");
  }
  else {
    document.querySelector(':root').style.setProperty('--color-text', "#1f1f1f");
    document.querySelector(':root').style.setProperty('--color-text-muted', "#737373");
    document.querySelector(':root').style.setProperty('--color-background', "#fff");
    document.querySelector(':root').style.setProperty('--color-header', "rgba(255,255,255,0.9)");
  }
  sessionStorage.setItem('darkmode', is_darkmode);
}