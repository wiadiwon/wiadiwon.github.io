# Homepage update — 2026-10-08

## Publication evidence and boundaries

- MIPCGRL: IEEE Conference on Games (CoG), 2026; **Accepted**, not asserted as published in IEEE Xplore. Title and author order follow the official conference list. Regular paper #217 is a **Best Paper Award Nominee**, not an award winner.
  - Official acceptance and nomination: https://cog2026.org/acceptedpapers
  - Scheduled for a 20-minute Best of CoG presentation on 2026-09-02: https://cog2026.org/schedule
  - Manuscript: https://arxiv.org/abs/2508.09193
  - The official acceptance and schedule pages were read during this update. The schedule is evidence of a scheduled paper presentation, not proof that a particular author delivered it.
  - Final Xplore publication URL, conference DOI and exact publication date remain unconfirmed. The arXiv DOI is not exposed as a conference DOI. News dated `2026.09` explicitly means the conference month; it is not the announcement date.
- VIPCGRL: **Published**, IEEE Transactions on Games, 2026, following the owner's explicit confirmation.
  - Official arXiv record confirms ToG acceptance and links the publication DOI: https://arxiv.org/abs/2508.09860
  - Publication DOI: https://doi.org/10.1109/TG.2026.3713793
  - Code: https://github.com/bic4907/VIPCGRL
  - Exact publication date remains unconfirmed. The 2026-07-17 arXiv revision date is not used as a publication date. DOI retrieval did not establish a date; no date is invented.
- SCOTTI: display year and project reference corrected to 2026, consistent with the existing 2026-03-26 manuscript date. No change to preprint status.
- Publication `date` is now optional. Unconfirmed VIPCGRL/MIPCGRL dates were removed. Lists sort by year descending, then existing known dates descending within a year; undated entries retain collection order on ties. This is not an exact publication chronology.
- MIPCGRL is also featured on the homepage. Accepted status, nominee recognition and distinct arXiv/Conference links are supported by the shared publication card and web CV.
- Past conferences' Xplore registration timing was not used to infer publication state or a date and is not included in public site content.

## Arcana Trigger evidence

Source checkout: `C:\UnityProject\NHNAIGameProject` (read only).

Primary records inspected:

- `README.md`: Arcana Trigger title, NHN Game × AI Hackathon preliminary submission, two-person team, Unity 6/C#, WebGL demo and source URLs.
- `docs/GAME_DESIGN.md` and `docs/DEVELOPMENT_PLAN.md`: shared battle state, card/action mode design and core/card/integration versus action/enemy responsibilities.
- `docs/progress/2026-07-24/M3_CARD_MODE_INTEGRATED_PROGRESS_2026-07-24.md`: card runtime and session integration.
- `docs/progress/procedural-level-generation-2026-08-03.md` and `procedural-level-generation-2026-08-08.md`: seeded generation, connectivity, visual policies and integration checks.
- `docs/progress/boss-card-patterns-2026-08-09.md`: boss card patterns and focused verification.
- `docs/progress/endless-run-death-score-2026-08-09.md`: run progression, floor transitions, scoring and result UI.
- `docs/progress/reward-card-presentation-2026-08-10.md`: reward UI and recorded remaining font/Web validation issues.

The owner confirmed that the team did not pass the preliminary round. Public content distinguishes this result from the practical development experience. Recorded feature tests are historical evidence, not fresh Unity validation or proof that all final browser paths passed. Unity was not modified, built or launched for this website task. No reinforcement-learning dungeon generator is claimed; the game uses seed-based procedural generation. Development period is shown at month precision, July–August 2026, based on the inspected development records.

Arcana Trigger is classified as independent game development rather than industry collaboration. English/Korean detail pages, homepage project cards, news and web CV summaries were added. The demo link is taken from the project README; full gameplay and browser compatibility were not tested here.

## Consistency and preservation

- Korean project cards/sidebar now localize team size.
- Publication count derives from the collection.
- Default sharing-image reference now uses the existing `/profile.jpg`, replacing the missing `/og-default.png`.
- Existing theme, keyword filtering, content and routes are retained.
- `AGENTS.md` was already untracked before the task and was preserved.
- Local ignored `CLAUDE.md` contains historical plans that disagree with current code; this tracked record documents the updated state without rewriting those historical notes.
- Downloadable CV PDF was not edited. Its SHA-256 before the update was `3185D7C1E8C07A580CA6329EAD6BAD55C4A2E6F9653EDED89EE7B85305013712`; verify the final hash before handoff. Web CV updates do not update that PDF.
- No commit, push or deployment was performed.

## Validation

Sandbox `spawn EPERM` was resolved by running the standard Astro commands with approved process permissions, without changing dependencies.

