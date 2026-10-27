# Next.js Starter

> **Starting a new Project from this template?** Follow [`docs/new-project.md`](./docs/new-project.md).

A starting point for new web projects: Next.js (App Router), TypeScript and CSS Modules, with three layers of automated tests already wired up. See [`docs/agents/testing.md`](./docs/agents/testing.md) for what each kind of test means.

It's also set up for an agent-driven grilling workflow with [Matt Pocock's skills](https://github.com/mattpocock/skills): see the `## Agent skills` section of [`AGENTS.md`](./AGENTS.md).

| Concern                 | Tooling                                                                     |
| ----------------------- | --------------------------------------------------------------------------- |
| App                     | Next.js 16 (App Router), React 19, TypeScript, CSS Modules                  |
| Runtime                 | Node.js 26 (Active LTS), pinned in `.nvmrc`; npm                            |
| Unit tests              | Vitest + Testing Library in jsdom                                           |
| Visual regression tests | Storybook stories, screenshotted by Playwright in the official Docker image |
| End-to-end tests        | Playwright against the production build                                     |
| Lint / format           | ESLint (`eslint-config-next`) + Prettier                                    |
| CI                      | GitHub Actions (`.github/workflows/ci.yml`)                                 |

## Getting started

```sh
nvm use                                   # Node 26 from .nvmrc
npm install
npx playwright install chromium           # once, for end-to-end tests
npm run dev                               # http://localhost:3000
```

Visual regression tests also need [Docker](https://docs.docker.com/get-docker/) running.

## Scripts

| Script                       | What it does                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`                | Next.js dev server                                                              |
| `npm run build` / `start`    | Production build / serve it                                                     |
| `npm run lint`               | ESLint                                                                          |
| `npm run format`             | Prettier (write); `format:check` only checks                                    |
| `npm run typecheck`          | Generates Next.js route types, then `tsc --noEmit`                              |
| `npm run test:unit`          | Vitest once (`test:unit:watch` for watch mode)                                  |
| `npm run storybook`          | Storybook dev server on http://localhost:6006                                   |
| `npm run build-storybook`    | Static Storybook build in `storybook-static/`                                   |
| `npm run test:visual`        | Visual regression tests in Docker, compared with committed baselines            |
| `npm run test:visual:update` | Regenerate the baselines in Docker                                              |
| `npm run test:e2e`           | Builds the app, starts it on port 3100 and runs the Playwright end-to-end tests |

## Project layout

```
src/
  app/                  Next.js App Router (layout, home page)
  components/           Components (Component.tsx, .module.css, .test.tsx, .stories.tsx)
  lib/                  Plain TypeScript utilities (+ *.test.ts)
.storybook/             Storybook config (@storybook/nextjs-vite)
visual/                 Visual regression test + __screenshots__/ baselines
e2e/                    End-to-end tests
docs/agents/            Config the agent skills read (issue tracker, labels, domain docs, testing vocabulary)
docs/new-project.md     One-time checklist for a new Project
scripts/visual-docker.sh
scripts/setup-labels.sh Creates the GitHub issue labels the agent skills use
```

## Unit tests

Unit tests live next to the code as `*.test.ts(x)` under `src/` and run in jsdom with Testing Library and the `jest-dom` matchers (see `vitest.config.mts`, `vitest.setup.ts`).

## Visual regression tests

`visual/stories.visual.ts` reads `storybook-static/index.json` and creates one screenshot test for **every story** — add a story and it's covered automatically. Each story is rendered on its own (`iframe.html?id=…`) at 640×360 in light mode and compared with `visual/__screenshots__/<story-id>.png`. To leave a story out, give it `tags: ["!visual"]`.

Screenshots depend on fonts and the rendering stack, so these tests always run inside `mcr.microsoft.com/playwright:v1.64.1-noble` — locally via `scripts/visual-docker.sh` and in CI as the job container. That way the baselines match on macOS, Linux and CI.

```sh
npm run test:visual           # compare
npm run test:visual:update    # accept the current rendering as the new baselines
```

Commit the updated PNGs together with the change that caused them. When a test fails, the diff images are in `test-results/visual/` and the HTML report is in `playwright-report/visual/`.

Notes:

- The script runs `npm ci` inside the container into a named Docker volume (`nextjs-starter-visual-node-modules`), so the container's Linux binaries never collide with your local `node_modules`. Remove the volume with `docker volume rm nextjs-starter-visual-node-modules` if you ever need a clean slate.
- The Playwright image ships its own Node (24 at the time of writing); it's only used to build Storybook and run Playwright there.
- Extra `docker run` flags (e.g. proxy settings) can be passed with `VISUAL_DOCKER_ARGS`.
- **When upgrading Playwright**, update the version in three places together — `@playwright/test` in `package.json`, `IMAGE` in `scripts/visual-docker.sh`, and the `visual` job image in `ci.yml` — then run `npm run test:visual:update`.

## End-to-end tests

Specs in `e2e/` run against a production build: Playwright's `webServer` runs `npm run build && npm run start` on `127.0.0.1:3100` (override with `E2E_PORT`). Locally, an already-running server on that port is reused.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests, as five parallel jobs:

1. **Lint** — ESLint and Prettier check
2. **Typecheck**
3. **Unit tests**
4. **Visual regression tests** — inside the same Playwright Docker image
5. **End-to-end tests** — installs Chromium, builds and tests the app

Playwright reports are uploaded as artifacts.

## Notes on dependencies

- npm 11's `allowScripts` field in `package.json` approves the install scripts of `esbuild` and `unrs-resolver`. Older npm versions ignore it.
- ESLint 10 is used because ESLint 9 is end-of-life. Some plugins bundled by `eslint-config-next` haven't widened their peer range yet, so `npm install` prints `ERESOLVE overriding peer dependency` warnings; linting works normally.
- `next dev` maintains the block between the `nextjs-agent-rules` markers in `AGENTS.md` and re-adds it if removed; commit it as is. Text outside the markers (the `## Agent skills` section) is left alone.
