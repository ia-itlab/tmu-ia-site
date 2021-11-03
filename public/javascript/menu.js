$("#global-nav").load("../parts/menu.html", function () {
    let ul = document.querySelector('#menu');
    let lis = ul.querySelectorAll('li');
    var filename = window.location.href.split('/').pop();
    for (li of lis) {
        if (li.querySelector('a').id + '.html' === filename) {
            li.querySelector('a').classList = 'here';
        }
        else {
            li.querySelector('a').classList = '';
        }
    }
});
