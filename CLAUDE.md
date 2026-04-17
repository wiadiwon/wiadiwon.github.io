# CLAUDE.md

> Claude Code가 이 레포에서 작업할 때 읽는 지침서. 레포 루트에 위치.

---

## 1. 프로젝트 개요

이서영(Seo-Young Lee)의 개인 포트폴리오 웹사이트. AI Engineer 취업을 목적으로 한 연구 중심 포트폴리오.

- **주 용도**: AI Engineer 취업용 포트폴리오
- **콘텐츠 성격**: 논문 위주 (총 6편), 프로젝트 상세 포함
- **언어**: English / Korean 토글
- **배포**: GitHub Pages (정적)
- **도메인**: `{username}.github.io` (커스텀 도메인 사용 여부 세션 시작 시 확인)

## 2. 기술 스택

| 항목 | 선택 | 비고 |
|------|------|------|
| Framework | Astro 4.x (latest stable) | Content Collections + i18n |
| Styling | Tailwind CSS v3 | CSS 변수 기반 디자인 토큰 |
| Content | Astro Content Collections | Markdown/MDX + Zod 스키마 |
| i18n | Astro 내장 i18n routing | `en` default, `ko` 서브경로 |
| Deployment | GitHub Actions → GitHub Pages | `main` 브랜치 push 시 배포 |
| Package Manager | npm | Node.js 18+ |

## 3. Non-Goals (하지 말 것)

- CMS, DB, 서버 사이드 렌더링 — 전부 정적 사이트로 유지
- 외부 인증/댓글 시스템 추가 금지
- 과도한 애니메이션/3D 효과 — 로딩 속도 우선
- 임의의 라이브러리 설치 금지 — 추가 시 사용자에게 먼저 확인
- 논문 원문 PDF를 repo에 커밋하지 않음 — `public/cv/`에 CV만 둠, 논문은 외부 링크 사용
- 단, 로컬 _assets/papers/에 두고 gitignore 처리하는 것은 권장 — Claude Code가 콘텐츠 생성 시 참조하기 위함.

## 4. 디렉토리 구조

```
.
├── CLAUDE.md                         # 이 파일
├── README.md
├── astro.config.mjs
├── tailwind.config.js
├── package.json
├── .github/
│   └── workflows/deploy.yml          # GitHub Pages 배포
├── public/
│   ├── cv/
│   │   ├── CV_SeoYoungLee_EN.pdf
│   │   └── CV_이서영_KR.pdf
│   ├── profile.jpg
│   ├── favicon.svg
│   └── assets/
│       ├── publications/             # 논문별 figure
│       └── projects/                 # 프로젝트별 figure
└── src/
    ├── content/
    │   ├── config.ts                 # Collection 스키마 정의 (Zod)
    │   ├── publications/
    │   │   ├── en/*.md
    │   │   └── ko/*.md
    │   └── projects/
    │       ├── en/*.md
    │       └── ko/*.md
    ├── i18n/
    │   ├── en.json                   # UI 텍스트
    │   ├── ko.json
    │   └── utils.ts                  # t(), getLocale() 헬퍼
    ├── components/
    │   ├── Hero.astro
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── LangToggle.astro
    │   ├── ThemeToggle.astro
    │   ├── PublicationCard.astro
    │   ├── PublicationList.astro
    │   ├── ProjectCard.astro
    │   └── SectionHeading.astro
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── ProjectLayout.astro
    ├── pages/
    │   ├── index.astro               # EN home (default locale)
    │   ├── publications.astro
    │   ├── projects/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── cv.astro
    │   └── ko/
    │       ├── index.astro
    │       ├── publications.astro
    │       ├── projects/
    │       │   ├── index.astro
    │       │   └── [slug].astro
    │       └── cv.astro
    └── styles/
        └── globals.css               # CSS 변수 + 기본 타이포
```

## 5. Content Collection 스키마

`src/content/config.ts`에 Zod로 정의. 스키마 변경 시 기존 md 파일 frontmatter도 함께 수정할 것.

### `publications` collection
```ts
{
  title: string
  authors: string[]          // 공동 1저자는 "*" 접미사. e.g. "Seo-Young Lee*"
  year: number
  venue: string              // e.g. "IEEE Conference on Games (CoG)"
  status: "published" | "under_review" | "preprint"
  featured: boolean          // 기본 false. Home에 노출할지
  keywords: string[]
  abstract: string
  pdf?: string               // 외부 URL
  code?: string              // GitHub URL
  doi?: string
  bibtex?: string
  image?: string             // "/assets/publications/xxx.png"
}
```

