var card_data = [];

function generateCards() {
    var elem_topics = document.querySelector('#topics');
    var msnry_topics = new Masonry(elem_topics, {
        // options
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        gutter: 0,
        percentPosition: true,
        originLeft: true,
    });

    var grid_sizer = document.createElement('div');
    grid_sizer.classList.add('grid-sizer');
    document.getElementById('topics').appendChild(grid_sizer);

    let count_ol = 0;
    for (cd of card_data) {
        let title = cd.title;
        let image = cd.image;
        let abstract = cd.abstract;
        let date = cd.date;
        let link = cd.link;

        var col = document.createElement('div');
        col.style.display = 'block'
        if (count_ol == 0) {
            col.classList.add('col', 'col-sm-12', 'col-md-8', 'col-lg-8', 'mt-3', 'g-4', 'grid-item');
        }
        else {
            col.classList.add('col', 'col-sm-6', 'col-md-4', 'col-lg-4', 'mt-3', 'g-4', 'grid-item');
        }
        // col -> card -> card-body
        document.getElementById('topics').appendChild(col);
        let card = document.createElement('div');

        card.classList.add('card');

        //card.innerHTML = 'card';
        let card_body = document.createElement('div');
        card_body.classList.add('card-body');

        col.appendChild(card);


        let img_card = document.createElement('img');
        img_card.classList.add('card-img-top');
        if (count_ol == 0) {
            img_card.classList.add('colored');
        }
        img_card.style.visibility = 'hidden';
        img_card.onload = function () {
            img_card.style.visibility = 'visible';
            img_card.classList.add('fadeIn');
            msnry_topics.layout();
        }
        if (cd.image === 'no image') {
        }
        else {
            img_card.src = cd.image;
            card.appendChild(img_card);
        }
        card.appendChild(card_body);

        let a_link = document.createElement('a');
        a_link.href = cd.link;
        a_link.target = '_blank';
        a_link.appendChild(card);
        col.appendChild(a_link);



        // console.log(lis);
        let h5_card_title = document.createElement('h5');
        h5_card_title.classList.add('card-title');
        h5_card_title.innerHTML = title + ' ';
        card_body.appendChild(h5_card_title);

        let p_card_text = document.createElement('p');
        p_card_text.classList.add('card-text');
        p_card_text.innerHTML = cd.abstract;
        card_body.appendChild(p_card_text);

        let p_card_text_date = document.createElement('p');
        p_card_text_date.classList.add('card-text', 'text-muted');
        p_card_text_date.innerHTML = cd.date;
        card_body.appendChild(p_card_text_date);

        let i_twitter = document.createElement('i');
        i_twitter.classList = 'bi bi-twitter';

        let a_twitter = document.createElement('a');
        a_twitter.href = 'https://twitter.com/intent/tweet?text=' + encodeURI(abstract) + '&url=' + encodeURI(link);
        a_twitter.target = "_blank";
        a_twitter.classList = "twitter-link";
        a_twitter.appendChild(i_twitter);
        h5_card_title.appendChild(a_twitter);

        msnry_topics.appended(col);
        count_ol++;
    }
    //console.log('topics', document.getElementById('topics'));
}

