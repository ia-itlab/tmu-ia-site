  
<?php
// 正規表現については以下のサイトを参考にした
// https://qiita.com/kanaxx/items/daca1c57e48e0a8d674a
// Scrapeするための引数は GETで取得する

$url = $_GET['url'];
$regexp = $_GET['regexp'];

//$html = file_get_contents("tmp.html");
$html = file_get_contents($url);

//改行とタブを全部取っ払い1行にする
$html = preg_replace('/\r\n|\r|\n|\t/', '', $html);

//2つ以上連続するスペースを1個分のスペースに置き換える
$html = preg_replace('/ {2,}/',' ', $html);


// 該当するリストタグだけを表示 現状は 2020年以降のみをスクレイピングする
// '@<li class="informationRow age202(?:.*?)>(.*?)</li>@s'
preg_match_all($regexp, $html ,$matches);
//print_r($matches);
foreach( $matches[0] as $match){
    //print_r($match);
     echo($match);
}

?>


