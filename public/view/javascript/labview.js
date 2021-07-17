//研究室のデータ(pug記載のものを参考に少しいじってあります)
const studios = [
  {
    ID: "visual",
    name: "ヴィジュアルコミュニケーションデザインスタジオ",
    englishName: "Visual Communication Design Studio",
    core: "media",
    imgURL: [
      "./images/studio-images/vc1.jpg",
      "./images/studio-images/vc2.jpg",
      "./images/studio-images/vc3.jpg",
      "./images/studio-images/vc4.jpg"
    ],
    info:
      "ヴィジュアルコミュニケーションデザインスタジオでは、社会構造の変化や文化認識、生産システムの変化など、様々な時代変動のなか、どのような考えのもとで、どのような表現を作り出せば、新しくかつ普遍的なヴィジュアル・コミュニケーションが生まれるか、ということをテーマに研究を行います。グラフィックデザイン、広告、パッケージ、プロダクト、空間・環境など、メディアの領域を超えて、ヴィジュアル・コミュニケーションの可能性をデザインします。現代社会においてデザインという知恵が、日々の生活を、社会を生き生きとさせるひとつの方法ではないでしょうか。",
    englishInfo:
      "The visual communication design studio researches design across media. Whether graphic design, branding, illustrations, typography, packaging, books, products, space and environmental design, urban systems. We explore to provide solid solutions based on design involving functional, and quality information, in various field. We aim not only to develop planning skills, but also develop imaginative and creative design ability.",
    professor: ["菊竹 雪", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "editorial",
    name: "エディティングスタジオ",
    englishName: "Editorial Design Studio",
    core: "media",
    imgURL: [
      "./images/studio-images/ed1.png",
      "./images/studio-images/ed2.png"
    ],
    info:
      "情報コミュニケーション·システムの発達と拡充により誰もが情報の発信者となったいま、テキストや画像や音や映像などの情報を編集することはすでに私たちの生活のなかで日常的な行為といえるでしょう。その前提のもと、これまで歴史的に構築されてきた編集の技術を理論的な分析とともに再構築し、情報メディア時代の知の手法として実践的な開発に取り組んでいます。とくに電子書籍などのディジタル媒体とフィジカルな書物、編集の技術史と文化史を接続する視点から、既存のソースの有効活用による新たな価値やコミュニケーションの創出と情報共有時代の新しい公共性のありかたを考え、その社会システムをデザイン/エディットしていきます。",
    englishInfo:
      "Today is an exciting time to learn the art of editing, its historical underpinnings, its various schools of theoretical analysis, and its many practical and intellectual applications. Of course everyone today is both an informationconsumer and producer, editing text, images, music, and moving images, on a daily basis. That&#39;s why gaining perspective, and hands-on approaches to electronic and printed books, and understanding the technological and cultural history of shaping the discourse, and our information resources, connects us more profoundly to our values in motion and helps us gain insights to how and why we share our information, and with it, our social systems.",
    professor: ["楠見 清", "准教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "kinematograph",
    name: "映像デザインスタジオ",
    englishName: "Kinematograph Design Studio",
    core: "media",
    imgURL: [
      "./images/studio-images/kd2.png",
      "./images/studio-images/kd1.png"
    ],
    info:
      "映像は大きく分類すると、その制作手法によって実写(LIVE)映像と、アニメーション映像に分けられる。一般的によく目にするせるアニメーション以外に、CGアニメーション、クレイなどのストップモーションアニメーション等、色々な制作手法が存在する。照明、カメラワーク、編集、企画、世界観、キャラクター設定、シナリオ、コンテをベースに、アニメーション特有の知識を加えることにより、アニメーションの原理を理解し、その制作方法の基礎を習得する。LIVEに撮影する実写映像の知識だけでなく、最低限のLIVE撮影・編集の実技についても習得する。また映像制作、特にドラマ制作において重要な、企画、世界観、キャラクター設定、シナリオ、コンテなどの仕組みを理解する。",
    englishInfo:
      "Moving image work can be roughly divided between live action and “animated” productions. Students in the Kinematograph Design Studio learn not only the basics of theory and practice in lighting, camera work, editing, producing, staging, creating characters, scripts and storyboarding, all common to both live and animated narrative work, but they also learn the fundamentals of traditional cell, computer generated, and stop-motion animation techniques.",
    professor: ["今間 俊博", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "software",
    name: "ソフトウェアデザインスタジオ",
    englishName: "Software Design Studio",
    core: "media",
    imgURL: [
      "./images/studio-images/sd1.jpg",
      "./images/studio-images/sd2.jpg"
    ],
    info:
      "コンピュータと人間との関わりは、ますます多様化・深化しています。ソフトウェアデザインスタジオでは、人間が行うデザイン活動とコンピュータソフトウェアの関係性について研究しています。特に、次世代デジタルコンテンツ制作支援を見据えたプロジェクトを展開しています。研究テーマは新しいコンテンツデザインを切り拓く計算アルゴリズムやソフトウェアの開発、複雑なソフトウェアを効率的に開発するためのデザイン技法、そしてコンテンツ制作プロセスのデザインなど多岐にわたります。",
    englishInfo:
      "The relationship between computers and humans has become closer and more diverse. Software Design Studio conducts research on the relationship between software technology and design activity performed by humans, especially in the next-generation digital content creation. Our research theme includes computational algorithm to open up novel content design, efficient design of the complex software, and design of content creation process.",
    professor: ["向井 智彦", "准教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: 'network',
    name: 'ネットワークデザインスタジオ',
    englishName: 'Network Design Studio',
    core: "media",
    imgURL: [
      './images/studio-images/nd1.png',
      './images/studio-images/nd2.png',
      './images/studio-images/nd3.jpg'
    ],
    info: 'インターネットが支えるコミュニケーション環境は、いまや私たちの生活の基盤として欠かせないものになりました。デジタルメディア技術によって、人びとの表現は豊かになり、情報発信は容易になった一方、膨大な情報に惑わされることもふえました。ネットワークデザインスタジオでは、デジタルメディア表現特有の歴史や文化を踏まえて、人びとのもつ創造性の発掘やオープンな技術文化に着目しながら、コンテンツやアプリケーション、サービスなどを企画開発します。',
    englishInfo: "The communication environment which supported by the Internet is now indispensable infrastructure of our everyday lives. Digital media technology has enriched people's expressions and made it easier to spread information, while also being confused by enormous amounts of information.The Network Design Studio plans and develops content, applications, and services based on the specific history and culture of digital media expression, especially focusing on discovering people's creativity and open technology culture.",
    professor: ['杉本 達應', '准教授'],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "interactive",
    name: "インタラクティブアートスタジオ",
    englishName: "Interactive Art Studio",
    core: "media",
    imgURL: [
      "./images/studio-images/ia1.png",
      "./images/studio-images/ia2.png"
    ],
    info:
      "インタラクティブアートスタジオ（通称:IDEEA Lab.)はInteractive, Design, Entertainment, Education, Artの頭文字を取った、インタラクションデザインを軸に工学と表現領域にまたがる研究を行う研究室です。人間とコンピュータをつなぐインタフェースやインタラクションのあり方を日夜考えています。具体的には触覚、映像、音をインタラクティブに扱うインタフェースを開発し、新たなコミュニケーションを創造する研究などをアイディア、設計、実装、検証、最終のデザインのアウトプットまで一貫した研究が行われています。",
    englishInfo:
      "The Interactive Art Studio, or IDEEA (for Interaction, Design, Entertainment, Education and Art) Lab researches interface design, such as new tactile input devices, controls for moving image and sound, interaction design, and various ways to connect people and computers. Our focus is on exploring new ways of communicating, from coming up with original ideas to designing snd engineering the finished products.",
    professor: ["串山 久美子", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "equipment",
    name: "製品・サービスデザインスタジオ",
    englishName: "Equipment & Service Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/es2.png",
      "./images/studio-images/es3.png",
      "./images/studio-images/es4.png",
      "./images/studio-images/es1.png"
    ],
    info:
      "本スタジオは、家電の未来をテーマに製品と空間の融合を目標に研究しています。造形芸術、科学技術、人文学などの幅広い分野と結びつく総合的な研究を指向し、これらと関連したモノづくりはもちろん、デザインの問題解決能力を備えることを目標とします。また、商品企画を始め、デザイン戦略、開発、生産に至るまでの全てのプロセスを理解、体験するなど意味のあるデザインイノベーション活動を通じ、モノの新しい価値を見つけ出すことを目指します。",
    englishInfo:
      "At the Equipment&amp;Service Design Studio we research the fusion of space and function: The future of home electronics. Our research covers a wide range of areas including the creative arts, scientific technologies, and the humanities. And we aim not only to forge craftsmanship, but also to develop problem solving skills, and through understanding and experiencing the entire process from planning through the production of meaningful design innovations, we aim to produce new values, as products.",
    professor: ["金 石振", "准教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "transportation",
    name: "トランスポーテーションデザインスタジオ",
    englishName: "Transportation Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/td2.png",
      "./images/studio-images/td1.png"
    ],
    info:
      "「美しく豊かで潤いのある生活」の実現に向けた移動体のデザイン研究を、自動車を主題材にしておこなっている。スケッチから始め、スケールモデルを実際に作ることで、実践的なトランスポーテーション·デザインを教える。発想の原点として、手でモノを創る感覚的な部分と新しいソリューションを基にした、クリエイティブな発想の部分の結合を目指している。人々の生活のこれからをイメージし、創造しデザインすることで単なるリ·デザインではない教育を推進しますそして、真に豊かな交通社会の実現のため、デザインの視点から、将来の都市環境や交通システム等を視野においた、サスティナブルなデザイン活動を追求している。",
    englishInfo:
      "The Transportation Design Studio researches automobile body design, especially cars Starting from the drawing board, and making actual scale models, we teach practical transportation design through creative thinking and tactile engagement. But it doesn&#39;t stop there. To realize a truly beautiful, rich, and pleasant transportation society means going beyond redesigning transport, through understanding sustainability, and contributing to building better urban lifestyles.",
    professor: ["難波 治", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "spatial",
    name: "空間デザインスタジオ",
    englishName: "Spatial Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/spatial1.jpg",
      "./images/studio-images/spatial2.jpg"
    ],
    info:
      "空間デザイン分野は、建築、ランドスケープアーキテクチャー、インテリアデザイン、パブリックアートなどの、既存の専門領域の間を交差しております。まず、「空間デザインの意味とはなにか？」という疑問から出発して、この複数の専門領域に及ぶデザイン分野にアプローチします。次に、学生が本学科で学んできた分野横断的教育を多様な視点で研究活動に活かし、柔軟で相互作用を及ぼすようなデザインプロセスを行うようにします。これにより、学生はデザイナーとしての役割をより深く理解し、新しいデザイン手法を確立することができ、さまざまなデザイン分野に携わることができます。",
    englishInfo:
      "Spatial Design overlaps with architecture, landscape architecture, interior design and public art. We approach this interdisciplinary design field by first asking the question, “What is the meaning of Spatial Design?” We then encourage students to integrate multiple perspectives from their diverse education into their graduate works, and to engage in flexible, iterative design processes. This leads students to a better understanding of their roles as designers and enables them to create new design methods. It also gives students the ability to engage in a diverse range of design work.",
    professor: ["Verl Adams", "准教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "interior",
    name: "インテリアデザインスタジオ",
    englishName: "Interior Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/id1.jpg",
      "./images/studio-images/id2.jpg"
    ],
    info:
      "デザインとは、社会に対し、未来に対し、小さな&quot;きっかけ&quot;という種を蒔くようなことだと考えています。インテリアデザインスタジオでは、人間と社会と自然を結び付け&quot;生きるとは何か&quot;を考えることをデザインの出発点としています。ひとりひとりの感性や知性を大切にしながら議論を重ね、デザインの試行錯誤を繰り返します。デザインを&quot;造形を通した文化の創造&quot;と位置づけ、精神・物質の両面から人びとの幸福を支えることを目指し日々デザインに取り組んでいます。ここでデザインを学び巣立った学生たちが、世界を魅了するデザイニストとなり、未来に素敵な花を芽吹かせてくれることを願っています。",
    englishInfo:
      "At the Interior Design Studio we believe that design is a way of sowing the seeds of opportunities for the future. Design is cultural creation through forms. It is a constant trial and error of how to better connect people, and nature, in a discourse of what it means to be alive and happy in both spiritual and material terms. We believe that with each graduating class we are spreading the seeds of a brilliant bouquet of flowers, ready to brighten the world.",
    professor: ["藤原敬介", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "interface",
    name: "インタフェースデザインスタジオ",
    englishName: "Interface Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/baba2.png",
      "./images/studio-images/baba1.png"
    ],
    info:
      "インタフェースデザインスタジオでは、ユーザとコンピュータの接点であるインタフェースに関する基礎·応用研究を行っています。現代生活において、私達は常に機器を操作することを必要とされており、それらの操作方法にマウスやキーボードだけではない、マルチタッチや画像処理、ジェスチャ認識や筋電位操作等の入力装置が利用されています。これら様々な入力装置を発案、実装、提案をすることで、未来を切り開くデザインスキルを身につけた学生を育てています。",
    englishInfo:
      "The Interface Design Studio explores fundamental and applied research of the interface located on the border of user and a computer. In our daily life, we are forced to use various electric devices whether we&#39;d like or not. In order to do so, not only the mouse, keyboard but also multi-touch panel, computer vision, gesture recognition, myogenic potential and so on are used for computer interface. We cultivate these new sort of research/design area by practical prototyping and nurture students who has a skill for the design of future.",
    professor: ["馬場 哲晃", "准教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  },
  {
    ID: "ergonomics",
    name: "エルゴノミックデザインスタジオ",
    englishName: "Ergonomics Design Studio",
    core: "product",
    imgURL: [
      "./images/studio-images/ergo1.jpg",
      "./images/studio-images/ergo2.jpg",
      "./images/studio-images/ergo3.png",
      "./images/studio-images/ergo4.png",
      "./images/studio-images/ergo5.png"
    ],
    info:
      "エルゴノミックデザインスタジオでは、人が心地よく過ごせるために、人とモノやシステムとの関係を考え、どのようなデザインが必要かを検討しています。そのため、人間工学的アプローチにより、人を観察し、その行動や気持ちを把握する手法を研究しています。その方法としては、ユーザの経験を把握し、見える化し、デザインする手法を取っています。そこから、デザインアプローチにつなげ、モノを創り出すためのエビデンスを見つけ出す研究を行っています。",
    englishInfo:
      "It&#39;s important that we appeal to users&#39; sensibilities if we are produce satisfying goods and services. The Ergonomics Studio uses a sensibility and physiology index to analyze qualitative and quantitive usability and comfort, investigates factors and mechanisms which foster active use, and pursue design elements necessary to build comfortable relations between users, goods and services, and other people.",
    professor: ["笠松 慶子", "教授"],
    news: [
      {
        date: "0000-00-00",
        text: "現在公開されているニュースはありません。"
      }
    ]
  }
];

//表示されたらパラメータを取得してデータ書き換え
window.onload = function onload() {
  param = GetQueryString();
  console.log(param["id"]);
  selectData(param["id"]);
};

//オブジェクトでパラメータを取得
function GetQueryString() {
  if (1 < window.location.search.length) {
    // 最初の1文字 (?記号) を除いた文字列を取得する
    var parameter = document.location.search.substring(1);

    var result = new Object();
    var element = parameter.split("=");

    var paramName = decodeURIComponent(element[0]);
    var paramValue = decodeURIComponent(element[1]);

    // パラメータ名をキーとして連想配列に追加する
    result[paramName] = decodeURIComponent(paramValue);

    return result;
  }
  return null;
}

//パラメータからデータ参照して書き換え
function selectData(id) {

  let loadID = id;

  /*言語選択のリンクの差替 */
  let link_lang_ja = document.getElementById('lang-ja');
  let link_lang_en = document.getElementById('lang-en');
  let url_ja = 'page-labview.html?id=' + id;
  let url_en = './en/page-labview.html?id=' + id;

  //href属性の値を書き換える
  link_lang_ja.setAttribute('href', url_ja);
  link_lang_en.setAttribute('href', url_en);

  /*他のスタジオへの導線の表示・当該のスタジオだけ除外 */
  let studio_list_items = Array.prototype.slice.call(document.getElementsByClassName("studio-item"));
  studio_list_items.forEach(function (item) {
    console.log(studio_list_items);
    if (loadID == item.id) {
      console.log("called");
      item.classList.add("inactive");
    }

  });

  let indicators = Array.prototype.slice.call(
    document.getElementsByClassName("box")
  ); console.log(indicators);

  indicators.forEach(function (item) {



    if (loadID == item.name) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  for (i = 0; i < studios.length; i++) {
    if (loadID == studios[i]["ID"]) {
      changeContent(studios[i]);
      return;
    }
  }


}

//中身の書き換え
function changeContent(studioData) {
  $(".labview .left .title .titleText h2").html(studioData["name"]);
  $(".labview .left .title .titleText h3").html(studioData["englishName"]);
  if (studioData["core"] == "media") {
    $(".labview .left .title .titleText h4.ja").html(
      "メディアアートコア・メディア創生"
    );
    $(".labview .left .title .titleText h4.en").html("Media Art Core");
  } else {
    $(".labview .left .title .titleText h4.ja").html("プロダクトデザインコア");
    $(".labview .left .title .titleText h4.en").html("Product Design Core");
  }
  $(".labview .left .info-ja").html(studioData["info"]);
  $(".labview .left .info-en").html(studioData["englishInfo"]);
  for (i = 0; i < studioData["professor"].length; i++) {
    $(".labview .right").append("<p>" + studioData["professor"][i] + "</p>");
  }
  /*for (i = 0; i < studioData["news"].length; i++) {
    $(".news").append(
      '<li class="italic">' + studioData["news"][i]["date"] + "</li>"
    );
    $(".news").append(
      '<li class="normal">' + studioData["news"][i]["text"] + "</li>"
    );
  }*/

  for (i = 0; i < studioData["imgURL"].length; i++) {
    $(".labview .left .viewer").append(
      '<div class="slickContainer"><img src=' +
      studioData["imgURL"][i] +
      ' alt="image"/></div>'
    );
  }
  //スライドショー化
  slickImage();
}

function changeParam(id) {
  location.search = "?id=" + id;
  onload();
}
