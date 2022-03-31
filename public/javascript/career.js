var type_selected = [];
var csvs = [];

//CSVファイルを読み込む関数getCSV()の定義
function getCSV() {
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "../parts/ia2020.csv", true); // アクセスするファイルを指定
    //req.open("get", "sample2.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行

    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ	
    req.onload = function () {
        convertCSVtoArray(req.responseText); // 渡されるのは読み込んだCSVデータ
    }
}

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str) { // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\r\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }


    let types = [];
    for (r of result) {
        if (r[0] != '') {
            let search_properties = [];
            for (const [index, search_property] of r.entries()) {
                if (index > 0) {
                    search_properties.push(toHalfWidth(search_property));
                }
            }
            csvs.push({
                name: hankana2Zenkana(toHalfWidth(r[0])),
                types: search_properties
            });
        }
    }

    // ここまでで csvs にはすべてのデータを連想配列として格納できたので，次に重複している同じデータは削除してしまう
    // Delete duplications
    let csv_header = csvs[0];
    csvs.shift();
    const uni_result = csvs.filter((element, index, self) =>
        index === self.findIndex(e => {
            let is_everything_same = false;
            if (e.name === element.name) {
                let count = 0;
                for (let i = 0; i < e.types.length; i++) {
                    if (e.types[i] === element.types[i]) {
                        count++;
                    }
                }
                if (count == e.types.length) {
                    is_everything_same = true;
                }
                else {
                    is_everything_same = false;
                }
            }
            else {
                is_everything_same = false;
            }
            return is_everything_same;
        })
    );

    csvs = uni_result;


    // sort by company name on A,I,U,E,O...
    csvs = csvs.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name == b.name) return 0;
        else return 1;
    });
    csvs.unshift(csv_header);


    for (let i = 0; i < csvs[0].types.length; i++) {
        let tmp_types = [];
        for (const [index, csv] of csvs.entries()) {
            if (index > 0) {
                tmp_types.push(csv.types[i]);
                if (csv.types[i] == '2019年度') {
                    console.log("found");
                }
            }
        }
        tmp_types = Array.from(new Set(tmp_types));
        types.push(tmp_types);
    }



    // 改行コードはすべて削除する
    for (type of types) {
        for (t of type) {
            t = String(t).replace(/\r?\n/g, '');
        }
    }

    types[0].sort();
    types[0].unshift('すべて');
    type_selected.push('すべて');




    let table = document.createElement('table');
    table.classList = "table table-hover";
    document.querySelector('#result').prepend(table);

    // header
    {
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tr = document.createElement('tr');
        thead.appendChild(tr);

        //let th_width = String(parseInt(100 / (csvs[0].types.length + 1))) + '%;';
        let th = document.createElement('th');
        th.setAttribute('scope', "col");
        th.style = 'width:66%;color:var(--color-text);';//th_width;
        tr.appendChild(th);
        th.innerHTML = csvs[0].name;

        let key = csvs[0].types;
        for (let i = 0; i < key.length; i++) {
            let th = document.createElement('th');
            th.setAttribute('scope', "col");
            th.style = "width:" + '33%;color:var(--color-text);';//th_width;
            th.innerHTML = csvs[0].types[i];
            tr.appendChild(th);

            let select = document.createElement('select');
            select.classList = "form-select";
            select.addEventListener('change', function (e) {
                type_selected[i] = types[i][this.selectedIndex];
                search();
            })
            select.style = "color:var(--color-text);background-color:var(--color-background);";
            th.appendChild(select);
            for (type of types[i]) {
                let option = document.createElement('option');
                option.value = type;
                option.innerHTML = type;
                select.appendChild(option);
            }
        }
        console.log(thead, csvs[0].types.length + 1);
    }

    // table data
    {
        let tbody = document.createElement('tbody');
        table.appendChild(tbody);

        let count = 0;
        for (csv of csvs) {
            if (count > 0) {
                let tr = document.createElement('tr');
                tbody.appendChild(tr);
                let td = document.createElement('td');
                td.innerHTML = csv.name;
                td.style = "font-weight:400;color:var(--color-text);";
                tr.appendChild(td);
                let key = csv.types;
                for (let i = 0; i < key.length; i++) {
                    let td = document.createElement('td');
                    td.innerHTML = csv.types[i];
                    td.style = 'color:var(--color-text)';
                    tr.appendChild(td);
                }
            }
            count++;
        }
    }
    //    console.log(document.querySelector("#result"));
}

