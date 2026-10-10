# Ahmed Gabal, Senior Frontend Engineer

Source of my portfolio site, in English and Arabic (full right-to-left), light and dark.

- Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4
- Every page is prerendered; client JavaScript is limited to the theme toggle, the mobile menu,
  the language transition and the contact form
- Tests: Vitest and React Testing Library, Playwright with axe for accessibility

## Run it

```bash
npm install
npm run dev        # http://localhost:3000/en/
npm test           # unit and component tests
npm run test:e2e   # end-to-end tests against a production build
```

The contact form needs a free Web3Forms access key in `.env.local`:

```bash
NEXT_PUBLIC_WEB3FORMS_KEY=your-key
```
