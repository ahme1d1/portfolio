# Ahmed Gabal portfolio: build spec

The design is a set of Claude Design boards (canvas v73). This file distils every rule the code must
follow, so nobody has to open the boards to know them. When a value here and a board disagree, the
board wins and this file gets fixed.

## Stack

- Next.js 16.4 App Router with Cache Components and Partial Prefetching (the 16.4 defaults).
  `ensureStatic = 'navigation'` on every page (a test enforces it): every page is prerendered and
  the build fails if anything becomes request-time. The 404 catch-all is the one exception.
- React 19.3, TypeScript 6.0 strict (+ `noUncheckedIndexedAccess`). TypeScript 7 is not used because
  typescript-eslint does not support it yet.
- Tailwind CSS v4 (CSS-first, `@theme` mapped to the CSS variables below).
- Vitest + React Testing Library (unit, component), Playwright + axe (end to end).
- Hosting: Vercel Hobby (`*.vercel.app`). Contact form: Web3Forms (free, 250 messages a month).

## Routes

| Path | Page |
|---|---|
| `/` | redirects to `/en/` (no language sniffing) |
| `/{en,ar}/` | Home |
| `/{en,ar}/work/` | Work |
| `/{en,ar}/work/{fantasy-eg,educoursez,vodafone-modernization,tikvideo,cultural-bridge,qima,lean-academy}/` | case studies |
| `/{en,ar}/experience/` | Experience (the EVA Pharma row is `#experience-eva-pharma-en` / `-ar`) |
| `/{en,ar}/services/`, `/{en,ar}/about/` | Services, About |
| `/{en,ar}/contact/` | Contact, `?topic=role` or `?topic=project` pre-selects the topic |
| `/cv/<file>.pdf` | the CV (one React-first PDF) |
| anything else | 404 with HTTP status 404 (localized under `/en/` and `/ar/`, English elsewhere) |

All URLs end with a trailing slash. The language switch links to the same page in the other locale.

## Next.js 16.4 behaviours the code must respect

- **404s render in the browser.** Every `notFound()` response is an error shell whose content
  streams in and renders with JavaScript. The status is 404; `NotFoundView` sets the title itself
  (React 19 `<title>`), because the metadata title is dropped. An unknown first segment (`/fr/`)
  still gets the English shell from the layout, so its page's `notFound()` shows the site's 404.
- **Previous pages stay in the DOM.** Next keeps up to three visited routes mounted and hidden
  (`<Activity>`, `display: none`). So: every `id` must be unique across pages and languages (suffix
  it with the locale and the page), transient UI such as the mobile menu resets in a
  `useLayoutEffect` cleanup, and tests must query visible elements.
- **Ids:** server components build them with `pageId(page, part, locale)` (`lib/ids.ts`), never
  `useId` (on the server it restarts at the same value on every page, so two kept pages collide).
  Client components may use `useId`. A test mounts Home and Work in both languages together and
  fails on any duplicate id. Duplicated responsive variants (desktop vs phone link groups) carry no
  ids and no `MirrorBlock`.
- **Focus moves in event handlers** (after `flushSync`), never in effects: effects re-run when a
  kept page is shown again. Transient state resets in a `useLayoutEffect` cleanup.
- **The language mirror uses React `<ViewTransition>`.** The switch carries the `locale-switch`
  transition type; `MirrorBlock` names blocks that move, `MirrorFade` (shared names) fades main and
  footer. Next hides the old page instead of unmounting it; React pairs the two pages through the
  shared names, and neither component sets `enter` or `exit`. Only blocks on screen before and after
  pair, and Next scrolls the new page to the top before React measures, so a switch from further
  down is a plain cross-fade. Ordinary navigations start no view transition (e2e checks it). React
  shrinks the `::view-transition` overlay to 0x0; `right: auto` on it keeps the moving blocks on
  screen in RTL.

## Content rules

- One language per page. The Arabic site is a full mirror: `lang` and `dir` are set on `<html>`,
  never in CSS.
