<?php
// image_proxy.php

require_once('./login_params.ignore.php');

if (!isset($_GET['url'])) {
    http_response_code(400);
    echo '画像URLが必要です';
    exit;
}

$imageUrl = urldecode($_GET['url']);

// cURLセッションを初期化
$ch = curl_init();

// cURLオプションを設定
curl_setopt($ch, CURLOPT_URL, $imageUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

// 画像URLが認証を必要とする場合
if (strpos($imageUrl, 'industrial-art.sd.tmu.ac.jp') !== false) {
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
}

// 画像を取得
$imageData = curl_exec($ch);

// エラーチェック
if (curl_errno($ch)) {
    http_response_code(500);
    echo '画像の取得エラー: ' . curl_error($ch);
    curl_close($ch);
    exit;
}

// 画像のコンテンツタイプを取得
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// cURLセッションを終了
curl_close($ch);

// 適切なヘッダーを設定
header('Content-Type: ' . $contentType);
header('Cache-Control: max-age=86400'); // 1日間キャッシュ（任意）

// 画像データを出力
echo $imageData;
?>