window.onload = function () {
    getCSV();
}

function search() {
    let count_found = 0;
    // get all td items
    let trs = document.querySelector('tbody').querySelectorAll('tr');
    let keyword = document.querySelector('#keyword').value;
    let keyword_kata = keyword.replace(/[ぁ-ん]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });


    for (tr of trs) {
        let tds = tr.querySelectorAll('td');
        let flgs_hidden = Array(csvs[0].types.length + 1);
        for (let i = 0; i < csvs[0].length + 1; i++) {
            flgs_hidden[i] = false;
        }
        //console.log(flgs_hidden, flgs_hidden.length);
        //console.log([false, false]);
        for (const [index, td] of tds.entries()) {
            if (index > 0) {
                if (type_selected[index - 1] === td.innerHTML ||
                    type_selected[index - 1] === 'すべて') {
                    flgs_hidden[index] = false;
                }
                else {
                    flgs_hidden[index] = true;
                }
            }
            else if (index == 0) {
                if (td.innerHTML.toUpperCase().indexOf(keyword.toUpperCase()) >= 0) {
                    flgs_hidden[index] = false;
                }
                else if (td.innerHTML.toUpperCase().indexOf(keyword_kata.toUpperCase()) >= 0) {

                }
                else {
                    flgs_hidden[index] = true;
                }
            }
        }
        //console.log(flgs_hidden);
        let false_count = 0;
        for (flg_hidden of flgs_hidden) {
            if (flg_hidden == false) {
                false_count++;
            }
        }
        if (false_count == flgs_hidden.length) {
            tr.hidden = false;
            count_found++;
        }
        else {
            tr.hidden = true;
        }
    }


    if (count_found == 0) {
        document.querySelector('#not_found').hidden = false;
    }
    else {
        document.querySelector('#not_found').hidden = true;
    }
}

function resetSearch() {
    document.querySelector('#keyword').value = '';

    for (let i = 0; i < type_selected.length; i++) {
        type_selected[i] = 'すべて';
    }
    //    console.log(type_selected);
    search();

    let options = document.querySelectorAll('option');
    //    console.log(options);
    for (option of options) {
        if (option.value == 'すべて') {
            option.selected = true;
        }
        else {
            option.selected = false;
        }
    }

}

/**
 * https://webllica.com/change-double-byte-to-half-width/
 * 全角から半角への変革関数
 * 入力値の英数記号を半角変換して返却
 * [引数]   strVal: 入力値
 * [返却値] String(): 半角変換された文字列
 */
function toHalfWidth(strVal) {
    //    console.log(strVal);
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
        function (tmpStr) {
            // 文字コードをシフト
            return String.fromCharCode(tmpStr.charCodeAt(0) - 0xFEE0);
        }
    );

    // 文字コードシフトで対応できない文字の変換
    return halfVal.replace(/”/g, "\"")
        .replace(/’/g, "'")
        .replace(/‘/g, "`")
        .replace(/￥/g, "\\")
        .replace(/　/g, " ")
        .replace(/〜/g, "~");
}


// https://www.yoheim.net/blog.php?q=20191101
function hankana2Zenkana(str) {
    var kanaMap = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str
        .replace(reg, function (match) {
            return kanaMap[match];
        })
        .replace(/ﾞ/g, '゛')
        .replace(/ﾟ/g, '゜');
};