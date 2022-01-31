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
        document.querySelector('#text_language').innerHTML = 'En';
    }
    else {
        language = 'ja';
        sessionStorage.setItem('language', language);
        document.querySelector('#text_language').innerHTML = 'Ja';
    }
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
