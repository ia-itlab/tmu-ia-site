var language = sessionStorage.getItem('language');
var language_hidden;

if (!language) {
    language = 'ja';
    sessionStorage.setItem('language', 'ja');
}

function initLanguage() {
    let ens = document.querySelectorAll('en');
    let jas = document.querySelectorAll('ja');
    if (language == 'ja') {
        for (en of ens) {
            en.hidden = true;
        }
        for (ja of jas) {
            ja.hidden = false;
        }
    }
    else if (language == 'en') {
        for (en of ens) {
            en.hidden = false;
        }
        for (ja of jas) {
            ja.hidden = true;
        }
    }
}
function toggleLanguage() {
    if (language == 'ja') {
        language = 'en';
        sessionStorage.setItem('language', language);
    }
    else {
        language = 'ja';
        sessionStorage.setItem('language', language);
    }
    let ens = document.querySelectorAll('en');
    let jas = document.querySelectorAll('ja');

    console.log(ens, jas);
    // if (!ens && !jas) {
    //     language = 'ja';
    //     language_hidden = 'en';
    //     return; // do nothing
    // }
    // else if (!ens) {
    //     language = 'ja';
    //     language_hidden = 'en';
    //     return; // do nothing
    // }

    if (language == 'ja') {
        for (en of ens) {
            en.hidden = true;
        }
        for (ja of jas) {
            ja.hidden = false;
        }
    }
    else if (language == 'en') {
        for (en of ens) {
            en.hidden = false;
        }
        for (ja of jas) {
            ja.hidden = true;
        }
    }
}