- **No em dashes** anywhere in copy. Date ranges use an en dash with spaces ("2024 – present").
  Straight quotes only.
- **No invented numbers, clients or testimonials.** A value Ahmed has not given is `null` in the
  content and is left out of the page. When every item of a section is `null`, the whole section is
  left out. No visible `[brackets]` ever ship.
- The four "More projects" case studies (TikVideo, Cultural Bridge, Qima, Lean Academy) never show
  dates or the name of the company the work was done through.
- Vodafone: story and diagrams only (NDA). No code and no screenshots.
- No small ALL-CAPS labels, no "A · B · C" strings (use comma lists), one colour per heading,
  numbering only for real sequences, divided lists instead of card grids (except project media
  and the contact panel).
- Arrows only on filled primary buttons. In Arabic they point left.
- The CV button lives only in the header and on Experience.
- Arabic: Western digits, Latin words wrapped in `<bdi>`, a space after و before a Latin word, and
  `و <bdi>Latin</bdi>` kept together with `white-space: nowrap`. Emails, URLs and phone numbers sit
  in `dir="ltr"`.
- **Inline markup in copy** (`lib/rich/parse.ts`, rendered by `<Rich>`), so content stays plain
  typed strings: `{React}` is Latin text (`<bdi dir="ltr" lang="en">`, set in Bricolage by the
  `:lang(en)` rule), `*Vodafone Italy*` is emphasis (600, text colour), `{$email}` is a slot the
  component fills. "و {X}", "بـ {X}" and "لـ {X}" are glued with `nowrap` automatically. A content
  test fails on broken markup and on any Latin letter outside `{…}` in Arabic copy of the rich
  modules (home, projects, companies, work, contact). Brand names that are the same in both
  languages live in language-neutral `data.ts` modules and go through `asLatin()`.
- One string per language: mobile shows the desktop copy (Round 7 D5).

## Colour tokens (light / dark)

| Token | Light | Dark | Use |
|---|---|---|---|
| bg | `#FFFFFF` | `#000000` | page |
| surface | `#F4F4F6` | `#141414` | panels, band, hover fill |
| tint | `#EEF0FF` | `#12162E` | portrait card |
| border | `#E6E6E8` | `#262626` | dividers |
| strong | `#84848C` | `#6B6B73` | input and tile borders, nav hover line |
| text | `#000000` | `#F2F2F2` | body text |
| text2 | `#2E2E2E` | `#D4D4D4` | secondary text, black-button hover |
| muted | `#5E5E5E` | `#A3A3A3` | captions, footer links |
| accent | `#1F3DFF` | `#3D57FF` | accent fills |
| accentText | `#1F3DFF` | `#8C9AFF` | links and accent text |
| onAccent | `#FFFFFF` | `#FFFFFF` | text on accent |
| onAccentMuted | `rgba(255,255,255,0.86)` | `#FFFFFF` | secondary text on accent |
| ok | `#16A34A` | `#4ADE80` | live dot |
| okText | `#166534` | `#86EFAC` | live pill text |
| okBg | `rgba(22,163,74,0.10)` | `rgba(74,222,128,0.12)` | live pill fill |
| chipBg | `rgba(31,61,255,0.08)` | `rgba(140,154,255,0.12)` | chips |
| inverseBg | `#000000` | `#F2F2F2` | black button, skip link |
| inverseText | `#FFFFFF` | `#000000` | text on inverse |
| inverseMuted | `#C9C9C9` | `#3A3A3A` | secondary text on inverse |
| error | `#B42318` | `#FF8A80` | errors |
| imgLine | `rgba(0,0,0,0.10)` | `rgba(255,255,255,0.10)` | `outline: 1px solid; outline-offset: -1px` on images |
| shadow | `0 18px 40px rgba(0,0,0,0.14)` | `0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(0,0,0,0.60)` | the only shadow |

