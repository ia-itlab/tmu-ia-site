<?php

// DokuWiki の URL と認証情報
require_once('login_params.ignore.php');

// cURL セッションの初期化
$ch = curl_init();

// cURL オプションを設定
curl_setopt($ch, CURLOPT_URL, $dokuwiki_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // SSL証明書の検証を無効化（必要に応じて）

// ベーシック認証の設定（DokuWikiがHTTP認証を使用している場合）
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");

// リクエストの実行
$response = curl_exec($ch);

// エラーチェック
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    // 結果の出力（または、必要に応じて変数に格納して処理）
    echo $response;
}

// cURL セッションの終了
curl_close($ch);