### `projects` collection
```ts
{
  title: string
  category: "funded" | "academic" | "industry"
  role: string               // e.g. "Principal Investigator", "Project Leader"
  period: string             // e.g. "2023.09 – 2024.02"
  teamSize?: number
  summary: string            // 카드에 들어갈 1~2줄
  keywords: string[]
  featured: boolean
  heroImage: string          // "/assets/projects/xxx.png"
  relatedPublications?: string[]  // publication slug 참조
}
```
본문은 MDX. 권장 섹션: `## Motivation` / `## Issues` / `## Method` / `## Results & Contribution`.

## 6. i18n 규칙

- 기본 locale: `en`
- 지원 locale: `en`, `ko`
- URL: `/`, `/publications`, `/projects/...` (EN) / `/ko/`, `/ko/publications`, `/ko/projects/...` (KO)
- 콘텐츠 분리 전략: **언어별 디렉토리 분리** (`publications/en/`, `publications/ko/`). 같은 논문의 EN/KO 버전은 **동일한 slug 사용**(e.g. 둘 다 `2025-vipcgrl.md`).
- UI 문자열은 `src/i18n/{locale}.json`에 key-value로 저장. 컴포넌트에서는 `t(key, locale)` 헬퍼 호출.
- 언어 토글은 동일 URL 경로 유지하며 prefix만 교체. e.g. `/projects/vipcgrl` ↔ `/ko/projects/vipcgrl`.
- 논문 abstract/제목은 **영문 원문 유지**(학술 관행). KO 페이지에서도 논문 제목·저자·venue는 영문으로 두고, 키워드·설명만 번역.

## 7. 디자인 토큰

세션 시작 시 사용자가 A/B/C 중 선택 → 해당 값을 `tailwind.config.js`와 `globals.css`에 반영.

**공통 타이포**
- 영문: `Inter` (Google Fonts)
- 국문: `Pretendard` (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`)
- 본문 16px, 행간 1.7
- 제목 `clamp(1.5rem, 4vw, 3rem)` 반응형 스케일

**레이아웃**
- 최대 너비: `max-w-5xl` (64rem)
- 섹션 간격: `py-16 md:py-24`
- 컨테이너 좌우 패딩: `px-6 md:px-8`

**다크모드**
- Tailwind `darkMode: "class"`
- `<html class="dark">` 토글, localStorage `theme` 영속화
- 시스템 prefers-color-scheme 초기값

## 8. 코딩 컨벤션

- TypeScript strict mode
- 컴포넌트: PascalCase.astro, 한 파일 한 컴포넌트
- 페이지: kebab-case 또는 소문자
- 콘텐츠 파일명: `{year}-{slug}.md` (e.g. `2025-vipcgrl.md`)
- 이미지 파일명: kebab-case (e.g. `vipcgrl-overview.png`)
- 커밋 메시지: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`)
- ESLint/Prettier 설정 후 모든 커밋 전 포맷팅

## 9. 주요 명령어

```bash
npm install              # 의존성 설치
npm run dev              # http://localhost:4321
npm run build            # dist/ 정적 빌드
npm run preview          # 빌드 결과 미리보기
npm run astro check      # 타입 체크
```

## 10. 배포

`.github/workflows/deploy.yml`에서:
1. `main` 브랜치 push 트리거
2. Node 20 세팅 → `npm ci` → `npm run build`
3. `dist/`를 GitHub Pages에 publish (공식 `actions/deploy-pages` 사용)

레포 Settings → Pages에서 Source를 "GitHub Actions"로 설정해야 함.

## 11. 작업 순서 (Claude Code 실행 시)

각 단계 완료 후 사용자에게 확인 받고 다음 단계로 진행.

### Phase 0. 사전 확인 (세션 시작 시)
- [ ] GitHub username 확인 → `astro.config.mjs`의 `site`, `base` 반영
- [ ] 디자인 팔레트 A/B/C 선택
- [ ] 커스텀 도메인 사용 여부
- [ ] `/blog` 섹션 포함 여부
- [ ] `_assets/` 프렙 폴더에 이미지·텍스트 준비됐는지 확인

