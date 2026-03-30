# AGENTS.md

## Purpose

このファイルは、tmu-ia-site リポジトリで作業する AI コーディングエージェント向けの実務ガイドです。README の一般説明を補完し、このリポジトリで安全に調査・修正・レビューするための前提をまとめます。

## Repository Overview

- このサイトは public 配下の静的 HTML をベースにした多ページサイトです。
- 共通ヘッダー、メニュー、フッターは public/parts 配下の HTML を各ページから読み込みます。
- 各ページの表示内容の多くは、JavaScript から PHP エンドポイントを呼び出して外部データを取得し、DOM を組み立てて表示します。
- コンテンツ更新の主系統は DokuWiki 側です。README にも、コンテンツ更新のみなら ia wiki から行うのが理想と記載されています。

## Source Of Truth

- 学科紹介、教員、スタジオ、学生の声、FAQ、トップの topics / announce は、DokuWiki の内容を取得して表示します。
- トップページの一部トピックは、システムデザイン学部サイトのニュース一覧も取得して混在表示します。
- Career ページのみ public/parts/ia2020.csv を直接読み込みます。
- したがって、文言や記事の更新が目的であれば、まず「このリポジトリを直すべきか」「DokuWiki / CSV を直すべきか」を判定してください。

## Architecture And Data Flow

### Common Structure

- 各 HTML ページは public 配下にあります。
- 共通部品は public/parts 配下にあります。
- ページ固有の処理は public/javascript 配下にあります。
- スタイルは public/style 配下にあります。
- 動的取得のサーバ側処理は public/php 配下にあります。

### Shared Parts

- public/parts/header_and_menu.html は、共通ナビゲーションの読み込み元です。
- public/parts/menu.html は、全ページ共通のメニュー定義です。
- public/parts/footer.html は、全ページ共通のフッターです。
- public/javascript/menu.js は現在のファイル名に応じてメニューの active 表示を切り替えます。

共通部品の変更は複数ページへ同時に波及します。単一ページの修正つもりで parts を編集しないでください。

### Dynamic Fetching

- public/php/scrape.php
  - HTML を取得し、指定された正規表現で対象部分を抽出して返します。
  - DokuWiki など認証が必要な URL に対して Basic 認証を付与します。
- public/php/image_proxy.php
  - 認証が必要な内部画像や学内画像を代理取得して返します。
- public/php/get_ogp_image.php
  - 外部ページから og:image を取得し、JSON で返します。

この3ファイルはトップページだけでなく複数ページから参照されます。変更時は影響範囲を広く見てください。

### Page Patterns

- index.html + public/javascript/topics.js
  - DokuWiki の topics / announce と学部ニュースを取得し、カード表示を組み立てます。
- about.html + public/javascript/about.js
  - DokuWiki の about 内容を取得して組み立てます。
- faculty.html + public/javascript/faculty.js
  - 教員データを DokuWiki の HTML 構造に依存して組み立てます。
- studio.html + public/javascript/studio.js
  - スタジオ情報と画像を取得して組み立てます。
- voices.html + public/javascript/voices.js
  - URL パラメータに応じて学生の声を取得します。
- faq.html + public/javascript/faq.js
  - FAQ を取得して表示します。
- career.html + public/javascript/career.js
  - CSV を読み込み、一覧と検索 UI を構築します。

## Safe Editing Rules

### 1. Fix The Right Layer

- 表示文言の修正が DokuWiki 由来なら、このリポジトリの HTML ではなく DokuWiki 側の編集が正しい可能性があります。
- Career のように CSV を source of truth とするページは、JavaScript ではなく CSV 修正が正しい可能性があります。
- まず source of truth を確認してから編集対象を決めてください。

### 2. Respect Existing HTML Contracts

- 取得系 JavaScript は、DokuWiki から返る HTML 構造に強く依存しています。
- 特に ol / li の個数や順序を前提にしている箇所があります。
- DOM 解析ロジックを変える場合は、取得元の構造前提も同時に確認してください。

