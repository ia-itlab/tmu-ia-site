window.onload = function () {
    initLanguage();
    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        var url = 'https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:about';
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var id = 'main';
        //Httpリクエスを作る
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", _html, true);
        xmlhttp.onreadystatechange = function () {
            //とれた場合Idにそって入れ替え
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                //xmlhttp.responseXML
                //console.log(data);
                var elem = document.getElementById(id);
                elem.innerHTML = data;
                resolve(data);
            }
        }
        xmlhttp.send(null);
    });
    loadHTML.then(function () {
        var lis = document.querySelector('.dw-content').querySelector('ol').querySelectorAll('li');
        //console.log(lis);
        for (li of lis) {
            //console.log(li.querySelector('div').innerHTML)
        }
        var h2_page_title = document.createElement('h2');
        h2_page_title.classList = "page-title";
        h2_page_title.innerHTML = lis[0].querySelector('div').innerHTML;
        document.getElementById('main').appendChild(h2_page_title);
        //console.log("here", document.getElementById('main'));

        var span = document.createElement('span');
        span.innerHTML = lis[1].innerHTML;
        h2_page_title.appendChild(span);

        var section_about = document.createElement('section');
        section_about.classList = 'about';
        document.getElementById('main').appendChild(section_about);


        var section = document.createElement('section');
        section_about.appendChild(section);

        // 動画紹介
        let introduction_video = document.createElement('div');
        introduction_video.classList = "ratio ratio-16x9 mb-4";
        introduction_video.innerHTML = lis[2].querySelector('div').innerHTML;
        section.appendChild(introduction_video);

        console.log(section);

        // section 1
        var h3 = document.createElement('h3');
        h3.innerHTML = lis[3].querySelector('div').innerHTML;
        section.appendChild(h3);

        var section_flexbox = document.createElement('section');
        section_flexbox.classList = 'flexbox';
        section.appendChild(section_flexbox);
        var div_flex_item = document.createElement('div');
        div_flex_item.classList = 'flex-item flex-item-img';
        //section_flexbox.appendChild(div_flex_item);
        var img = document.createElement('img');
        img.classList.add('fadeIn');
        img.classList.add('thumbnail');
        new simpleParallax(img, {
            orientation: 'left',
            scale: 1.2,
            //overflow: true
        });
        img.style.visibility = 'hidden';

        img.src = lis[4].querySelector('div').querySelector('a').innerHTML;
        // 画像URLをプロキシスクリプト経由に変更
        if (img.src.startsWith('https://industrial-art.sd.tmu.ac.jp')) {
            img.src = './php/image_proxy.php?url=' + encodeURIComponent(img.src);
        }
        // img.srcが読み込み終わったら表示してあげる
        // カード画像は全部ロードが終わった後並べ替え作業をする
        img.onload = function () {
            img.style.visibility = 'visible';

            //console.log("loaded", img);
        }
        div_flex_item.appendChild(img);

        var div_flex_item_00 = document.createElement('div');
        div_flex_item_00.classList = 'flex-item';
        section_flexbox.appendChild(div_flex_item_00);
        var p00 = document.createElement('p');
        p00.innerHTML = lis[5].querySelector('div').innerHTML;
        div_flex_item_00.appendChild(p00);

        var section_cores = document.createElement('section');
        section_cores.classList = 'cores';
        section.appendChild(section_cores);
        var h3_cores = document.createElement('h3');
        h3_cores.innerHTML = lis[6].querySelector('div').innerHTML;
        section_cores.appendChild(h3_cores);
        var p_cores = document.createElement('p');
        p_cores.innerHTML = lis[7].querySelector('div').innerHTML;
        section_cores.appendChild(p_cores);

        var section_needs = document.createElement('section');
        section_needs.classList = 'needs';
        section.appendChild(section_needs);
        var h3_needs = document.createElement('h3');
        h3_needs.innerHTML = lis[8].querySelector('div').innerHTML;
        section_needs.appendChild(h3_needs);
        var p_needs = document.createElement('p');
        p_needs.innerHTML = lis[9].querySelector('div').innerHTML;
        section_needs.appendChild(p_needs);
        section_needs.appendChild(div_flex_item);

        var section_course = document.createElement('section');
        section_course.classList = 'course mt-4';
        section.appendChild(section_course);
        var h3_course = document.createElement('h3');
        h3_course.innerHTML = lis[10].querySelector('div').innerHTML;
        section_course.appendChild(h3_course);

        let row = document.createElement('div');
        row.classList = 'row';
        let col1 = document.createElement('div');
        col1.classList = 'col-6';
        let col2 = document.createElement('div');
        col2.classList = 'col-6';
        section_course.appendChild(row);
        row.appendChild(col1);
        row.appendChild(col2);

        var img_course01 = document.createElement('img');
        img_course01.src = lis[11].querySelector('div').querySelector('a').innerHTML;
        if (img_course01.src.startsWith('https://industrial-art.sd.tmu.ac.jp')) {
            img_course01.src = './php/image_proxy.php?url=' + encodeURIComponent(img_course01.src);
        }
        col1.appendChild(img_course01);
        var img_course02 = document.createElement('img');

        img_course02.src = lis[12].querySelector('div').querySelector('a').innerHTML;
        if (img_course02.src.startsWith('https://industrial-art.sd.tmu.ac.jp')) {
            img_course02.src = './php/image_proxy.php?url=' + encodeURIComponent(img_course02.src);
        }
        col2.appendChild(img_course02);

        //console.log(document.getElementById("main"));
        document.querySelector('.dw-content').remove();

        var ens = document.querySelectorAll('en');
        for (en of ens) {
            en.hidden = true;
        }
        initLanguage();
    });

    //uls.remove();
    //console.log("hello", );
}

