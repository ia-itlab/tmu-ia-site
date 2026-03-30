<?php
// image_proxy.php

require_once('./login_params.ignore.php');

define('IMAGE_PROXY_CONNECT_TIMEOUT_MS', 2000);
define('IMAGE_PROXY_TIMEOUT_MS', 12000);

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
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, IMAGE_PROXY_CONNECT_TIMEOUT_MS);
curl_setopt($ch, CURLOPT_TIMEOUT_MS, IMAGE_PROXY_TIMEOUT_MS);
curl_setopt($ch, CURLOPT_ENCODING, '');
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; TMU-IA-Site/1.0; +https://industrial-art.sd.tmu.ac.jp/)');

$imageUrlParts = parse_url($imageUrl);
if ($imageUrlParts !== false && isset($imageUrlParts['scheme']) && isset($imageUrlParts['host'])) {
    $referer = $imageUrlParts['scheme'] . '://' . $imageUrlParts['host'] . '/';
    curl_setopt($ch, CURLOPT_REFERER, $referer);
}

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language: ja,en-US;q=0.9,en;q=0.8'
));

// 画像URLが認証を必要とする場合
if (strpos($imageUrl, 'industrial-art.sd.tmu.ac.jp') !== false) {
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
}

// 画像を取得
$imageData = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

// エラーチェック
if (curl_errno($ch)) {
    http_response_code(500);
    echo '画像の取得エラー: ' . curl_error($ch);
    curl_close($ch);
    exit;
}

if ($statusCode >= 400 || $imageData === false) {
    http_response_code($statusCode >= 400 ? $statusCode : 502);
    echo '画像の取得エラー';
    curl_close($ch);
    exit;
}

// 画像のコンテンツタイプを取得
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

// cURLセッションを終了
curl_close($ch);

// 適切なヘッダーを設定
header('Content-Type: ' . ($contentType ?: 'application/octet-stream'));
header('Cache-Control: max-age=86400'); // 1日間キャッシュ（任意）

// 画像データを出力
echo $imageData;
?>
