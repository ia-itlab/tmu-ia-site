  
<?php
// 正規表現については以下のサイトを参考にした
// https://qiita.com/kanaxx/items/daca1c57e48e0a8d674a
// Scrapeするための引数は GETで取得する

// docuwikiの認証処理を加えた変更を追加
// 2024年11月3日　馬場哲晃

require_once('./login_params.ignore.php');
$url = $_GET['url'];
$regexp = $_GET['regexp'];

// cURL セッションの初期化
$ch = curl_init();


// cURLオプションを設定
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // SSL証明書の検証を無効化（必要に応じて）

// URLに特定の条件が含まれる場合のみユーザ認証を設定
if (strpos($url, 'industrial-art.sd.tmu.ac.jp') !== false) { // 認証が必要なドメインの一例
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
}

// 認証付きページからHTMLコンテンツを取得
$html = curl_exec($ch);

// エラーチェック
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
    curl_close($ch);
    exit;
}



// cURL セッションを終了
curl_close($ch);


// 改行とタブを取り除き、1行にする
$html = preg_replace('/\r\n|\r|\n|\t/', '', $html);

// 2つ以上連続するスペースを1つのスペースに置き換える
$html = preg_replace('/ {2,}/', ' ', $html);




// 正規表現で該当箇所を抽出して$matchesに保存
preg_match_all($regexp, $html, $matches);



// 結果の出力
foreach ($matches[0] as $match) {
    echo ($match);
}



?>

