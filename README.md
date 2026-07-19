# 英検1級 Companion v2.5

PWA対応の英検1級語彙学習アプリです。

Release: v2.5.12 / 20260719-energized-home

## v2.5.12 Energized home cockpit

- 起動時に挨拶、試験までの日数、日替わりメッセージを大きく表示
- 今日の3ミッションを円形ゲージとクエストカードで可視化
- 復習とデイリークイズをトップの主要アクションとして再構成
- PC、スマートフォン、ダークモード、動きを減らす設定に対応

## v2.5.11 DOM XSS hardening

- CodeQLが検出したDOMテキストのHTML再解釈経路を除去
- Word Listとフラッシュカード進捗を、`innerHTML`ではなく安全なDOM APIと`textContent`で描画

## v2.5.10 Security hardening

- Content Security PolicyとReferrer Policyを追加し、外部フォント依存を削除
- Service Workerのキャッシュを同一オリジンの成功レスポンスに限定
- このアプリの接頭辞を持つ旧キャッシュだけを削除し、同一オリジン上の別アプリを保護
- CodeQLによるJavaScriptの継続的なセキュリティ解析を追加
- `.env`、秘密鍵、資格情報ファイルを除外する `.gitignore` を追加
- Writingと学習データが端末内に平文保存されることを明記

## v2.5.9 Sentence quality improvement

- 既知の例文に含まれていた文法・コロケーションの問題を修正
- 動詞と目的語、および形容詞と名詞の意味的適合性チェックを強化
- 発音例外を考慮した `a` / `an` 検証を追加
- 文全体の論理整合性と、正解一意性の回帰テストを強化
- `disconcert`、`reticent`、`culpable`、`malleable`、`edify` の不自然な旧用例を修正

## v2.5.8 Approved example synchronization

- Word ListとFlashcardsでも、Quizと同じ承認済み例文を表示
- 300語すべての語彙例文と承認済み問題の同期を回帰監査

## v2.5.7 Vocabulary collocation quality

- `disconcert` の例文を、人を自然な目的語に取る文脈へ修正
- 人を目的語に取る動詞と抽象名詞の不自然な組み合わせを品質監査で拒否
- バージョン表示とService Workerのキャッシュ識別子を自動監査

## v2.5.6 Confirmed study recovery

- 旧版で記録されなかった日がある場合、ユーザーが確認した継続開始日から今日までを補完
- 既存の学習日は維持し、未来日・不正な日付・10年を超える範囲を拒否
- 復旧前に対象期間を確認し、Current／Longest Streakを学習日集合から再計算

## v2.5.5 Streak reliability

- 学習日は端末のUTC差ではなくJST（Asia/Tokyo）の暦日で記録
- 既存の `days` を維持しつつ、Mission・Writing・単語学習日・旧版の問題履歴から一度だけ復元
- 保存済みの学習日集合からCurrent StreakとLongest Streakを毎回再計算
- 「7日分を復旧」による無条件上書きを廃止し、履歴に基づく再計算へ変更
- 日付境界、うるう日、移行、Current／Longest Streakは `node scripts/test-streak.js` で検証

## v2.5 Learning calendar

- 現在の連続学習日数を大きく表示
- 月間カレンダーで学習日、今日、未学習日を可視化
- 各日のQuiz・Flashcards・Writing達成数と月間達成率を表示
- 前月から当月まで移動して過去の積み重ねを確認
- カレンダーを専用ページへ分離し、ホームの「📣 学習成果」から表示
- iPhone用180pxとPWA用192／512pxを、シンプルなCモノグラムへ刷新
- ホーム上部に、日付ごとに切り替わる20種類のモチベーションメッセージを表示

## v2.4 Question quality

- 300問すべてに同品詞の固定選択肢を用意し、正答率に応じて難易度84〜92を狙って出題
- コロケーション・文法・一意性・難易度を各25点で評価し、80点未満を配信から除外
- 承認済み300問を `EIKEN_EXAMPLE_LIBRARY` として蓄積し、日々の問題に再利用
- AI品質チェッカーは80点未満の問題を最大3回まで自動再生成
- 解説は問題ごとに、文脈・空欄前後の結びつき・コロケーション・誤答選択肢との違いを表示

AIチェックはAPIキーを公開アプリに含めず、開発環境だけで実行します。

```powershell
$env:OPENAI_API_KEY='...'
node scripts/ai-quality-checker.mjs --word intransigent --write approved-candidate.json
node scripts/audit-quiz-quality.js
```

## v2.3 Learning efficiency

- 間違い回数、「まだ」回数、最終学習日、正答率から優先度を自動計算
- 「覚えた」後は1日、3日、7日、14日、30日の間隔で自動復習
- トップ画面の Today's Review から、その日の優先15語をすぐに学習

## Quiz pipeline v2

Quiz delivery is separated from the vocabulary list. `quiz-data.js` contains the approved question bank; generic template questions are rejected and cannot be selected by the app.

Run the deterministic quality gate before publishing:

```powershell
node scripts/audit-quiz-data.js
node scripts/audit-release.js
```

The audit checks question IDs, vocabulary references, blank count, exact/near-duplicate sentences, required acceptance cases, rejected legacy templates, and object-semantic collocations. Verbs that normally act on people are rejected when they take abstract objects such as `efforts`, `policy`, `measures`, or `progress`; for example, `disconcert efforts` is an explicit regression case. AI generation and reverse-answer review must run during development; API keys must never be shipped to GitHub Pages.

## v2.1 Development Policy

Goal: Help the user pass Eiken Grade 1 on October 4.

The app is not a general vocabulary app. Its role is to support a 10-minute morning commute study routine.

### Core use case

Every morning:

1. Answer 10 Eiken Grade 1 Part 1-style vocabulary questions.
2. Review 10 flashcards.
3. Use selected words later in ChatGPT speaking practice.
4. Draft one Eiken Grade 1 writing response.

### v2.1 priorities

- Fix flashcard UX.
- Improve Part 1-style question quality.
- Build a core 700–800 word vocabulary set.
- Prioritize difficult, high-impact words.
- Avoid low-frequency or already-mastered basic words.
- Add Today's Speaking Challenge.
- Add one daily Writing topic with autosaved drafting.

### Out of scope for v2.1

- Listening module
- Advanced analytics
- AI scoring

