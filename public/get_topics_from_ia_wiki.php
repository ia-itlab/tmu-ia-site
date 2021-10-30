  
<?php
//正規表現については以下のサイトを参考にした
// https://qiita.com/kanaxx/items/daca1c57e48e0a8d674a

//$html = file_get_contents("tmp.html");
$html = file_get_contents("http://industrial-art.sd.tmu.ac.jp/wiki/doku.php?id=website:topics");

//改行とタブを全部取っ払い1行にする
$html = preg_replace('/\r\n|\r|\n|\t/', '', $html);

//2つ以上連続するスペースを1個分のスペースに置き換える
$html = preg_replace('/ {2,}/',' ', $html);


// 該当する箇所だけを選別 
preg_match_all('@<!-- CONTENT -->(.*?)<!-- \/CONTENT -->@s',$html ,$matches);
//print_r($matches);
foreach( $matches[0] as $match){
    //print_r($match);
     echo($match);
}

?>


