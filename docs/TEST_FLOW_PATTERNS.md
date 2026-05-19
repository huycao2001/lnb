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

### GitHub Pages Audio Paths

Audio paths should support both local hosting and GitHub Pages under `/lnb`.

```js
function getAppBasePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const moduleIndex = parts.indexOf("dictation");
  if (moduleIndex <= 0) {
    return "";
  }
  return `/${parts.slice(0, moduleIndex).join("/")}`;
}
```

Use it when resolving audio URLs:

```js
function resolveAudioUrl(filename) {
  const base = AUDIO_DIRS[level] || AUDIO_DIRS.easy;
  return `${getAppBasePath()}/${encodePath(base)}/${encodeURIComponent(filename)}`;
}
```
