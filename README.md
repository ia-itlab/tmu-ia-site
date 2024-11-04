# インダストリアルアート学科公式サイト
東京都立大学システムデザイン学部インダストリアルアート学科ウェブサイトのリポジトリ。コンテンツ更新のみの場合は ia wiki から行い、こちらのリポジトリに修正は入れない、というのが理想的な手続きになります。

## 環境構築
外部ページ（学内ウェブ）スクレイピングの為，phpを利用します．ia wiki内の認証ページからデータを取得するため、最初に以下のコマンドを実行してください．

```
git clone https://github.com/ia-itlab/tmu-ia-site.git
cd tmu-ia-site
touch php/login_params.php
```

`php/login_params.php`（ファイル名は任意） に以下の内容を記述してください．

```php
<?php
// 学部のニュースページとDokuWiki の URL と認証情報
$sd_url = 'https://www.sd.tmu.ac.jp/news.html'; // システムデザイン学部のニュースページ
$username = 'username'; // DokuWiki のユーザ名
$password = 'password';// // DokuWiki のパスワード
?>
```

`php/scrape.php` の行頭で login_params.phpを読み込むようにファイル名を編集してください。

```
手元で動作を確認する場合は

```
> cd public
> php -S localhost:8000
```

などとして，ブラウザから http://localhost:8000 へアクセスしてください．phpコマンドがない場合は
```
> brew install php
```
でインストールしてください。brew コマンドがない場合は、brew install で検索してください。
## ブランチの運用について
- main：本番用 → http://industrial-art.sd.tmu.ac.jp/ に反映
- development：開発用 → 問題なければ main へマージ

## Design System
ここで考えます
- [Figma](https://www.figma.com/file/mmJZa69LebPCQYletsSeMQ/TMU-IA-team-library?node-id=312%3A32)
## Typography
- [Kinto Sans](https://github.com/ookamiinc/kinto)
### Color Scheme
仮で定義しました。
- [Accessible color palette](https://toolness.github.io/accessible-color-matrix/?n=gray1&n=gray2&n=gray3&n=gray4&n=gray5&n=gray6&v=1F1F1F&v=595959&v=8C8C8C&v=D9D9D9&v=F5F5F5&v=FFFFFF)

## 補足
他は随時追記します