- Accent hover: `color-mix(in srgb, var(--accent) 86%, black)`. There is no other hover blue.
- Disabled: fill `#E6E6E8` / `#262626`, text muted, no hover, `cursor: not-allowed`.
- Theme: the first visit follows the system; a choice is saved in `localStorage` and applied before
  first paint. `color-scheme` is set per theme on the root.

## Type

Bricolage Grotesque (English, opsz 12–96, weights 400–700) and Alexandria (Arabic, 400–700). No
other fonts, no monospace. `text-wrap: balance` on h1–h3, `tabular-nums` for numbers. Arabic gets
no letter-spacing.

Desktop / mobile: size, weight, line-height, letter-spacing.

| Role | English | Arabic |
|---|---|---|
| h1 page | 64 / 40, 600, 1.02, -0.04em | 64 / 40, 700, 1.32 / 1.3 |
| h1 hero (Home) | 64 / 38, 600, 1.02, -0.04em | 54 / 32, 700, 1.32 / 1.3 |
| h2 section | 48 / 34, 600, 1.0 / 1.05, -0.03em | 46 / 32, 700, 1.2 / 1.25 |
| h2 panel | 24 / 22, 600, 1.2 | 24 / 22, 700, 1.4 |
| h3 card | 24 / 21, 600, 1.2, -0.02em | 24 / 21, 700, 1.4 |
| h3 row | 22 / 20, 600, 1.25 | 22 / 20, 600, 1.45 |
| h3 label | 18 / 17, 600, 1.4 | 18 / 17, 600, 1.5 |
| Next-case title | 40, 600 | 40, 700, 1.3 |
| Body large | 18 / 16, 400, 1.6 | line-height 1.85 |
| Body | 16 / 15, 400, 1.55 | line-height 1.8 |
| Body small | 14, 1.5 | line-height 1.7 |
| Caption | 14 / 13, 1.5 | line-height 1.8 |
| Diagram label | 13, 500, 1.4 | same |
| Field label | 15, 600, 1.4 | same |
| Facts `dt` | 14, 500, 1.4, muted | 15, 500, 1.5 |
| Large button | 17 / 16, 600, height 56 / 52, radius 14 | same |
| Medium button | 15, 600, height 48, radius 12 | same |
| Language pill | 15 / 14, 500, height 44, fully round | same |
| Nav / inline link / footer | 16 500 / 16 600 / 15 400 | same |

Minimum text size 12px. Running text stays under 75ch with `max-inline-size`: case prose 600px,
rows 560px (Arabic 520), captions 520px (Arabic 480), lede 720px, next-case description 560px.

## Space, radius, layout

- Spacing scale: 2, 4, 6, 8, 10, 12, 14 inside components; 16, 20, 24, 28, 32, 40, 48, 56, 72, 88,
  96, 128 for layout. Nothing else.
- Page rhythm (desktop / mobile): page top 72 / 32, section 128 / 56, band 128 / 56, footer 96 / 48,
  gutter 40 / 16, content max width 1280.
- Radius: controls 12, large button 14, cards and media 20 / 16, panels 28 / 22, phone frame 30,
  pill 999. Nested surfaces with padding up to 24: outer radius = inner radius + padding.
- Borders: 1px `border` for dividers, 1px `strong` for inputs and tiles, 2px `error`, 2px accent for
  a selected tile, 2px nav underline.
- Breakpoints: the header switches to the Menu button below 1024; project cards 3 → 2 → 1; facts
  strip 4 → 2 columns; rows stack below 768.
