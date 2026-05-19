# Lis n Bliss — Application Knowledge Base

> Reference document for product rationale, pedagogy, module behavior, and UX flow.  
> Use when extending features, writing content, or onboarding contributors.

---

## 1. Product Overview

**Lis n Bliss** is a web-based EFL listening practice platform that integrates **Phoneme Discrimination**, **Dictation**, and **Note-taking** into a single learning path. Unlike tools that rely on passive listening or static multiple-choice drills, it enforces a **dynamic feedback loop**: learners must **practice until correct** before advancing to harder stages.

**Target learners:** EFL students across the proficiency spectrum (approximately **A1–C1**), with scaffolded difficulty in each module.

**Core design principle:** Support **working memory** during listening by sequencing tasks from bottom-up sound processing toward higher-level synthesis and retention.

---

## 2. Rationale and Significance

### 2.1 The listening–working-memory problem

Many EFL learners struggle with listening comprehension because **working memory is overloaded**: they must decode individual phonemes while simultaneously grasping utterance-level meaning. When decoding consumes attention, global comprehension suffers.

### 2.2 Gap in existing tools

| Typical EFL tools | Limitation |
|-------------------|------------|
| Passive listening exercises | Little active decoding or retention demand |
| Simple multiple-choice quizzes | Weak link between sound discrimination and productive skills |
| Static content libraries | No mastery-gated progression |

**Lis n Bliss** addresses these gaps by:

1. Combining **phoneme-level**, **dictation-level**, and **note-taking-level** practice in one app.
2. Requiring **accurate responses before progression** (retry-until-correct).
3. Scaffolding difficulty from **single words** → **sentences** → **dialogues / talks / discussions**.

### 2.3 Module–learner fit

| Module | Primary skill focus | Typical learner need |
|--------|---------------------|----------------------|
| **A — Phoneme Discrimination** | Bottom-up processing; sound–word recognition | Difficulty hearing and distinguishing sounds/words |
| **B — Dictation** | Sound-to-spelling; retention while listening | Understands meaning but struggles to connect speech to accurate written form |
| **C — Note-taking** | Key-word identification; organizing spoken information; synthesis | Needs practice turning audio into structured notes |

---

## 3. Platform Architecture and User Journey

### 3.1 High-level flow

```
Log-in → Dashboard → Select module → Select level (Easy / Medium / Hard) → Select test → Practice session
```

### 3.2 UI/UX entry points (current codebase)

| Screen | File | Role |
|--------|------|------|
| Landing / module overview | `index.html` | Hero, module cards, feature summary |
| Log-in | `login.html` | Authentication entry |
| Module hubs | `phoneme.html`, `dictation.html`, `note-taking.html` | Level tabs, test listing, launch practice |
| Practice sessions | `phoneme/test1/`, `dictation/test1/`, `note-taking/test1/` | Level-specific tasks (query param `?level=easy\|medium\|hard`) |

### 3.3 Global interaction rules

- **Mastery gating:** Incorrect answers trigger **retry**; advancement is blocked until the response is correct (module-specific details below).
- **Positive feedback:** Correct answers show confirmation (e.g. **“Well done”** in Phoneme module).
- **Negative feedback:** Incorrect answers prompt **“Try again”** and/or **audio replay** where applicable.
- **Progression:** After mastery at a level, learners may unlock harder content or additional affordances (e.g. “Show full sentence/dialogue”).

---

## 4. Module A — Phoneme Discrimination (Multiple Choice)

**Pedagogical focus:** Bottom-up language processing — discriminating similar sounds (minimal pairs) in isolation and in context.

**Format:** Multiple choice (listen → select correct option).

### 4.1 Easy (A1–A2)

| Aspect | Specification |
|--------|---------------|
| Input | Single words |
| Task | Listen and choose the correct sound or word |
| On correct | Instant **“Well done”**; proceed |
| On incorrect | **“Try again”** + **replay audio** |

### 4.2 Medium (B1–B2)

| Aspect | Specification |
|--------|---------------|
| Input | Sentences containing minimal pairs |
| Task | Identify the correct minimal-pair target in the sentence |
| On incorrect | Re-attempt until correct |
| On correct | Unlock **“Show a full sentence”** for contextual verification |

### 4.3 Hard (C1)

| Aspect | Specification |
|--------|---------------|
| Input | Dialogues with embedded minimal pairs |
| Task | Identify minimal pairs in conversational context |
| On incorrect | Re-attempt until correct discrimination |
| On correct | Unlock **“Show Full Dialogue”** for meaning verification in context |
| Extra affordance | May include recording-related UI for extended practice |

---

## 5. Module B — Dictation

**Pedagogical focus:** Bridge **sound recognition** and **working memory retention** — connecting heard speech to accurate written form.

**Format:** Listen → type in text field(s).

### 5.1 Easy (A1–A2)

| Aspect | Specification |
|--------|---------------|
| Input | Short single words |
| Task | Type exactly what is heard |
| On incorrect | Re-attempt spelling until correct |
| On correct | Proceed to next item **or** use **“Skip”** to jump to the next challenge |

### 5.2 Medium (B1–B2)

| Aspect | Specification |
|--------|---------------|
| Input | Audio clip + sentence frame with gaps |
| Task | Type missing phrase(s) to complete the sentence |
| On incorrect | Re-attempt transcription until sentence is complete and accurate |
| On correct | Confirm answer; progress through remaining items in the set (**typically 5 items per set**) |

### 5.3 Hard (C1)

| Aspect | Specification |
|--------|---------------|
| Input | Extended talk / monologue audio |
| Task | Transcribe spoken content into text box |
| On incorrect | Re-attempt; **highlight wrong segments in red** until transcription matches audio exactly |
| On correct | Validate input; advance to next challenge in sequence |