### 3. Treat PHP Fetchers As Shared Infrastructure

- scrape.php の URL 条件やレスポンス整形を変えると、多数ページに影響します。
- image_proxy.php の URL 判定やヘッダー変更は、内部画像表示に広く影響します。
- get_ogp_image.php の変更は topics カード画像の表示に影響します。

### 4. Preserve Shared Navigation Behavior

- メニュー項目を追加・改名する場合は、public/parts/menu.html と public/javascript/menu.js の対応を確認してください。
- ページ追加時は、HTML ファイル名とメニュー項目 id の対応が成立している必要があります。

### 5. Keep Language Toggle Intact

- public/javascript/language.js は ja / en の表示切替を sessionStorage と URL パラメータで制御します。
- 言語切替対応済みページでは、ja タグと en タグを壊さないでください。

## Secrets And Ignored Files

- .gitignore では *.ignore.* が除外されています。
- 現行の PHP 取得処理は public/php/login_params.ignore.php を読み込みます。
- 認証情報そのものを AGENTS.md、README、コミット、ログ、レビューコメントに載せないでください。
- 秘密ファイルを新規作成・改名・参照先変更する場合は、README と実装の両方に齟齬が出ないようにしてください。

## Known Repository-Specific Caution

- README のセットアップ説明では login_params.php 系の案内がありますが、現行の PHP 実装は login_params.ignore.php を require しています。
- セットアップやドキュメントを直す場合は、「README の説明」と「実装の require 先」を必ず照合してください。
- ドキュメントだけ、または実装だけを片側修正して不整合を増やさないでください。

## Dev And Verification Workflow

### Local Run

- ローカル確認は public 配下で PHP のビルトインサーバを起動します。
- 例: cd public && php -S localhost:8000

### Minimum Checks After Changes

- 共通部品を触った場合
  - 複数ページでヘッダー、メニュー、フッターの表示崩れがないか確認する。
- menu.html / menu.js を触った場合
  - 対応ページで current page のハイライトが正しいか確認する。
- scrape.php / image_proxy.php / get_ogp_image.php を触った場合
  - index、about、faculty、studio、voices、faq の少なくとも代表ページを確認する。
- topics.js を触った場合
  - announce、topics カード、学部ニュース混在表示を確認する。
- career.js または ia2020.csv を触った場合
  - 表示件数、検索、絞り込みが機能するか確認する。
- language.js を触った場合
  - ja / en 切替と URL パラメータ指定の両方を確認する。

## Editing Playbook

### Text Or Layout Fix On A Single Page

- まずその内容が static HTML 由来か、DokuWiki 由来かを判定する。
- DokuWiki 由来なら、フロント側を無理に直す前に取得元修正が妥当か検討する。

### Adding A New Page

- public に HTML を追加する。
- 必要に応じて public/javascript と public/style に対応ファイルを追加する。
- ナビゲーションに載せるなら public/parts/menu.html を更新する。
- 必要なら public/javascript/menu.js の current page 判定との整合を確認する。

### Changing Dynamic Content Mapping

- 取得元 URL、regexp、DOM パースの3点をセットで確認する。
- 一部だけを変えて壊さないようにする。
- 可能なら既存の取得形式を維持し、変更を局所化する。

### Review Guidance

- 「この変更は source of truth を誤っていないか」を最初に確認する。
- 「共通部品または共有 PHP の変更で想定外の横波及がないか」を重点的に確認する。
- 「README と実装の不整合を増やしていないか」を確認する。

## Non-Goals

- AGENTS.md は秘密情報の保管場所ではありません。
- AGENTS.md は一般利用者向けサイト説明の置き場ではありません。
- AGENTS.md は DokuWiki の編集マニュアルではありません。

## When In Doubt

- まず source of truth を確認する。
- 次に shared part か shared PHP かを確認する。
- 最後に、最低限の代表ページを開いて表示確認してから作業完了とする。