- `npm run check`: exit 0; 26 files, 0 errors, 0 warnings, 43 hints (deprecated Astro/Zod APIs and existing unused declarations). No dependency/API migration was included.
- Final `npm run build`: exit 0; 17 static pages, including both Arcana Trigger detail routes; sitemap generated.
- Node assertions against generated HTML: 295 assertions passed, including status/recognition/author order and source links across both languages' home, publications and web CV; no MIPCGRL DOI/Xplore link; no invented VIPCGRL/MIPCGRL date; game outcome and demo/source links; 224 internal links and existing OG images.
- The initial all-page link check found an existing `/ko/404` language-toggle target in `404.html`. That route is not generated. It predates this change and was excluded from the subsequent 16-page internal-link check; the issue is retained for follow-up rather than folded into this update.
- Browser: Korean publication listing showed Accepted/nominee and distinct source links. Selecting the multi-objective keyword reduced the visible listing to MIPCGRL. Arcana Trigger desktop and mobile detail rendering was inspected.
- At a 390×844 mobile viewport, Korean home, Korean Arcana Trigger and English CV had document scroll width 375px (no horizontal overflow). Mobile navigation opened correctly. English CV displayed Accepted and Best Paper Award Nominee. The temporary viewport override was reset.
- Final PDF SHA-256 equals the before hash: `3185D7C1E8C07A580CA6329EAD6BAD55C4A2E6F9653EDED89EE7B85305013712`.
- `git diff --check`: exit 0. Existing untracked `AGENTS.md` retained.

Remaining unconfirmed items after the initial update: MIPCGRL final Xplore URL/conference DOI/exact publication date; VIPCGRL exact publication date; complete Arcana Trigger final build/gameplay/browser validation. Downloadable CV PDF is unchanged and has not been synchronized to these web CV updates. Changes are local and have not been deployed.

## Follow-up: VIPCGRL publication month confirmed

The owner requested a publication month. The official IEEE Xplore page was successfully inspected in the browser: https://ieeexplore.ieee.org/document/11610890. It identifies the paper as IEEE Transactions on Games **Early Access**, with **Date of Publication: 16 July 2026** and matching DOI `10.1109/TG.2026.3713793`.

Crossref's official API returned only year precision for `published`/`published-print`; its `created` timestamp of 2026-07-16 is a DOI registration timestamp and was not used as publication evidence. The IEEE Xplore publication date provides the decisive evidence.

- Both language versions now record `date: "2026-07-16"`.
- Both homepage news entries now show `2026.07`.
- This is the Early Access publication date, not an issue-assignment date or the 2026-07-17 arXiv revision date.
- Earlier notes describing the date as unconfirmed are historical; VIPCGRL's publication date is now confirmed. MIPCGRL's publication details remain unconfirmed.

## Follow-up: Career OS confirmed corrections

Source: `C:\Career\career-os-v0.1\docs\CV_PORTFOLIO_UPDATE_DIGEST.md` and its website correction memo. The owner explicitly authorized applying the confirmed differences to the public website in this chat, including the three participation-period corrections previously scoped to private applications.

- Personal participation: ACD 2023.09–2024.02, Samsung C-Lab 2022.12–2023.03, Smart Insole 2023.10–2025.01, in both languages. These are not whole-project lifetimes.
- Post-master's descriptive role: Researcher (Post-Master’s) / 석사후연구원, in homepage experience and the September 2025 news. No official employment-contract status is asserted.
- VIPCGRL venue now explicitly states Early Access in collection metadata, homepage news and the project publication paragraph. Existing DOI/date and MIPCGRL Accepted/nominee status remain intact.
- Smart Insole workshop name corrected to 2nd NeurIPS Workshop on Touch Processing: From Data to Knowledge, 2024.
- Project contribution/results prose proposals are pending owner approval and were not applied. The downloadable PDF is unchanged. These follow-up edits are not yet committed or pushed.

## Follow-up: approved project descriptions

The owner approved proposals A–D and explicitly confirmed adding VIPCGRL loss-function design to personal contributions. This supersedes the earlier pending-approval note.

- Applied matching Korean/English VIPCGRL personal contributions, including multimodal representation-learning loss-function design. No sole ownership, reward-design claim or quantified speedup was added.
- Replaced broad VIPCGRL results/first claims with named baselines, 26-participant evaluation and policy-versus-encoder training scope.
- Added ACD cross-play evaluation pipeline and curriculum difficulty-distribution analysis as personal contributions; research results retained separately.
- Added Arcana Trigger Codex-assisted development, human review/validation process and team WebGL/GitHub Pages deployment; existing validation limitations and preliminary-round outcome retained.
- These descriptions are owner-authorized for public use, including the previously private-application contribution statements. No Career OS source files or downloadable CV PDF were edited. No commit or push performed for this follow-up.

Validation for approved descriptions: npm run build exited 0 (17 pages); 32 generated-content assertions passed across six Korean/English project detail pages; git diff --check exited 0. Browser visual inspection was not repeated for this prose-only follow-up.
