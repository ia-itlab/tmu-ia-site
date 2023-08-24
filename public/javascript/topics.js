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
    card.appendChild(card_body);

    if (cd.image === 'noimage') {
        // OGPイメージがある場合に取得
        fetchOgpImage(cd.link)
            .then(ogImage => {
                cd.image = ogImage;
                addImageToCard(cd.image, count_ol, card, card_body, msnry_topics);
            })
            .catch(error => {
                console.error('エラー:', error);
            });
    }
    else {
        addImageToCard(cd.image, count_ol, card, card_body, msnry_topics);
    }
    card.appendChild(card_body);

    // リンクの作成
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

    // twitter to X icon
    let i_twitter = document.createElement('span');
    // i_twitter.classList = 'bi bi-twitter';
    i_twitter.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 1200 1227" fill="currentColor" class="bi bi-twitter"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
  </svg>`;

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
        // カードの個数、カードのデータ、masonryのインスタンスを渡す
        generateCard(count_ol, cd, msnry_topics);
        count_ol++;
    }

}

window.onload = function () {
    initLanguage();


    async function iaInfoCollection() {


        // https://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:announce を確認して、trueならばmodalに表示する
        var promise_announce = new Promise(function (resolve, reject) {
            // ia wiki から topicsデータを取得する
            {
                var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:announce';
                var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
                var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
                var replace = 'announce';
                //Httpリクエスを作る
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", _html, true);
                xmlhttp.onreadystatechange = function () {
                    //とれた場合 #announce にエレメントを入れる
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var data = xmlhttp.responseText;
                        var elem = document.getElementById(replace);
                        let flg = false;
                        let str = data;
                        if (str.includes('show:true')) {
                            flg = true;
                        } else {
                            flg = false;
                        }

                        // わざわざdomに入れるのは、querySelector等で検索処理しやすいから
                        elem.innerHTML += data;
                        resolve(flg);
                    }
                }
                xmlhttp.send(null);
            }
        });
        let result = await promise_announce;
        {
            if (result == true) {
                setTimeout(function () {
                    $('#modal_announce').modal('show')
                }, 3000)
            }
        }


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

                // 旧書式の場合（画像リンクも指定されている）
                if (lis.length == 5) {
                    card_data.push({
                        title: lis[0].querySelector('div').innerHTML.trimStart(),
                        image: lis[1].querySelector('div').querySelector('a').href,
                        abstract: lis[2].querySelector('div').innerHTML.trimStart(),
                        date: lis[3].querySelector('div').innerHTML.trimStart(),
                        link: lis[4].querySelector('div').querySelector('a').href
                    });
                }
                // 新書式の場合（画像リンクは指定されていない。OGPから画像は取得する）
                else if (lis.length == 4) {
                    card_data.push({
                        title: lis[0].querySelector('div').innerHTML.trimStart(),
                        image: 'noimage',
                        abstract: lis[1].querySelector('div').innerHTML.trimStart(),
                        date: lis[2].querySelector('div').innerHTML.trimStart(),
                        link: lis[3].querySelector('div').querySelector('a').href
                    });
                }
                else {
                    // なにもしない
                }
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


function addImageToCard(imageUrl, count_ol, card, card_body, msnry_topics) {
    let img_card = document.createElement('img');
    img_card.classList.add('card-img-top');
    if (count_ol === 0) {
        img_card.classList.add('colored');
    }
    img_card.style.visibility = 'hidden';
    let element_loading = createIALoadingElement();

    img_card.onload = function () {
        element_loading.remove();
        img_card.style.visibility = 'visible';
        img_card.classList.add('fadeIn');
        msnry_topics.layout();
    };
    card.insertBefore(element_loading, card_body);
    img_card.src = imageUrl;
    card.insertBefore(img_card, card_body);
}


function fetchOgpImage(url) {
    return fetch('./php/get_ogp_image.php?url=' + encodeURIComponent(url))
        .then(response => response.json())
        .then(data => {
            if (data.ogImage) {
                return data.ogImage; // OGPイメージのURLを返す
            } else {
                throw new Error('OGPイメージが見つかりませんでした。');
            }
        });
}