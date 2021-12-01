var current = new Date();

if (sessionStorage.getItem('darkmode') === null) {
  console.log(`time is ${current.getHours()} and darkmode ${sessionStorage.getItem('darkmode')}`);
  if ((0 <= current.getHours() && current.getHours() <= 6) ||
    (18 <= current.getHours() && current.getHours <= 24)) {
    sessionStorage.setItem('darkmode', 'true');
  }
  else {
    sessionStorage.setItem('darkmode', 'false');
  }
}
else {

}

setDarkmode();


function toggleDarkmode() {
  // --color-background:#1F1F1F;
  // --color-text-muted: #737373;
  // --color-text: #fff;
  // --color-header: rgba(31,31,31,0.5);
  if (sessionStorage.getItem('darkmode') == 'true') {
    sessionStorage.setItem('darkmode', 'false');
  }
  else if (sessionStorage.getItem('darkmode') == 'false') {
    sessionStorage.setItem('darkmode', 'true');
  }
  setDarkmode();

}

function setDarkmode() {
  if (sessionStorage.getItem('darkmode') == 'true') {
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
  console.log(`darkmode is ${sessionStorage.getItem('darkmode')}`);
}