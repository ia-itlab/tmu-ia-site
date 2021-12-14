window.onload = function () {

    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        {
            var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:faculty';
            var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
            var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
            var replace = 'append_placeholder';
            //Httpリクエスを作る
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", _html, true);
            xmlhttp.onreadystatechange = function () {
                //とれた場合Idにそって入れ替え
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var data = xmlhttp.responseText;
                    //xmlhttp.responseXML
                    //console.log(data);
                    var elem = document.getElementById(replace);
                    elem.innerHTML = data;
                    resolve(data);
                    //return data;
                }
            }
            xmlhttp.send(null);
        }
    });
    loadHTML.then(function () {

        var ols = document.getElementById('append_placeholder').querySelector('.dw-content').querySelectorAll('ol');
        for (ol of ols) {
            var lis = ol.querySelectorAll('li');
            // [0]：名前
            // [1]：役職
            // [2]：ローマ字表記
            // [3]：スタジオ名
            // [4]：キーワード
            // [5]：研究室リンク
            // [6]：写真
            console.log(ol);
            let name = lis[0].querySelector('.li').innerHTML;
            let position = lis[1].querySelector('.li').innerHTML;
            let name_en = lis[2].querySelector('.li').innerHTML;
            let name_studio = lis[3].querySelector('.li').innerHTML;
            let keywords = lis[4].querySelector('.li').innerHTML;
            let website;
            if (lis[5].querySelector('.li').querySelector('a')) {
                website = lis[5].querySelector('.li').querySelector('a').href;
            }
            else {
                website = "";
            }

            let image_src;
            if (lis[6].querySelector('.li').querySelector('a')) {
                image_src = lis[6].querySelector('.li').querySelector('a').href;
            }
            else {
                image_src = "https://placehold.jp/5c5c5c/ffffff/300x300.png?text=no%20image";
            }

            // ここからタグを作成していく
            let div_card = document.createElement('div');
            div_card.classList = 'card faculty_card';
            document.querySelector('#append_placeholder').appendChild(div_card);
            let div_row = document.createElement('div');
            div_row.classList = "row g-0";
            div_card.appendChild(div_row);
            let div_col_md_3 = document.createElement('div');
            div_col_md_3.classList = "col-md-3";
            div_row.appendChild(div_col_md_3);
            let img = document.createElement('img');
            img.classList = "card-img-top gray_filter";
            img.src = image_src;
            img.style.visibility = 'hidden'
            div_col_md_3.appendChild(img);

            let div_description = document.createElement('div');
            div_description.classList = 'col-md-9';
            div_row.appendChild(div_description);
            let div_card_body = document.createElement('div');
            div_card_body.classList = 'card-body';
            div_description.appendChild(div_card_body);
            let h5_name = document.createElement('h5');
            h5_name.classList = 'card-title';
            h5_name.innerHTML = name;
            let h5_name_small = document.createElement('small');
            h5_name_small.innerHTML = position;
            h5_name.appendChild(h5_name_small);
            div_card_body.appendChild(h5_name);

            let p_name_en = document.createElement('p');
            p_name_en.classList = 'small';
            p_name_en.innerHTML = name_en;
            div_card_body.appendChild(p_name_en);

            let h5_studio = document.createElement('h5');
            h5_studio.classList = 'card-title';
            let h5_studio_small = document.createElement('small');
            h5_studio_small.innerHTML = name_studio;
            div_card_body.appendChild(h5_studio);
            h5_studio.appendChild(h5_studio_small);

            let p_keywords = document.createElement('p');
            p_keywords.classList = 'small';
            p_keywords.innerHTML = keywords;
            div_card_body.appendChild(p_keywords);

            let p_url = document.createElement('p');
            p_url.classList = "small";
            div_card_body.appendChild(p_url);
            let a_url = document.createElement('a');
            a_url.href = website;
            a_url.innerHTML = website;
            a_url.target = '_blank';
            p_url.appendChild(a_url);



            // img.srcが読み込み終わったら表示してあげる
            // カード画像は全部ロードが終わった後並べ替え作業をする
            img.onload = function () {
                img.style.visibility = 'visible';
                img.classList.add('fadeIn');
                //                console.log("loaded", img);
            }


            //          console.log(div_card);
            ol.remove();
        }
        initLanguage();
        document.getElementById('append_placeholder').querySelector('.dw-content').remove();
    });
}