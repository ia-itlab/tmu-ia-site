window.onload = function () {
  loadFont();
  var url = new URL(window.location.href);
  var params = url.searchParams;
  // スタジオ番号
  //console.log(params.get('id'));
  var id_studio;
  if (!params.get('id')) {
    id_studio = "all";
  }
  else {
    id_studio = params.get('id');
  }

  if (id_studio == 'all') {
    let loadHTML = new Promise(function (resolve, reject) {
      // ia wiki から topicsデータを取得する
      {
        var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:studio';
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var replace = 'studios';
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

      var ols = document.querySelector('.dw-content').querySelectorAll('ol');
      for (ol of ols) {
        var lis = ol.querySelectorAll('li');
        // [0]：id
        // [1]：名前（ホバー時文字）
        // [2]：スタジオ名
        // [3]：写真リンク
        let id = lis[0].querySelector('.li').innerHTML;
        let studio_name_hover = lis[1].querySelector('.li').innerHTML;
        let studio_name = lis[2].querySelector('.li').innerHTML;
        let image = lis[3].querySelector('.li').innerHTML;
        let image_src;
        if (lis[3].querySelector('.li').querySelector('a')) {
          image_src = lis[3].querySelector('.li').querySelector('a').href;
        }
        else {
          image_src = "https://placehold.jp/5c5c5c/ffffff/300x300.png?text=no%20image";
        }


        let div_col = document.createElement('div');
        div_col.classList = 'col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3';
        document.querySelector('#studios').appendChild(div_col);

        let div_hover_text = document.createElement('div');
        div_hover_text.classList = 'hover_text';


        div_col.appendChild(div_hover_text);
        let img = document.createElement('img');
        img.classList = "hover_text img-fluid";
        img.loading = 'lazy';
        img.alt = '';
        img.style.visibility = 'hidden'
        img.src = image_src;

        // img.srcが読み込み終わったら表示してあげる
        // カード画像は全部ロードが終わった後並べ替え作業をする
        img.onload = function () {
          img.style.visibility = 'visible';
          img.classList.add('fadeIn');
        }
        div_hover_text.appendChild(img);

        let h5 = document.createElement('h5');
        h5.innerHTML = studio_name_hover;
        div_hover_text.appendChild(h5);

        let caption = document.createElement('caption');
        caption.innerHTML = studio_name;
        div_hover_text.appendChild(caption);

        let a = document.createElement('a');

        // URLパラメータがすでに別のものが存在している場合は引き継ぐ
        if( params.toString().length > 0){
          a.href = `${url.href}&id=${id.trim(' ')}`;
          a.appendChild(div_hover_text);
          div_col.appendChild(a);
        }
        else{
          a.href = url.href + '?id=' + id.trim(' ');
          a.appendChild(div_hover_text);
          div_col.appendChild(a);
        }
       

        //ol.remove();
      }
      initLanguage();
      document.querySelector('.dw-content').remove();
    });

  }
  else {

    let loadHTML = new Promise(function (resolve, reject) {
      // ia wiki から topicsデータを取得する
      {
        var url = 'http://industrial-art.sd.tmu.ac.jp/wiki/doku.php\?id=website:studio:' + id_studio;
        var regexp = '@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s';
        var _html = './php/scrape.php?regexp=' + regexp + '&url=' + url;
        var replace = 'studio_description';
        //console.log(url);
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

      let lis = document.querySelector('.dw-content').querySelector('ol').querySelectorAll('li');
      let studio_name = lis[0].querySelector('div').innerHTML;
      let core_name = lis[1].querySelector('div').innerHTML;
      let teacher_name = lis[2].querySelector('div').innerHTML;
      let teacher_position = lis[3].querySelector('div').innerHTML;
      let image = lis[4].querySelector('a').href;
      let url_youtube = lis[5].querySelector('a');
      if (url_youtube == null) {

      }
      else {

      }


      let abstract = lis[6].querySelector('div').innerHTML;


      let section_left = document.createElement('section');
      section_left.classList = 'left';
      document.querySelector('#studio_description').appendChild(section_left);
      let div_title = document.createElement('div');
      div_title.classList = 'title';
      section_left.appendChild(div_title);
      let div_titleText = document.createElement('div');
      div_titleText.classList = 'titleText';
      div_title.appendChild(div_titleText);
      let h2_ja = document.createElement('h2');
      h2_ja.classList = 'ja'
      div_titleText.appendChild(h2_ja);
      h2_ja.innerHTML = studio_name;

      let h4_ja = document.createElement('h4');
      h4_ja.classList = 'ja';
      h4_ja.innerHTML = core_name;
      div_titleText.appendChild(h4_ja);

      let img = document.createElement('img');
      //img.classList = 'img-fluid rounded';
      img.style = 'width:100%';
      img.src = image;
      img.style.visibility = 'hidden'
      // img.srcが読み込み終わったら表示してあげる
      // カード画像は全部ロードが終わった後並べ替え作業をする
      img.onload = function () {
        img.style.visibility = 'visible';
        img.classList.add('fadeIn');
        //console.log("loaded", img);
      }
      section_left.appendChild(img);

      let p = document.createElement('p');
      p.classList = 'info';
      p.innerHTML = abstract;
      section_left.appendChild(p);

      //   <section class="right">
      //   <h3>担当教員</h3>
      // </section>
      let section_right = document.createElement('section');
      section_right.classList = 'right';
      document.getElementById('studio_description').appendChild(section_right);
      let h3 = document.createElement('h3');
      h3.innerHTML = '<ja>担当教員</ja><en>Directed by</en>';
      section_right.appendChild(h3);
      let p_teacher_name = document.createElement('p');
      p_teacher_name.innerHTML = teacher_name + "<br>" + teacher_position;
      section_right.appendChild(p_teacher_name);

      // <h3 class="ja oc-video-head">研究室紹介動画</h2>
      //   <div class="youtube">
      //     <iframe id="oc_video" src="https://www.youtube.com/embed/X1uZHs7vxOo" title="YouTube video player"
      //       frameborder="0"
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       allowfullscreen></iframe>
      if (url_youtube != null) {
        let h3_oc_video_head = document.createElement('h3');
        h3_oc_video_head.innerHTML = '<ja>研究室紹介動画</ja><en>Studio Introduction Video</en>';
        section_left.appendChild(h3_oc_video_head);
        let div_youtube = document.createElement('div');
        div_youtube.classList = 'youtube';
        section_left.appendChild(div_youtube);
        let iframe = document.createElement('iframe');
        iframe.id = 'oc_video';
        iframe.src = url_youtube;

        div_youtube.appendChild(iframe);
      }
      document.querySelector('.dw-content').remove();
      initLanguage();
    });
  }

}