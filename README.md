# 開発環境
- Pug
- Sass(書き方はScss)
- Node.js v8.4.0
- npm 5.3.0


# 導入方法

Node.jsの導入

```
#Command Line Tools for Xcodeのインストール
xcode-select --install

#Homebrewのインストール(パッケージ管理ツール)
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

#nodebrewのインストール(homebrewを使って、nodeのパッケージ管理ツールをインストール)
brew install nodebrew

#正常にインストールされたかの確認
nodebrew -v
⇒ nodebrew 0.9.7

#Node.jsとnpmインストール
nodebrew install-binary latest

(エラーが出る場合は以下を実行してもう一度インストール)
mkdir -p ~/.nodebrew/src

#インストールされたNode.jsのバージョンを確認
nodebrew list
⇒ v8.1.2

#Node.jsを有効にする
nodebrew use  v8.1.2

#実行パスを通す
$ export PATH=$PATH:$HOME/.nodebrew/current/bin
$ echo 'export PATH=$PATH:$HOME/.nodebrew/current/bin' >> ~/.bashrc
$ which node
/Users/ユーザ名/.nodebrew/current/bin/node
$ node -v
v8.1.2

#Node.jsとnpmのバージョン確認
node -v
npm -v


#参考サイト
https://qiita.com/taketakekaho/items/dd08cf01b4fe86b2e218


```

PUGとSASSのグローバルインストール

```
#pugのインストール
npm i pug-cli -g

#sassのインストール
gem install sass

```


モジュールのインストール

```
npm install

```


# 実行方法

sassのコンパイル

```
gulp sass

```

pugのコンパイル

```
gulp pug

```

ブラウザで開きながら開発するとき

```
gulp

```

ブラウザが開くので、http://localhost:3001/public/view/index.htmlに移動する



# 命名規則

```
CSSはスネーク
例：  .contents_first

Javascriptはキャメル
例:　 testFunction()

```