### Phase 1. 프로젝트 초기화
- [ ] `npm create astro@latest .` (minimal 템플릿)
- [ ] Tailwind 추가: `npx astro add tailwind`
- [ ] i18n 설정: `astro.config.mjs`에 `i18n: { locales: ["en", "ko"], defaultLocale: "en" }`
- [ ] `.gitignore`, `.editorconfig`, ESLint + Prettier
- [ ] `CLAUDE.md` 이 파일 루트에 배치

### Phase 2. 디자인 토큰 적용
- [ ] `tailwind.config.js`에 팔레트 반영
- [ ] `src/styles/globals.css`에 CSS 변수, 타이포
- [ ] Pretendard + Inter 웹폰트 링크

### Phase 3. 공통 컴포넌트
- [ ] `BaseLayout.astro` (head, nav, footer, 다크모드 스크립트)
- [ ] `Nav.astro` + `LangToggle.astro` + `ThemeToggle.astro`
- [ ] `Footer.astro`
- [ ] `SectionHeading.astro`

### Phase 4. Content Collections
- [ ] `src/content/config.ts` 스키마 작성
- [ ] `_assets/` 폴더의 콘텐츠를 기반으로 publications 6편 md 작성 (EN)
- [ ] KO 번역본 작성 (키워드·설명만 번역, 논문 메타는 영문 유지)
- [ ] projects md 작성 (대표 연구 2개 + 포트폴리오 2개)

### Phase 5. Publications 페이지
- [ ] `/publications`, `/ko/publications`
- [ ] 연도 역순 정렬, 공동 1저자 별표 강조
- [ ] 키워드 필터 (클라이언트 측 JS 최소화, 가능하면 쿼리 파라미터)

### Phase 6. Projects
- [ ] `/projects` 카드 그리드 (Funded / Academic / Industry 탭 또는 배지)
- [ ] `/projects/[slug]` 상세 페이지 (MDX 렌더)

### Phase 7. Home
- [ ] Hero + Research Interest + Featured Publications 3 + Featured Projects 2~3
- [ ] News 섹션 (선택, 하드코딩 가능)

### Phase 8. CV 페이지
- [ ] 온페이지 요약 (Education, Experience, Publications 링크, Skills)
- [ ] PDF 다운로드 버튼 2개 (EN/KO)

### Phase 9. 반응형 / SEO / 접근성
- [ ] 모바일 반응형 점검
- [ ] 각 페이지 `<title>`, `<meta description>`, OG 이미지
- [ ] `sitemap-integration`, `robots.txt`
- [ ] 이미지 alt, heading 계층, 키보드 네비게이션

### Phase 10. 배포
- [ ] GitHub Actions 워크플로우 작성
- [ ] 레포 Settings → Pages → GitHub Actions로 변경
- [ ] 실제 URL 동작 확인
- [ ] 404 처리, favicon, og:image 확인

## 12. 이서영님 개인 정보 (콘텐츠 원본)

아래 정보는 원본이며 콘텐츠 md 작성 시 참조. 변경 시 이 섹션도 업데이트.

- **이메일**: seoyoung.john@gmail.com
- **전화**: +82 10-2526-8662 (페이지에는 미노출)
- **위치**: Seoul, Korea
- **현 소속**: 미소속
- **학력**:
  - M.S. AI, GIST (2023.08 – 2025.07), GPA 4.20/4.50, Advisor: Kyung-Joong Kim
  - B.S. CSE, Dongguk University (2017.03 – 2023.02), GPA 3.96/4.50
- **Research Keywords**: reinforcement learning, multimodal representation learning, PCG, human-AI interaction, human pose estimation
- **Skills**: Python, C++, PyTorch, JAX, Flax, Unity, Git, Docker
- **Awards**: NRF 석사과정생연구장려금 (PI, ₩12M, 2024), Dongguk 인재육성장학(우수) (2022)
- **License**: 정보처리산업기사 (2020.08)
- **Google Scholar**: (세션 시작 시 URL 확인)
- **GitHub**: (세션 시작 시 URL 확인)

### 논문 목록 (6편)

1. **[Under Review @ IEEE ToG 2025]** *Human-Aligned Procedural Level Generation RL via Text-Level-Sketch Shared Representation* — Baek\*, **Lee\***, Kim, Hwang, Kim. (공동 1저자)
2. **[CoG 2025]** *IPCGRL: Language-Instructed RL for Procedural Level Generation* — Baek, Kim, **Lee**, Kim, Kim.
3. **[Under Review @ CoG 2026]** *Multi-Objective Instruction-Aware Representation Learning in PCGRL* — Kim, Hwang, Baek, **Lee**, Kim.
4. **[IEEE Access 2025]** *Automatic Curriculum Design for Zero-Shot Human-AI Coordination* — You, Ha, **Lee**, Kim.
5. **[NeurIPS Workshop 2024]** *Smart Insole: Predicting 3D human pose from foot pressure* — Han, **Lee**, Park, Akan, Luo, Kim.
6. **[arXiv]** *Shared Representation for 3D Pose Estimation, Action Classification, and Progress Prediction from Tactile Signals* — Han, **Lee**, Park, Akan, Luo, DelPreto, Kim.