- **Portrait card (Home, About; Ahmed's option C, 2026-10-11):** phones under 480 crop it as the board does; from
  480 the whole photo shows (`object-contain`, bottom), since a full-width card at a fixed height would cut the face
  off; from 768 (md) it sits beside the text as on desktop. No board covers 480–1023. `e2e/portrait.spec.ts`.
- Logical properties only (`margin-inline-start`, `ps-*`, `end-0`), never left or right.
- Header: 76px sticky on desktop, 60px on mobile. `scroll-padding-top` 92 / 76.

## Motion

- Durations: fast 150ms (hover), base 200ms (toggles, menu, form states), slow 250ms (language
  mirror). Ease-out when something enters, ease-in when it leaves.
- Press: `scale(0.97)` (next-case card 0.98). Links never scale.
- **Hover and press use the `transition-fast` utility** (`app/globals.css`): 150ms ease-out on
  `color, background-color, border-color, text-decoration-color, opacity, scale, translate`.
  Tailwind 4's `scale-*` and `translate-*` set the `scale` and `translate` properties, so a list
  naming `transform` never animates them, and `transition-colors` also animates `outline-color`.
  `tests/motion-guard.test.ts` fails on `transition`, `transition-colors`, `transition-all`,
  `transform` inside `transition-[…]`, and a press scale without `transition-fast`.
- Never `transition: all`. Focus rings never animate.
- **Blocks play in** (Ahmed 2026-10-11: "like TikVideo's home page", the reveal he built there): a
  block rises 24px and fades in over 500ms (`cubic-bezier(0.16, 1, 0.3, 1)`), once; blocks that
  arrive together cascade 120ms apart. `app/reveal.css`, `lib/motion/reveal.ts`,
  `components/motion/RevealOnScroll.tsx`.
  - On load, CSS alone plays the hero (`INTRO` = `intro-children`: its children cascade; the Home
    portrait grows in with `intro-scale`), then every block of the sections (`REVEAL` =
    `reveal-children`: each child, and each row of a child list). Nothing waits for JavaScript, and
    without it nothing is ever hidden.
  - `RevealOnScroll` (a layout effect on every page) then holds back the blocks below the screen
    (`data-reveal="pending"`) and plays each as it comes into view (`play`, then `done`). After an
    ordinary link the whole new page plays in; after the language switch what is on screen stays and
    the hero doesn't replay (`markLocaleSwitch()` and `:root[data-locale-switch]`, which the
    component sets again because React clears `<html>`'s attributes on the new root layout).
  - Variants by `data-reveal-style`: `scale` (grows from 90%: the "Let's talk" bands, the next-case
    card) and `still` for reading text, which never hides or moves (case-study paragraphs, rows and
    number rows; Experience roles). Lines marked `data-line` (diagrams, the timeline rule) draw from
    the start corner when their block plays, inside still blocks too; arrowheads (`data-line="tip"`)
    fade in last.
  - After the first page (`data-browsing` on `<html>`, set from the first link on) everything plays
    quicker: 350ms and a 70ms cascade, so clicking around never drags.
  - Screens only, and nothing moves with reduced motion. Axe runs with reduced motion, so it
    measures every block in place.
- **Theme change:** the page colours swap at once. `applyTheme` puts `theme-switching` on `<html>`
  for two frames and CSS turns every transition off under it, except the theme icons (header button
  and menu row), which turn and cross-fade over 200ms: ease-out arriving, ease-in leaving.
- **Mobile menu:** opens with a 16px slide and fade (200ms ease-out), closes with ease-in; the closing
  panel takes no pointer events. Focus returns to the menu button as soon as it starts closing.
- **Language mirror timings:** moving blocks 250ms ease-out; the old text fades out in 125ms ease-in,
  the new text fades in over 190ms ease-out after 60ms (the board's 125ms frame shows only the new
  text, and on phones the two sit in the same place).
- **Contact form:** each state fades in over 200ms (`animate-state-in`), including the "Sending…"
  label and the form coming back after "Send another message" (never on page load).
- `prefers-reduced-motion: reduce`: no animation; every change is instant (the language switch too).

## Interaction rules

- **Focus ring:** 2px accent ring with a 2px gap in the colour behind the control (`bg` on the page,
  `surface` in panels, cards and the band). Keyboard focus only (`:focus-visible`), shown at once.
  Fields show it on click too.
- **Hover:** only under `@media (hover: hover)`. Targets are at least 44px.
- **Buttons** (`components/ui/Button.tsx`): black (hover → text2), cobalt (hover → accent hover),
  outline (1px `border`; hover → surface fill and `strong` border). Pressed scales to 0.97. Busy:
  spinner, ignores clicks. Sizes: large 52/16 on phones, 56/17 from 1024px; medium 48/15.
- **Text link:** accentText, no underline; on hover an underline 4px below; pressed deepens toward
  the text colour (`--accent-pressed`). The underlined "All work" link turns accent on hover.
- **Nav link:** hover 2px `strong` line; pressed line turns text colour; current page weight 600,
  2px accent line, `aria-current="page"`.
- **Footer link:** muted 400, hover text colour with a 1px underline, pressed 80% opacity, current
  page in text colour. Band contact rows: hover accent, pressed `--accent-pressed`.
- **Project card:** one link per card ("Read the case study" + visually hidden ": Name"), stretched
  over the card with `::after { position: absolute; inset: 0 }`. Hover: image scales 1.02 inside its
  frame and the title underlines, 150ms. Focus: the ring wraps the card, no scale.
- **Skip link:** first tab stop, "Skip to main content" / "تخطَّ إلى المحتوى". Off-screen until
  focused, then top-start with inverse fill and the accent ring. Moves focus to `<main>`.
- **Theme button:** header, plus a labelled "Dark theme" row in the mobile menu. Page colours swap
  at once; the sun and moon cross-fade with a slight turn over 200ms. Name: "Switch to dark theme" /
  "Switch to light theme".
- **Mobile menu:** below 1024. The button is always named "Menu" / "القائمة"; only `aria-expanded`
  changes. Opens with a 16px slide and fade (200ms ease-out); focus moves to the first link and stays
  inside. Esc, the close button or a link closes it (200ms ease-in); focus returns to the button.
  The page behind does not scroll.
- **Language mirror:** pressing العربية / English mirrors the page instead of jumping. The blocks
  that exist in both languages move to their mirrored place (portrait, project images, case hero
  image or drawing, role screenshots); text fades in at its new place; the header does not move;
  the new page opens at the top. 250ms; the browser moves snapshots, so the page never re-lays out.
  A switch that had focus keeps it on the new page (Safari never focuses a clicked link, so a mouse
  click there leaves focus alone). The 404's language link fades the same way. Reduced motion:
  instant.

## Contact form

- One component, used in the Home band and on Contact. Fields: topic (radio tiles: a role, a
  project, something else), name, email, message. All required; "All fields are required." sits
  under the title. "I reply within 24 hours." sits once, next to the button.
- States: **idle** (button enabled, checks run on send) → **sending** (fields locked, spinner,
  "Sending…", status announced to screen readers) → **sent** (focus moves to the "Message sent."
  heading, "Send another message" button) or **error** (a summary naming the field and giving the
  email address; the fix under the field with a 2px error border; focus moves to the field; nothing
  typed is lost). Each state fades in over 200ms.
- Radio tiles: whole tile is the target, arrow keys move the choice, selected = 2px accent border
  and weight 600.
- Sends from the browser to Web3Forms with the public access key and the `botcheck` honeypot.
  Without JavaScript the same `<form action method="post">` posts there directly (hidden
  `access_key`, `subject`, `from_name`). With no key the send ends in the "form not set up" error,
  without a request. Playwright builds with a stand-in key and every test intercepts the post.
- No topic is picked unless `?topic=role|project` says so. Errors are language-neutral codes
  (`lib/contact/schema.ts`); the sentences live in `content/contact`. The copy for errors the boards
  don't show (no topic, name, message, other email problems, several fields, network, no key) was
  drafted in Phase 3 for Ahmed's approval.
- **The topic from the link:** the Contact page reads `?topic=` in the browser. `TopicFromUrl`
  calls `useSearchParams` inside its own `<Suspense fallback={null}>` and renders nothing, so the
  form itself stays in the static HTML (a boundary around the form would replace it with the
  fallback). It dispatches `linked` in a layout effect (before paint). `linked` replaces the topic
  only while the person hasn't picked one and nothing is sending, and changes nothing when the same
  link is read again (effects re-run when Next shows a kept page). Without JavaScript nothing is
  pre-selected.
- On Contact the form has a visible "Send a message" h2 that names it (`title`), and the sent
  heading is an h2; on Home it is named by `label` and the sent heading is an h3.
- Sending: fields `readOnly` with the grey fill, tiles disabled, the button `aria-busy` (not
  `disabled`, so it keeps focus). `aria-busy` is not set on the form: it can silence the status line.

## Pages and shared blocks

- Shared: Header, Footer, SkipLink, the "Let's talk" band (every page except Home and Contact; Home
  has the form version), ProjectCard, Facts strip, divided lists, the contact form.
- Case-study template (all seven): breadcrumb, meta line, h1, lede, hero figure, Facts strip (one
  component, 4 columns, status as a muted second line, inside `<section aria-label>`), then the h2
  sections Summary, Problem, My role, How I built it (architecture figure + decision blocks), What
  was hard (+ ideas I dropped), Result, What I learned, then the next-case card and the band. The
  next-case order loops: Fantasy EG → Educoursez → Vodafone → TikVideo → Cultural Bridge → Qima →
  Lean Academy → Fantasy EG.
- Diagrams are HTML and inline SVG in the boards and become components, never images.

## Experience, Services, About, Contact (Phase 5)

- **Content:** `content/{experience,services,about}/` (`en`, `ar` typed by the English, `index`, and a
  `data.ts` for what is the same in both languages); Contact's page copy is `content/contact` `page`.
  Experience dates are `{year, month}` data formatted by `formatMonthRange` with the copy's month
  names (Western digits in Arabic); a test keeps their years equal to `content/companies`. About's
  availability line is Home's (`hero.availability`). Unknown or optional copy is `null` and left
  out (About's "Outside work").
- **Anchors and ids:** every id comes from `pageId(page, part, locale)`. The EVA Pharma row is
  `experience-eva-pharma-<locale>`, and Services links to it with that hash: a plain `#eva-pharma`
  would exist twice once both languages are mounted. No inline `scroll-margin`; the root
  `scroll-padding-top` already clears the header.
- **Shared pieces:** `DefinitionRows` (a divided `<dl>`, term beside value from md: Skills, About's
  quick facts); `ContactLinks` variants `rows` (label + muted value, Contact on desktop) and
  `divided` (Contact on phones); `LetsTalkBand` ends Experience, Services and About (Services passes
  its own lede).
- **Contact layout:** h1, lede and the "Reach me directly" rows in the start column, the form panel
  in the end column (5fr / 7fr from lg). On phones the form comes first and the direct links follow
  it; the two link groups are responsive variants of one block, and only the desktop one has ids.
- **About:** one DOM order (title, portrait, text); from md a grid puts the portrait beside both,
  as tall as the text. The portrait is the LCP image (`fetchPriority="high"`) in
  `MirrorBlock name="about-portrait"`.
- **Resolved board differences** (listed for Ahmed at the Phase 5 checkpoint): the Arabic follows
  the English (Experience skills row and bullets, About p2/p3 and two How-I-work headings, Services
  items and lede); mobile uses the desktop copy; the "Outside work" panel and the Services steps
  note never ship; one form structure at every width (visible title, panel-size "Reach me
  directly"); Services "Start a project" carries `?topic=project`; spacing and type from the
  Tokens scale (About gap 56, portrait radius 20 / 16, Experience content 56 below the hero in
  both languages).

## Case studies (Phase 4)

- **Content** (`content/cases/`): `data.ts` holds what is the same in both languages (stack, the live
  site link, which fact rows and in what order, the hero and role screenshots, which figure goes
  where in "How I built it"). There is no date field. Each case has `<slug>/{en,ar}.ts` (both typed
  `CaseCopy`), `diagrams.{en,ar}.ts` (its figure labels) and `index.ts`. `shared/` holds the section
  titles and labels. The registry (`content/cases/index.ts`) and the content guards loop over the
  case slugs; `lib/testing/content-guards.ts` holds the checks.
- **Markup:** a `{…}` run is decided by its script. Arabic letters render `<bdi dir="rtl"
  lang="ar">` (Arabic names in English copy), anything else the Latin `<bdi dir="ltr" lang="en">`.
  A run mixing both scripts is an error. Runs of digits and symbols that bidi would reorder (`{−4}`,
  `{C ×3}`, `{/api/v1}`) are marked; plain numbers are not.
- **Template** (`components/case/`): breadcrumb (Work, then the case, `aria-current="page"`),
  status pill (none on the More-projects pages: pills show status only) and the meta line, h1,
  lede, Vodafone's lock notice, the Fantasy EG site button. Hero: a browser frame and a phone on a
  tint stage (percentages of the 1280 x 520 board stage, 358 x 270 on phones), three phones
  (Educoursez), or a drawing. Facts strip: 4 columns from 1280, 2 from 768, rows below; a fact
  with a muted second line is one item with a `note`, a list is one item per entry. The Summary
  panel sits after the facts, and before them on phones (CSS `order`; neither has a link). Then
  Problem, My role (rows, + two screenshots on TikVideo, Cultural Bridge and Qima), How I built
  it, What was hard (+ the dropped-ideas panel), Result (paragraphs, rows, numbers), What I
  learned, the next-case card and the band.
- **How I built it:** the lead-in, the architecture figure, then groups. A group without a heading
  shows its decisions in two columns (Fantasy EG only); a titled group ("Key decisions", "On the
  website") lists them as rows with h4 headings under its h3.
- **Unknown values are left out:** a number Ahmed has not given is a metric with `value: null`;
  "What I learned" is `null` on the four More-projects pages; the boards' dashed placeholder pills
  never ship.
- **Ids** are scoped per case: `pageId(caseScope(slug), part, locale)` gives
  `case-qima-problem-en`.
- **Figures** (`components/diagrams/`): one component per figure id, registered in
  `registry.tsx`, built from `primitives.tsx` (boxes, fan-in bracket, drops, stems, chevrons, flow
  arrow, connector, chips). Desktop layout from 768 (from 1024 for the widest), the mobile board's
  layout below; a structurally different phone layout is a second variant (`data-variant`), never
  with ids. Lines and decoration are `aria-hidden`; labels are text. Hero drawings (Vodafone, Lean
  Academy) render only the drawing; the hero adds the caption.
- **Mirror:** hero screens, hero drawings (`case-<slug>-drawing`, full width, so they cross-fade in
  place) and role screenshots sit in `MirrorBlock name="case-<slug>-…"`; the next-case card's media
  reuses `project-<slug>`.
- **Next-case card:** one link named by its label and title (`aria-labelledby`); the media comes
  first on phones. Hover: surface fill, strong border, title underline; pressed scales to 0.98.
- **Resolved board differences** (listed for Ahmed at the Phase 4 checkpoint): the desktop copy
  where a mobile board differs; Arabic facts use name + muted second line; Vodafone's facts keep
  the English order; stacks are language-neutral; the next-case card reuses the Work card copy;
  section gaps 20 / 14 and 128 above the first section in both languages; hero phones keep their
  390:844 ratio. Where the EN and AR boards say different things, the Arabic follows the English
  (Ahmed, 2026-10-11). A struck-through label still says its state in words (strikethrough isn't
  announced), e.g. «الطلب 1 مُلغى».

## Accessibility and quality bars

- Exactly one h1 per page, no skipped heading levels, a `<main>` landmark, labelled navs.
- WCAG 2.2 AA: text contrast 4.5:1, UI 3:1, targets at least 44px (minimum 24).
- Every image has alt text; decorative images use `alt=""`.
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Lighthouse mobile: Performance ≥ 95; Accessibility, Best
  Practices and SEO 100.
- **Measured (Phase 7):** Accessibility, Best Practices and SEO 100 on every page tested; desktop 100 x 4. Phone
  Performance is 87–90 with Lighthouse's default *simulated* throttling: the hero fades in from opacity 0 (the
  play-in motion), so the largest paint lands 0.25–0.7s after first paint and the simulation then counts every
  script loaded by then (simulated LCP 3.6–4.1s). With the same throttling applied for real it is 99 and LCP 1.8s.
  Ahmed chose to keep the motion (2026-10-11). Don't "fix" this by starting the fade above 0: that only games the
  metric.

## Security headers

- Every response: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY` (for browsers older than `frame-ancestors`), `Permissions-Policy: camera=(),
  microphone=(), geolocation=()`, `Cross-Origin-Opener-Policy: same-origin`. No `X-Powered-By`.
- **Content-Security-Policy** on every page, built by `lib/security/csp.ts`, only in builds (`next dev` needs eval
  and inline styles), and not on `/cv/` or `/_next/static/` (a CSP on the PDF can break the browser's viewer):
  `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self'; font-src 'self';
  connect-src 'self' https://api.web3forms.com; form-action https://api.web3forms.com https://web3forms.com;
  frame-ancestors 'none'; base-uri 'none'; object-src 'none'`.
- `script-src 'unsafe-inline'`: every page is prerendered, so there is no request to make a nonce for, and Next's
  inline scripts (page data, the bootstrap) change with every page and build. Never add a hash or a nonce: either
  switches `'unsafe-inline'` off and stops those scripts. Nothing a visitor types is rendered back; the policy's
  job is to limit origins, framing, `<base>`, plugins and where data can go.
- `style-src 'self'`: no inline styles anywhere. Images render through `components/ui/Img.tsx` (`getImageProps()`
  without its `style`; `text-transparent` hides the alt text while loading), so there are no blur placeholders:
  a screenshot shows the surface colour until it loads. The theme switch and the reveals use classes and data
  attributes, and styles set from script go through the CSSOM, which the CSP allows. Next's own crash page
  (`_global-error`) uses inline styles and would render unstyled; accepted.
- Web3Forms: `connect-src` for the fetch; `form-action` for the no-JS post and the success page that post
  redirects to (`https://web3forms.com/success`).
- No `upgrade-insecure-requests`: Safari upgrades `http://localhost` with it, and Vercel serves HTTPS only.
- Tests: `lib/security/csp.test.ts` (the directives), `tests/security-headers.test.ts` (which paths get which
  headers, through Next's config tester), `e2e/fixtures.ts` (every e2e test fails on a CSP report, in all three
  browsers; specs import `test` from it), and the no-JS post in `e2e/contact-form.spec.ts`. A new external origin
  needs a directive and a test that uses it.
- Vercel preview deployments load their toolbar from `vercel.live`, which the policy blocks: check the production
  alias.
- Icons: `app/icon.png` (64px) and `app/apple-icon.png` (180px), white "AG" in Bricolage 600 on cobalt `#1F3DFF`
  (Ahmed's pick 2026-10-11), made by `../tools/make-icons.mjs site/app "#1F3DFF" "#FFFFFF"`.
- `text-transparent` on images hides the alt text while they load, as next/image's style did; the images
  are local static files, so a broken one is not expected.

## SEO

- Title pattern `<topic> | Ahmed Gabal` (Arabic `… | أحمد جبل`), 50–60 characters; description
  120–160 characters; no dates or agency names.
- hreflang `en`, `ar` and `x-default` (→ `/en/`) in every page's head and in `sitemap.xml`, canonical URLs
  with trailing slashes, Person JSON-LD on Home, `robots.txt`.
- **Link previews:** every page names its language's card, `public/share/ahmed-gabal-{en,ar}.png` (1200 x 630:
  name, role, the Home sentence and the portrait, made by `../tools/make-share-images.mjs` from the Home copy),
  as Open Graph and as an X `summary_large_image` card, alt "name, role". The Person data's image is the stable
  square `public/share/ahmed-gabal.jpg`, never a hashed build file. A test checks the files and their sizes.
