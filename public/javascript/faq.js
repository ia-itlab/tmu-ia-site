window.onload = function () {
    var loadHTML = new Promise(function (resolve, reject) {
        // ia wiki から topicsデータを取得する
        var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:faq';
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var replace = 'content';
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
    });
    loadHTML.then(function () {
        var ols = document.querySelector('.dw-content').querySelectorAll('ol');

        for (ol of ols) {
            var lis = ol.querySelectorAll('li');
            var str_q = lis[0].querySelector('div').innerHTML;
            var str_a = lis[1].querySelector('div').innerHTML;

            var div_line_bc = document.createElement('div');
            div_line_bc.classList = 'line-bc';
            document.querySelector('#content').appendChild(div_line_bc);

            var div_balloon6 = document.createElement('div');
            div_balloon6.classList = 'balloon6';
            div_line_bc.appendChild(div_balloon6);

            var div_faceicon = document.createElement('div');
            div_faceicon.classList = 'faceicon';
            div_balloon6.appendChild(div_faceicon);
            var img = document.createElement('img');
            img.src = './images/faq/' + String(1 + parseInt(Math.random() * 16)).padStart(2, 0) + '.png';
            div_faceicon.appendChild(img);

            var div_chatting = document.createElement('div');
            div_chatting.classList = 'chatting';
            div_balloon6.appendChild(div_chatting);
            var div_says = document.createElement('div');
            div_says.classList = 'says';
            div_chatting.appendChild(div_says);
            var p_q = document.createElement('p');
            p_q.innerHTML = str_q;
            div_says.appendChild(p_q);

            var div_mycomment = document.createElement('div');
            div_mycomment.classList = 'mycomment';
            div_line_bc.appendChild(div_mycomment);
            var p_a = document.createElement('p');
            p_a.innerHTML = str_a;
            div_mycomment.appendChild(p_a);
        }
        document.querySelector('.dw-content').remove();
        //console.log(document.querySelector('#content'));
        initLanguage();
    });
}