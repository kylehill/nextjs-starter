# Starting a new Project

One-time checklist for turning a copy of this starter into a new Project. The last step deletes this file.

1. **Create the repo** from the template and clone it:

   ```sh
   gh repo create <name> --template kylehill/nextjs-starter --private --clone
   cd <name>
   ```

2. **Rename** the starter-specific bits to your Project's name:
   - `name` in `package.json`
   - `metadata.title` and `metadata.description` in `src/app/layout.tsx`
   - the heading and lead paragraph in `src/app/page.tsx`
   - the expected title and heading in `e2e/home.spec.ts`

3. **Install**:

   ```sh
   nvm use
   npm install
   npx playwright install chromium
   ```

4. **Create the issue labels** the agent skills use:

   ```sh
   sh scripts/setup-labels.sh
   ```

5. **Tidy up**: rewrite the intro at the top of `README.md` for your Project, delete its "Starting a new Project" line and this file, then commit.

6. **Start designing** with the agent skills:
   - `/grill-with-docs` with your Project idea. It interviews you and creates `CONTEXT.md` (the Project's glossary) and any ADRs in `docs/adr/` as decisions are made.
   - `/to-spec` to publish the result as a spec issue.
   - `/to-tickets` to break the spec into tickets.
   - `/implement` to build them.