window.onload = function () {
    initLanguage();

    async function iaInfoCollection() {
        var promise_topics = new Promise(function (resolve, reject) {
            // ia wiki から topicsデータを取得する
            {
                var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:topics';
                var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
                var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
                var replace = 'topics';
                //Httpリクエスを作る
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", _html, true);
                xmlhttp.onreadystatechange = function () {
                    //とれた場合Idにそって入れ替え
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var data = xmlhttp.responseText;
                        var elem = document.getElementById(replace);
                        // わざわざdomに入れるのは、querySelector等で検索処理しやすいから
                        elem.innerHTML += data;
                        resolve(data);
                    }
                }
                xmlhttp.send(null);
            }
        });
        var promise_sd_news = new Promise(function (resolve, reject) {

            // 大学ウェブサイトからニュースを取得する
            {
                var url = 'https://www.sd.tmu.ac.jp/news.html';
                var regexp = '@<li class="informationRow age202(?:.*?)>(.*?)</li>@s';
                var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
                var replace = 'topics';
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

        await promise_topics;
        {
            var ols = document.querySelectorAll('ol.fix-media-list-overlap');
            for (ol of ols) {
                let lis = ol.querySelectorAll('li');

                card_data.push({
                    title: lis[0].querySelector('div').innerHTML.trimStart(),
                    image: lis[1].querySelector('div').querySelector('a').href,
                    abstract: lis[2].querySelector('div').innerHTML.trimStart(),
                    date: lis[3].querySelector('div').innerHTML.trimStart(),
                    link: lis[4].querySelector('div').querySelector('a').href
                });
            }
            document.querySelector('.dw-content').remove();

        }
        await promise_sd_news;
        {
            var lists = document.getElementById('topics').querySelectorAll('li');
            var lists_art = [];
            for (list of lists) {
                if (list.querySelector('p.desc')) {
                    if (list.querySelector('p.desc').innerHTML.indexOf('インダストリアルアート') > 0) {
                        card_data.push({
                            title: list.querySelector('h3').querySelector('a').innerHTML.trimStart(),
                            image: 'no image',
                            abstract: list.querySelector('h3').querySelector('a').innerHTML.trimStart() + ' ' + list.querySelector('p.desc').innerHTML,
                            link: list.querySelector('h3').querySelector('a').href.replace(/http.*news/u, 'https://www.sd.tmu.ac.jp/news'),
                            date: list.querySelector('div.head').querySelector('span.date').innerHTML.trimStart()
                        });
                    }
                }
                list.remove();
            }

        }
        // ここまでで、card_dataに必要な情報がはいる
        card_data = card_data.sort(function (a, b) {
            return (a.date > b.date) ? -1 : 1;
        });
        //console.log(card_data);
        generateCards();
    }

    iaInfoCollection();




    return;


    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        {
            var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:topics';
            var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
            var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
            var replace = 'topics';
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

        var grid_sizer = document.createElement('div');
        grid_sizer.classList.add('grid-sizer');
        document.getElementById('topics').appendChild(grid_sizer);

        var ols = document.querySelectorAll('ol.fix-media-list-overlap');

        let count_ol = 0;
        for (ol of ols) {
            let lis = ol.querySelectorAll('li');

            card_data.push({
                title: lis[0].querySelector('div').innerHTML.trimStart(),
                image: lis[1].querySelector('div').querySelector('a').href,
                abstract: lis[2].querySelector('div').innerHTML.trimStart(),
                date: lis[3].querySelector('div').innerHTML.trimStart(),
                link: lis[4].querySelector('div').querySelector('a').href
            });

            let title = lis[0].querySelector('div').innerHTML;
            let image = lis[1].querySelector('div').querySelector('a').href;
            let abstract = lis[2].querySelector('div').innerHTML;
            let date = lis[3].querySelector('div').innerHTML;
            let link = lis[4].querySelector('div').querySelector('a').href;

            var col = document.createElement('div');
            col.style.display = 'block'
            if (count_ol == 0) {
                col.classList.add('col', 'col-sm-12', 'col-md-8', 'col-lg-8', 'mt-3', 'g-4', 'grid-item');
            }
            else {
                col.classList.add('col', 'col-sm-6', 'col-md-4', 'col-lg-4', 'mt-3', 'g-4', 'grid-item');
            }
            //col.innerHTML = 'div col';
            // col -> card -> card-body
            document.getElementById('topics').appendChild(col);
            let card = document.createElement('div');

            card.classList.add('card');

            //card.innerHTML = 'card';
            let card_body = document.createElement('div');
            card_body.classList.add('card-body');

            col.appendChild(card);


            let img_card = document.createElement('img');
            img_card.classList.add('card-img-top');
            if (count_ol == 0) {
                img_card.classList.add('colored');
            }
            img_card.style.visibility = 'hidden';
            img_card.onload = function () {
                img_card.style.visibility = 'visible';
                img_card.classList.add('fadeIn');
                msnry_topics.layout();
            }
            if (lis[1].querySelector('div').querySelector('a')) {
                img_card.src = lis[1].querySelector('div').querySelector('a').href;
            }
            //console.log(lis[1]);


            card.appendChild(img_card);
            card.appendChild(card_body);

            let a_link = document.createElement('a');
            if (lis.length >= 4) {
                if (lis[4].querySelector('div')) {
                    if (lis[4].querySelector('a')) {
                        a_link.href = lis[4].querySelector('div').querySelector('a').href;
                        a_link.target = '_blank';
                        //card.appendChild(a_link);
                        //a_link.appendChild(img_card);
                        a_link.appendChild(card);
                        col.appendChild(a_link);
                    }
                }
            }


            // console.log(lis);
            let h5_card_title = document.createElement('h5');
            h5_card_title.classList.add('card-title');
            h5_card_title.innerHTML = title + ' ';
            card_body.appendChild(h5_card_title);

            let p_card_text = document.createElement('p');
            p_card_text.classList.add('card-text');
            p_card_text.innerHTML = lis[2].innerHTML;
            card_body.appendChild(p_card_text);

            let p_card_text_date = document.createElement('p');
            p_card_text_date.classList.add('card-text', 'text-muted');
            p_card_text_date.innerHTML = lis[3].innerHTML;
            card_body.appendChild(p_card_text_date);

            let i_twitter = document.createElement('i');
            i_twitter.classList = 'bi bi-twitter';

            let a_twitter = document.createElement('a');
            a_twitter.href = 'https://twitter.com/intent/tweet?text=' + encodeURI(abstract) + '&url=' + encodeURI(link);
            a_twitter.target = "_blank";
            a_twitter.classList = "twitter-link";
            a_twitter.appendChild(i_twitter);
            h5_card_title.appendChild(a_twitter);

            msnry_topics.appended(col);
            //ul.innerHTML = '';
            ol.remove();
            //console.log('ol', ol);
            count_ol++;
        }
        //uls.remove();

        document.querySelector('.dw-content').remove();
        //console.log('topics', document.getElementById('topics'));

    });



    var loadHTML = new Promise(function (resolve, reject) {

        // 大学ウェブサイトからニュースを取得する
        {
            var url = 'https://www.sd.tmu.ac.jp/news.html';
            var regexp = '@<li class="informationRow age202(?:.*?)>(.*?)</li>@s';
            var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
            var replace = 'awards';
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
        var grid_sizer = document.createElement('div');
        grid_sizer.classList.add('grid-sizer');
        document.getElementById('awards').appendChild(grid_sizer);
        var lists = document.getElementById('awards').querySelectorAll('li');
        var lists_art = [];
        for (list of lists) {
            if (list.querySelector('p.desc')) {

                if (list.querySelector('p.desc').innerHTML.indexOf('インダストリアルアート') > 0) {

                    card_data.push({
                        title: list.querySelector('h3').querySelector('a').innerHTML.trimStart(),
                        image: 'no image',
                        abstract: list.querySelector('p.desc').innerHTML,
                        link: list.querySelector('h3').querySelector('a').href.replace(/http.*news/u, 'https://www.sd.tmu.ac.jp/news'),
                        date: list.querySelector('div.head').querySelector('span.date').innerHTML.trimStart()
                    });


                    let col = document.createElement('div');
                    col.classList.add('col', 'col-sm-6', 'col-lg-4', 'mt-3', 'g-4', 'grid-item');

                    document.getElementById('awards').appendChild(col);
                    let card = document.createElement('div');

                    card.classList.add('card');
                    let card_body = document.createElement('div');
                    card_body.classList.add('card-body');
                    card.appendChild(card_body);

                    // h3タグにリンクのaタグがあるが，相対リンクで記載されているので，tmuへの絶対リンクへ文字列を置換する
                    list.querySelector('h3').classList.add('mt-3');
                    let link = list.querySelector('h3').querySelector('a');
                    link.target = '_blank';
                    let link_replaced = link.href.replace(/http.*news/u, 'https://www.sd.tmu.ac.jp/news');
                    //console.log(link_replaced);
                    list.style.display = 'block';
                    link.href = link_replaced;


                    list.querySelector('div.head').querySelector('span.date').classList.add('badge', 'bg-dark');
                    list.querySelector('div.head').querySelector('span.tag').remove();
                    //console.log(list);
                    lists_art.push(list);
                    list.querySelector('p.desc').classList.add('text-muted');
                    card_body.appendChild(list);

                    let a = document.createElement('a');
                    a.href = link.href;
                    a.target = link.target;
                    a.appendChild(card);
                    col.appendChild(a);
                    //console.log(col);

                    msnry.appended(col);



                }
                else {
                    list.remove();
                }
            }
            else {
                list.remove();
            }
        }
        //console.log('awards', document.querySelector('#awards'));
        msnry.layout();
        //console.log(lists_art);
        console.log(card_data);
        let result = card_data.sort(function (a, b) {
            return (a.date > b.date) ? -1 : 1;
        });
        console.log(result);
    })
}
