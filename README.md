# 英検1級 Companion v2.3

PWA対応の英検1級語彙学習アプリです。

Release: v2.3.1 / 20260716-streak-fix

## v2.3 Learning efficiency

- 間違い回数、「まだ」回数、最終学習日、正答率から優先度を自動計算
- 「覚えた」後は1日、3日、7日、14日、30日の間隔で自動復習
- トップ画面の Today's Review から、その日の優先15語をすぐに学習

## Quiz pipeline v2

Quiz delivery is separated from the vocabulary list. `quiz-data.js` contains the approved question bank; generic template questions are rejected and cannot be selected by the app.

Run the deterministic quality gate before publishing:

```powershell
node scripts/audit-quiz-data.js
```

The audit checks question IDs, vocabulary references, blank count, exact duplicate sentences, required acceptance cases, and rejected legacy templates. AI generation and reverse-answer review must run during development; API keys must never be shipped to GitHub Pages.

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