---

## 6. Module C — Note-taking

**Pedagogical focus:** Most advanced module — **working memory**, **information synthesis**, and structured capture of spoken content.

### 6.1 Easy (A1–A2)

| Aspect | Specification |
|--------|---------------|
| Input | Audio recording + partial notes with blanks |
| Task | Fill blanks to complete notes (**≤ 2 words and/or a number** per blank) |
| On incorrect | Re-attempt specific field(s) until accurate |
| On correct | Confirm details; progress through remaining tasks in the series |

### 6.2 Medium (B1–B2)

| Aspect | Specification |
|--------|---------------|
| Input | Audio track + visual map / flowchart |
| Task | Complete the visual mapping (**≤ 2 words** per answer) |
| On incorrect | Re-attempt specific steps in the flowchart until accurate |
| On correct | Confirm map logic; progress through remaining tasks in the set |

### 6.3 Hard (C1)

| Aspect | Specification |
|--------|---------------|
| Input | Discussion audio + information items + lettered option list |
| Task | Match given information to correct details by selecting letters |
| On incorrect | Re-listen and re-attempt matching until associations are correct |
| On correct | Confirm matches; progress through remaining tasks in the set |

---

## 7. Cross-Module Comparison

| Dimension | Phoneme (A) | Dictation (B) | Note-taking (C) |
|-----------|-------------|---------------|-----------------|
| Processing level | Bottom-up (sounds/words) | Sound → spelling / phrases | Discourse → structured notes |
| Response type | Multiple choice | Free typing | Blanks / map labels / letter matching |
| Primary retry trigger | Wrong option selected | Spelling / gap / transcription mismatch | Wrong blank, map step, or match |
| Unlock on success | Full sentence / full dialogue | Next item or skip (Easy) | Next task in series |
| CEFR span | A1–C1 | A1–C1 | A1–C1 |

---

## 8. Feedback and Progression Model

### 8.1 States (conceptual)

```
LISTEN → RESPOND → EVALUATE
                    ├─ Correct  → CONFIRM → ADVANCE (or unlock helper)
                    └─ Incorrect → RETRY (+ replay / highlight / field focus)
```

### 8.2 Module-specific feedback affordances

| Affordance | When used |
|------------|-----------|
| Audio replay | Phoneme (especially Easy), all modules on retry |
| “Well done” / confirmation | Correct answer (Phoneme: explicit; others: confirm + progress) |
| “Try again” | Incorrect Phoneme response |
| Show full sentence / dialogue | Phoneme Medium / Hard after correct answer |
| Red highlight on errors | Dictation Hard (partial transcription mismatch) |
| Field- or step-level retry | Note-taking (specific blanks or flowchart steps) |
| Skip | Dictation Easy only (after correct, optional bypass) |

### 8.3 Content set conventions

- **Dictation Medium:** Sets of **5 items**; complete all before leaving the set.
- **Note-taking:** Series of tasks per test; field-level retry preserves progress on correct fields where implemented.

---

## 9. Proficiency Level Mapping

| UI label | CEFR (approx.) | Cognitive demand |
|----------|----------------|------------------|
| **Easy** | A1–A2 | Words, short utterances, heavily guided formats |
| **Medium** | B1–B2 | Sentences, gapped completion, visual organizers |
| **Hard** | C1 | Extended speech, dialogues/discussions, exact transcription or complex matching |

Levels are **independent per module** (a learner may be on Easy Phoneme and Medium Dictation simultaneously).

---

## 10. Implementation Notes for Contributors

### 10.1 When adding a new test

1. Add hub entry under the correct module HTML (`phoneme.html`, `dictation.html`, or `note-taking.html`).
2. Create a test folder (e.g. `dictation/test2/index.html`) following existing `test1` patterns.
3. Pass level via URL: `?level=easy|medium|hard`.
4. Enforce **retry-until-correct** before enabling “Next” or level unlock.
5. Align task format with the level specification in Sections 4–6.

### 10.2 Content authoring checklist

- [ ] Audio matches CEFR level (speed, vocabulary, length).
- [ ] Easy: minimal cognitive load; Hard: realistic discourse length.
- [ ] Answer keys account for acceptable variants only where pedagogy allows (Dictation Hard: exact match).
- [ ] Note-taking blanks respect **≤ 2 words** (and numbers where specified).
- [ ] Minimal pairs are acoustically and orthographically distinct (Phoneme).

### 10.3 Terminology (stable vocabulary)

| Term | Meaning in this app |
|------|---------------------|
| **Practice until correct** | No forward progress on a item until the canonical answer is submitted |
| **Minimal pair** | Two words/sounds differing by one phoneme; learner selects which was heard |
| **Mastery gating** | UI/logic that blocks level or test completion until criteria met |
| **Working memory integration** | Task design that forces simultaneous decode + retain + organize |

---

## 11. Product Vision Summary

Lis n Bliss treats listening as a **trainable skill stack**:

1. **Hear accurately** (Phoneme Discrimination)  
2. **Encode to text** (Dictation)  
3. **Organize and retain meaning** (Note-taking)  

The platform’s differentiator is not content volume alone but a **closed-loop practice system** that respects cognitive load, enforces accuracy, and scaffolds learners from sound-level processing to discourse-level note-taking across the A1–C1 range.

---

## Document metadata

| Field | Value |
|-------|--------|
| App name | Lis n Bliss |
| Last aligned with requirements | 2026-05-18 |
| Related paths | `index.html`, `login.html`, `phoneme.html`, `dictation.html`, `note-taking.html`, `*/test1/` |

*Update this file when module rules, level definitions, or user flow change.*
