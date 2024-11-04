window.onload = function () {
    initLanguage();

    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        var url = 'https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:events';
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var id = 'main';
        console.log(_html);
        //Httpリクエスを作る
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", _html, true);
        xmlhttp.onreadystatechange = function () {
            //とれた場合Idにそって入れ替え
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                //xmlhttp.responseXML
                //console.log(data);
                var elem = document.querySelector(id);
                elem.innerHTML += data;
                resolve(data);
            }
        }
        xmlhttp.send(null);
    }).then(data => {
        loadFont();
        let ols = document.querySelectorAll('ol');
        let section_links = document.createElement('section');
        section_links.classList = 'links';
        document.querySelector('main').appendChild(section_links);
        for (ol of ols) {
            //console.log(ol);
            let lis = ol.querySelectorAll('li');
            let title = lis[0].querySelector('div').innerHTML;
            let place = lis[1].querySelector('div').innerHTML;
            let term = lis[2].querySelector('div').innerHTML;
            let abstract = lis[3].querySelector('div').innerHTML;
            let image = lis[4].querySelector('div').querySelector('a').href;
            let href = lis[5].querySelector('div').querySelector('a').href;

            let section_link = document.createElement('section');
            section_link.classList = 'row mt-4 mb-4 pb-5';
            section_links.appendChild(section_link);

            let section_left = document.createElement('section');
            section_left.classList = 'col-xxs-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4';
            section_link.appendChild(section_left);

            let a = document.createElement('a');
            a.href = href;
            a.target = '_blank';
            section_left.appendChild(a);

            let img = document.createElement('img');
            img.src = image;
            img.classList = 'img-fluid';
            a.appendChild(img);

            let section_right = document.createElement('section');
            section_right.classList = 'col-xxs-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8';
            section_link.appendChild(section_right);


            let div_linktitle = document.createElement('div');
            div_linktitle.classList = 'linktitle';

            section_right.appendChild(div_linktitle);

            let a1 = document.createElement('a');
            a1.href = href;
            a1.target = '_blank';
            div_linktitle.appendChild(a1);

            let h2 = document.createElement('h4');
            h2.classList = 'fw-bold text-muted';
            h2.innerHTML = title;
            a1.appendChild(h2);

            let icon = document.createElement('i');
            icon.classList = 'bi bi-box-arrow-up-right ms-2';
            h2.appendChild(icon);

            let p_location = document.createElement('p');
            p_location.classList = 'fw-bold lead lh-base';
            p_location.innerHTML = `${place}<br>${term}`;
            section_right.appendChild(p_location);

            let p_abstract = document.createElement('p');
            // p_abstract.classList = 'about-exhibition';
            p_abstract.innerHTML = abstract;
            section_right.appendChild(p_abstract);




        }
        document.querySelector('.dw-content').remove();
        //console.log(section_links);
        initLanguage();
    });
}