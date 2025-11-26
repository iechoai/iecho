# Contributing to IechoAI

Thank you for considering contributing to IechoAI! We welcome contributions from the community to help make this project better.

---

## 📋 Table of Contents

- [Contributing to IechoAI](#contributing-to-iechoai)
  - [📋 Table of Contents](#-table-of-contents)
  - [⚡ Quick Contribution Checklist](#-quick-contribution-checklist)
  - [Code of Conduct](#code-of-conduct)
  - [How Can I Contribute?](#how-can-i-contribute)
    - [Adding a New Tool](#adding-a-new-tool)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Code Contributions](#code-contributions)
    - [Development Setup](#development-setup)
      - [Prerequisites](#prerequisites)
      - [Setup Steps](#setup-steps)
    - [Project Commands](#project-commands)
  - [Pull Request Guidelines](#pull-request-guidelines)
    - [Before Submitting](#before-submitting)
    - [PR Checklist](#pr-checklist)
    - [PR Title Format](#pr-title-format)
    - [Review Process](#review-process)
  - [Style Guidelines](#style-guidelines)
    - [TypeScript](#typescript)
    - [Code Style](#code-style)
    - [Commit Messages](#commit-messages)
    - [File Organization](#file-organization)
  - [Questions?](#questions)

---

## ⚡ Quick Contribution Checklist

1. **Sync main** – `git pull origin main && git checkout -b <feature-branch>`
2. **Create `.env`** – copy `.env.example` and populate **all** required secrets (`DATABASE_URL`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `REDIS_URL`).
3. **Install + migrate** – `pnpm install && pnpm db:migrate && pnpm db:seed`
4. **Do the work** – update code/data, keep changes focused, add tests if needed.
5. **Verify** – run `pnpm typecheck`, `pnpm test:unit`, and any relevant `pnpm test:smoke` cases.
6. **Commit clearly** – follow Conventional Commits, push, and open a PR with screenshots or curl outputs where useful.

---

## Code of Conduct

This project adheres to a **Code of Conduct** that all contributors are expected to follow:

- **Be respectful** - Treat everyone with respect and kindness
- **Be constructive** - Provide helpful feedback and suggestions
- **Be collaborative** - Work together to improve the project
- **Be inclusive** - Welcome diverse perspectives and backgrounds

---

## How Can I Contribute?

### Adding a New Tool

Most contributions start with expanding `data/tools.json`. Follow these five steps to keep things consistent:

1. **Confirm it’s new** – Search the file (or use `pnpm validate-tools` first) to ensure the tool isn’t already in the catalog.
2. **Add the entry** – Append an object that matches the schema below. Stick to lowercase slugs, HTTPS URLs, and concise descriptions.

   ```json
  {
    "id": "tool-slug",
    "name": "Tool Name",
    "description": "Clear, concise description (50-150 characters)",
    "categories": ["category1", "category2"],
    "tags": ["tag1", "tag2", "tag3"],
    "url": "https://tool-website.com",
    "icon": "TN",
    "audience": ["students", "developers"],
    "tier": "free",
    "isPopular": false
  }
  ```

3. **Follow the field guide**
  - `id`: lowercase, hyphenated slug (e.g. `github-copilot`)
  - `description`: 50‑150 chars focused on value, no marketing fluff.
  - `categories`: pick up to 3 from the supported list (`chatbots`, `note-taking`, `productivity`, `study`, `coding`, `design`, `no-code`, `browser-extensions`, `books`, `games`, `libraries`, `ai-prompts`, `resources`, `file-sharing`, `learning`).
  - `tags`: 2‑5 keywords that actually help search.
  - `tier`: one of `free`, `freemium`, `paid`.
  - `isPopular`: always `false` for new entries; real signals come from the community.

4. **Validate + seed**

  ```bash
  pnpm validate-tools   # Formats + validates JSON
  pnpm db:seed          # Copies tools.json into your local Postgres
  pnpm dev              # Check the tool in http://localhost:3000/tools
  ```

5. **Open the PR**
  - Branch: `git checkout -b add-<tool-name>`
  - Commit: `git commit -m "Add <Tool Name>"`
  - Push, open PR, and include 1‑2 sentences explaining why the tool helps students/devs.

---

### Reporting Bugs

Found a bug? Help us fix it!

**Before submitting:**

- Check existing [Issues](https://github.com/iechoai/iecho/issues) to avoid duplicates
- Test on the latest version

**When reporting, include:**

- **Clear title** - Summarize the issue
- **Steps to reproduce** - Detailed steps to trigger the bug
- **Expected vs actual behavior** - What should happen vs what does happen
- **Environment** - Browser, OS, Node version
- **Screenshots/logs** - If applicable

**Example:**

```
Title: Upvote button doesn't respond on mobile Safari

Steps:
1. Open https://iecho.app/tools on iPhone Safari
2. Click upvote button on any tool
3. Nothing happens

Expected: Upvote count increases
Actual: No response, no error

Environment: iOS 17.2, Safari 17
```

---

### Suggesting Enhancements

Have an idea? We'd love to hear it!

**Before suggesting:**

- Check [Issues](https://github.com/iechoai/iecho/issues) and [Discussions](https://github.com/iechoai/iecho/discussions)
- Consider if it fits the project's scope

**When suggesting, include:**

- **Use case** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives** - Other approaches you considered
- **Examples** - Screenshots or mockups if relevant

---

### Code Contributions

Want to contribute code? Awesome!

**Good first issues:**

- Look for issues labeled `good first issue` or `help wanted`
- Fix typos, improve documentation
- Add missing tests

**Before starting:**

- Comment on the issue to let others know you're working on it
- For large changes, open a discussion first

---

### Development Setup

#### Prerequisites

- Node.js 18+
- pnpm 10+
- PostgreSQL 14+ (Neon, Railway, Supabase, or local)
- Redis instance (Upstash or local) – **required** because rate limits run through it
- Resend API key + admin email for contact notifications

#### Setup Steps

1. **Clone**

  ```bash
  git clone https://github.com/YOUR-USERNAME/iecho.git
  cd iecho
  ```

2. **Install deps** – `pnpm install`

3. **Create `.env`** – copy `.env.example` and fill in all secrets (`DATABASE_URL`, `REDIS_URL`, `RESEND_API_KEY`, `ADMIN_EMAIL`). The app fails fast if any are missing because of `src/env.ts`.

4. **Setup the DB** – `pnpm db:migrate && pnpm db:seed`

5. **Run the app** – `pnpm dev` and visit `http://localhost:3000`

### Project Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the dev server on `localhost:3000` |
| `pnpm build` / `pnpm start` | Build + run a production bundle |
| `pnpm db:generate` | Create a new Drizzle migration from schema changes |
| `pnpm db:migrate` | Apply migrations to your local database |
| `pnpm db:seed` | Sync `data/tools.json` into the DB |
| `pnpm db:studio` | Inspect data via Drizzle Studio |
| `pnpm typecheck` | Run TypeScript in `--noEmit` mode |
| `pnpm test:smoke` | Execute the Playwright API smoke suite |
| `pnpm test:unit` | Run Vitest email template snapshots |
| `pnpm validate-tools` | Format + validate `data/tools.json` |

---

## Pull Request Guidelines

### Before Submitting

- ✅ Run `pnpm typecheck` - No TypeScript errors
- ✅ Run `pnpm validate-tools` - If you modified `tools.json`
- ✅ Run `pnpm test:smoke` - All tests pass
- ✅ Test manually - Verify your changes work

### PR Checklist

- [ ] Clear title and description
- [ ] Linked to related issue (if applicable)
- [ ] No merge conflicts
- [ ] Passes all checks
- [ ] Screenshots/demo (for UI changes)

### PR Title Format

- `Add [Tool Name]` - New tool submission
- `Fix: [description]` - Bug fixes
- `Feat: [description]` - New features
- `Docs: [description]` - Documentation updates
- `Refactor: [description]` - Code refactoring

### Review Process

1. **Automated checks** - CI runs tests and type checking
2. **Maintainer review** - We'll review within 2-3 days
3. **Feedback** - We may request changes
4. **Merge** - Once approved, we'll merge your PR!

---

## Style Guidelines

### TypeScript

- Use TypeScript for all code
- Prefer explicit types when inference isn’t obvious (especially in shared libs)
- Avoid `any`; reach for `unknown` or generics instead
- Mirror existing patterns before introducing new abstractions

### Code Style

- Use **2 spaces** for indentation
- Use **double quotes** for strings
- Add **comments** for complex logic
- Keep functions **small and focused**

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add dark mode toggle
fix: resolve upvote race condition
docs: update README with API examples
refactor: simplify rate limiting logic
```

### File Organization

- **Components**: `components/` (React components)
- **API Routes**: `app/api/` (Next.js API routes)
- **Utilities**: `lib/` (Shared utilities)
- **Types**: Define near usage or in `lib/types.ts`

---

## Questions?

- 💬 **Discussions**: [GitHub Discussions](https://github.com/iechoai/iecho/discussions)
- 📧 **Email**: contact@iecho.ai
- 🐛 **Issues**: [GitHub Issues](https://github.com/iechoai/iecho/issues)

---

Thank you for contributing to IechoAI! 🎉
