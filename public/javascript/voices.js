window.onload = function () {

    initLanguage();
    // URLのGETパラメータから読み込むページを求める
    var url = new URL(window.location.href);
    var params = url.searchParams;
    // 記事番号
    //console.log(params.get('no'));
    var number_page;
    if (!params.get('no')) {
        number_page = 'menu'
    }
    else {
        number_page = params.get('no');
    }


    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        var url = 'https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:voices:' + number_page;
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var replace = 'tmp';
        //Httpリクエスを作る
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", _html, true);
        xmlhttp.onreadystatechange = function () {
            //とれた場合Idにそって入れ替え
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = xmlhttp.responseText;
                //xmlhttp.responseXML
                //console.log(data);

                data = data.replace(/\/wiki\/lib\/exe\//g, 'https:\/\/industrial-art.sd.tmu.ac.jp\/wiki\/lib\/exe\/')
                var elem = document.getElementById(replace);
                elem.innerHTML = data;
                resolve(data);
                loadFont();
                return data;
            }
        }
        xmlhttp.send(null);

    });
    loadHTML.then(function (data) {

        if (number_page == 'menu') {
            var ols = document.querySelector('.dw-content').querySelectorAll('ol');
            for (ol of ols) {
                var lis = ol.querySelectorAll('li');
                var number = lis[0].querySelector('.li').innerHTML;
                var name = lis[1].querySelector('.li').innerHTML;
                var graduation = lis[2].querySelector('.li').innerHTML;
                var affiliation = lis[3].querySelector('.li').innerHTML;
                var date = lis[4].querySelector('.li').innerHTML;

                // <a href="" class="list-group-item list-group-item-action " aria-current="true">
                //   <div class="d-flex w-100 justify-content-between">
                //     <h5 class="mb-1 h3">インダス花子、2009年卒</h5>
                //     <small class="text-muted">2021年11月5日</small>
                //   </div>
                //   <!-- <p class="mb-"></p> -->
                //   <small class="text-muted">株式会社オノマトペガジェット、企画開発部チーフデザイナー</small>
                // </a>

                var a = document.createElement('a');
                a.classList = "list-group-item list-group-item-action";
                a.href = window.location.href + "?no=" + number.replace(' ', '');
                var div = document.createElement('div');
                div.classList = "d-flex w-100 justify-content-between";
                a.appendChild(div);
                var h5 = document.createElement('h5');
                h5.classList = "mb-1 h5";
                h5.innerHTML = name;
                div.appendChild(h5);
                let span_graduation = document.createElement('span');
                span_graduation.classList.add("small");
                span_graduation.style.color = 'var(--color-text-muted);';
                span_graduation.innerHTML = graduation;

                h5.appendChild(span_graduation);
                var small = document.createElement('small');
                small.style.color = 'var(--color-text-muted);';
                small.innerHTML = date;
                div.appendChild(small);
                var small_affiliation = document.createElement('small');
                small_affiliation.style.color = 'var(--color-text-muted);';
                small_affiliation.innerHTML = affiliation;
                a.appendChild(small_affiliation);
                document.querySelector('#list').appendChild(a);
                document.querySelector('#list').classList.add('fadeIn');

            }
        }
        // 記事ページの場合
        else {

            // まずはそのまんま突っ込む
            document.querySelector('#voice').innerHTML = data;

            // img タグを全部取得
            let imgs = document.querySelector('#voice').querySelectorAll('img');

            // img.srcが読み込み終わったら表示してあげる
            for (let img of imgs) {
                if (img.src.startsWith('https://industrial-art.sd.tmu.ac.jp')) {
                    img.src = './php/image_proxy.php?url=' + encodeURIComponent(img.src);
                }
                img.classList.add('img_fluid');
                img.style.visibility = 'hidden';
                img.onload = function () {
                    img.style.visibility = 'visible';
                    img.classList.add('fadeIn');
                }
            }
            //console.log(imgs);
            document.querySelector('#voice').classList.add('fadeIn');
        }
        document.getElementById('tmp').remove();
        //console.log(document.querySelector('#list'));
        initLanguage();

    });


}