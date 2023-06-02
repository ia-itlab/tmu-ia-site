var card_data = [];

function generateCard(count_ol, _card, msnry_topics) {
    let cd = _card;
    let title = cd.title;
    let image = cd.image;
    let abstract = cd.abstract;
    let date = cd.date;
    let link = cd.link;

    var col = document.createElement('div');
    col.style.display = 'block'
    if (count_ol == 0) {
        col.classList.add('col', 'col-xs-12', 'col-sm-12', 'col-md-8', 'col-lg-8', 'mt-3', 'g-4', 'grid-item');
    }
    else {
        col.classList.add('col', 'col-xs-12', 'col-sm-12', 'col-md-6', 'col-lg-4', 'mt-3', 'g-4', 'grid-item');
    }

    // col -> card -> card-body
    document.getElementById('topics').appendChild(col);
    let card = document.createElement('div');

    card.classList.add('card');
    card.style.backgroundColor = 'transparent';
    card.style.borderColor = 'black';

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
    let element_loading = createIALoadingElement();


    if (cd.image === 'noimage') {

    }
    else {
        img_card.onload = function () {
            element_loading.remove();
            img_card.style.visibility = 'visible';
            img_card.classList.add('fadeIn');
            msnry_topics.layout();
        }
        card.appendChild(element_loading);
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

function generateCards(_more) {
    var elem_topics = document.querySelector('#topics');
    var msnry_topics = new Masonry(elem_topics, {
        // options
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        gutter: 0,
        percentPosition: true,
        originLeft: true,
    });


    if (!_more) {
        var grid_sizer = document.createElement('div');
        grid_sizer.classList.add('grid-sizer');
        document.getElementById('topics').appendChild(grid_sizer);
    }
    let count_ol = 0;
    for (cd of card_data) {
        generateCard(count_ol, cd, msnry_topics);
        count_ol++;
    }

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
                            image: 'noimage',
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

        loadFont();
        generateCards(false);

        // button要素を #topics に追加する
        let button = document.createElement('button');
        button.classList = 'btn btn-outline-dark btn-block mt-4';
        button.innerHTML = 'もっと見る';
        document.getElementById('contents').appendChild(button);
        button.onclick = async function () {
            var promise_topics_archives = new Promise(function (resolve, reject) {
                // ia wiki から topicsデータを取得する
                {
                    var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:topics:archives';
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


            card_data = [];
            await promise_topics_archives;
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
            //document.querySelector('#topics').innerHTML = '';
            generateCards(true);
            button.remove();
        }
    }


    iaInfoCollection();

    return;

}