### 대표 프로젝트

- **VIPCGRL (Funded / Academic, 졸업논문 확장판)**: 텍스트·레벨·스케치 멀티모달 공유 임베딩 기반 human-aligned PCGRL
- **Smart Insole (Funded, GIST-MIT)**: 촉각 센서 스트림 기반 3D 포즈 추정·행동 인식
- **Automatic Curriculum for Zero-Shot H-AI Coordination (Academic)**: Overcooked 환경 UED 확장
- **Samsung C-Lab HAR/PFD (Industry, 학부)**: 미술 창작 행동 인식 + 작품 영역 탐지 Android 앱

## 13. Decision Log

세션 진행 중 중요한 결정이 생기면 여기에 추가.

- 2026-04-16 기술 스택 Astro + Tailwind 확정
- 2026-04-16 i18n: 언어별 디렉토리 분리, 동일 slug 사용
- 2026-04-16 논문 메타데이터는 EN 유지, UI만 번역
- 2026-04-17 **Astro 6.x 사용** — CLAUDE.md에 4.x로 명시됐으나 현재 최신은 6.1.7. Content Collections API가 `src/content.config.ts`로 이동. 새 프로젝트이므로 최신 버전 사용.
- 2026-04-17 **Tailwind 4.x 사용** — CLAUDE.md에 v3로 명시됐으나 현재 최신은 4.2.2. CSS-first 설정 방식 (`@tailwindcss/vite` Vite 플러그인). `tailwind.config.js` 없음.
- 2026-04-17 **디자인 팔레트 B 확정** — 배경 #111111, 표면 #1A1A2E, 포인트 #818CF8 (indigo-400). 다크 모드 기본값.
- 2026-04-17 **라이트 모드 토큰 정의** — bg #FFFFFF, surface #F8FAFC, accent #6366F1, text #1E293B (WCAG AA 충족).
- 2026-04-17 **커스텀 도메인 미사용** — `wiadiwon.github.io` 직접 배포.
- 2026-04-17 **blog 섹션 미포함** — 포트폴리오 집중.
- 2026-04-17 **Featured Publications 3편** — VIPCGRL(01), ACD(04), Smart Insole(05). 플래그십 + 다양성 고려.
- 2026-04-17 **Featured Projects 3개** — VIPCGRL, Smart Insole, ACD.
- 2026-04-17 **석사 논문(00_HL-PCGRL) publications 목록 제외** — CLAUDE.md 12절 논문 목록(6편)에 없음. VIPCGRL 프로젝트 페이지에서 prior work로 언급.
- 2026-04-17 **CV PDF 단일 파일** — `_assets/cv/CV_SeoyoungLee.pdf` 한 개만 존재. EN/KO 버튼 모두 동일 파일 연결.
- 2026-04-17 **프로필 사진 없음** — 이니셜 "SL" gradient avatar placeholder 사용.
- 2026-04-17 **프로젝트/논문 이미지 없음** — CSS gradient 배경으로 대체.
- 2026-04-17 **키워드 필터** — 멀티셀렉트, OR 로직, URL query param (`?keywords=...`).
- 2026-04-17 **애니메이션** — CSS transitions + Intersection Observer. 외부 라이브러리 없음. `prefers-reduced-motion` 지원.

## 14. 주의 사항

- **논문 원문 PDF**: 레포에 커밋 금지. 출판사 권리 문제 가능. 외부 링크(IEEE Xplore, arXiv 등) 사용.
- **고해상도 이미지**: `public/assets/`에 들어가는 figure는 사전에 리사이즈(장변 1600px 이하, WebP 권장).
- **개인 연락처**: 전화번호는 페이지에 노출하지 않음. 이메일만 공개.
- **Google Scholar CAPTCHA**: 프로필 URL은 공개해도 되지만 자동 크롤링은 피함.
- **저자 순서**: Publications 리스트에서 이서영님 이름은 볼드 처리.