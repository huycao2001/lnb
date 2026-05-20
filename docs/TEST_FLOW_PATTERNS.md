# Test Flow Patterns

Reusable UI and behavior patterns for Lis n Bliss test pages.

## Dictation Test Submit Pattern

Use this pattern for multi-question dictation tests where learners may move freely through questions and submit the whole test even with unanswered items.

### Core Behavior

- If `level` is missing from the URL, default to `?level=easy` with `history.replaceState`.
- Store questions in a `questions` array, even when the test has one item.
- Track:
  - `activeQuestion`
  - `attemptCount`
  - `userAnswers`
  - `completedQuestions`
- Let users move with `Previous question` and `Next question`.
- Preserve typed answers when users move between questions.
- Keep `Check answer` enabled, including for blank input.
- Normalize answers with:

```js
function normalize(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .replace(/\s+/g, " ");
}
```

### Correct Answer Behavior

- On a correct single-question check:
  - Mark `completedQuestions[activeQuestion] = true`.
  - Show a green confirmation panel.
  - Do not auto-advance.
  - Keep navigation available unless the full test has been submitted.

### Submit Test Behavior

The whole test can be submitted at any time, including with blank answers.

On `Submit test`:

- Save the current input into `userAnswers[activeQuestion]`.
- Recalculate `completedQuestions` from `userAnswers`.
- Show a final summary with:
  - Correct answers
  - Attempts used
  - Unanswered count
  - Needs review count
- Lock the test state:
  - Pause audio.
  - Disable the answer input.
  - Disable audio controls.
  - Hide question controls: `Previous question`, `Check answer`, `Next question`, `Submit test`.
  - Show only a parent-page link, e.g. `Back to tests`.

### Parent Page Link

For `dictation/test1/index.html`, the submitted-state action should point to:

```html
<a class="primary-btn" href="../../dictation.html">Back to tests</a>
```

### GitHub Pages paths

The site is published at `https://<user>.github.io/lnb/`. Module test URLs must include that prefix, for example:

`https://<user>.github.io/lnb/dictation/test1?level=easy`

Use relative hub links (`test1?level=easy`) and `js/site.js` for audio and redirects:

```js
const siteBase = LnbSite.getSiteBasePath(); // "" locally, "/lnb" on GitHub Pages
return `${siteBase}/${LnbSite.encodePath(base)}/${encodeURIComponent(filename)}`;
```

Root `404.html` redirects mistaken `/dictation/...` URLs (missing `/lnb`) on `github.io`.
