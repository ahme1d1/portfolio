@AGENTS.md

# Ahmed Gabal portfolio (site)

- Build rules: `docs/SPEC.md`. The design boards live outside this repo in `../design/boards/`
  (`*.dc.html`) and are the source of truth for layout and copy. Never copy files from `../docs/`
  into this repo: some of them name the agencies.
- Scripts: `npm run dev | build | typecheck | lint | test | test:coverage | test:e2e`.
- Every page is static: `ensureStatic = 'navigation'` on the root layout. Do not read cookies,
  headers or server-side `searchParams`.
- TypeScript stays on 6.0.x until typescript-eslint supports 7.
- Content is typed TS in `content/`; each Arabic module is typed with the English one. Unknown values
  are `null` and are left out of the page.
- Never in copy: em dashes, agency names, dates on the four More-projects case studies, invented
  numbers. Guard tests enforce these.
- TDD for logic and components, 80% coverage, conventional commits.
