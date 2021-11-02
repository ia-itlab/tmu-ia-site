# インダストリアルアート学科公式サイト

top.htmlのみ外部ページスクレイピングの為，phpを利用します．手元で動作を確認する場合は

```
> cd public
> php -S localhost:8000
```

などとして，ブラウザから http://localhost/8000/top.html へアクセスしてください．phpコマンドがない場合は
```
> brew install php
```
でインストールしてください。brew コマンドがない場合は、brew install で検索してください。


# 命名規則

```
CSSはスネーク
例：  .contents_first
だったけどハイフンにしたい（し始めている）、これは好みが分かれる

Javascriptはキャメル
例:　 testFunction()
これはいいと思っている
```
node関係が入っているのは、テスト環境のベーシック認証のためであって、本番には何の関係もありません。
他は随時追記します
