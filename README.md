# インダストリアルアート学科公式サイト

外部ページスクレイピングの為，phpを利用します．手元で動作を確認する場合は

```
> cd public
> php -S localhost:8000
```

などとして，ブラウザから http://localhost/8000 へアクセスしてください．phpコマンドがない場合は
```
> brew install php
```
でインストールしてください。brew コマンドがない場合は、brew install で検索してください。
# ブランチの運用について
- main：本番用 → http://industrial-art.sd.tmu.ac.jp/ に反映
- development：開発用 → https://tmu-ia-site.herokuapp.com/ に反映

# Design System
ここで考えます
- [Figma](https://www.figma.com/file/mmJZa69LebPCQYletsSeMQ/TMU-IA-team-library?node-id=312%3A32)
## Typography
- [Kinto Sans](https://github.com/ookamiinc/kinto)
## Color Scheme
仮で定義しました。
- [Accessible color palette](https://toolness.github.io/accessible-color-matrix/?n=gray1&n=gray2&n=gray3&n=gray4&n=gray5&n=gray6&v=1F1F1F&v=595959&v=8C8C8C&v=D9D9D9&v=F5F5F5&v=FFFFFF)
# 補足
node関係が入っているのは、テスト環境のベーシック認証のためであって、本番には何の関係もありません。
他は随時追記します
