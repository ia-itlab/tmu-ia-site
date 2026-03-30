function updateCurrentMenuState() {
    let ul = document.querySelector('.navbar-nav');

    if (!ul) {
        return;
    }

    let lis = ul.querySelectorAll('li');
    let filename = window.location.pathname.split('/').pop() || 'index.html';

    if (filename.indexOf('labview.html') >= 0) {
        let firstLink = lis[0] && lis[0].querySelector('a');

        if (firstLink) {
            firstLink.classList.add('here');
        }

        return;
    }

    for (let li of lis) {
        let link = li.querySelector('a[id]');

        if (!link) {
            continue;
        }

        link.classList.toggle('here', link.id + '.html' === filename);
    }
}

window.updateCurrentMenuState = updateCurrentMenuState;

document.addEventListener('ia:includes-loaded', function () {
    updateCurrentMenuState();
});


