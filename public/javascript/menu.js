$(".navbar-nav").load("./parts/menu.html", function () {
    let ul = document.querySelector('.navbar-nav');
    let lis = ul.querySelectorAll('li');
    //console.log("hello", ul);
    var filename = window.location.href.split('/').pop();

    if (filename.indexOf('labview.html') >= 0) {
        lis[0].querySelector('a').classList = 'here';
        return;
    }
    for (li of lis) {
        if (li.querySelector('a').id + '.html' == filename) {
            li.querySelector('a').classList = 'here';
        }
        else {
            li.querySelector('a').classList = '';
        }
    }
});


