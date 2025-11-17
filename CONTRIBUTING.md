# Contributing to IechoAI

Thank you for considering contributing to IechoAI! We welcome contributions from the community to help make this project better.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Adding a New Tool](#adding-a-new-tool)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Code Contributions](#code-contributions)
- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Style Guidelines](#style-guidelines)

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

The most common contribution is adding a new tool to our catalog. Here's how:

#### 1. Check if the tool already exists

Search `data/tools.json` to ensure the tool isn't already listed.

#### 2. Add the tool to `data/tools.json`

Add your tool entry following this structure:

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
  "isPopular": false,
  "upvotes": 0
}
```

#### Field Guidelines:

- **`id`**: Lowercase, hyphenated slug (e.g., `github-copilot`)
- **`name`**: Official tool name
- **`description`**: 50-150 characters, focus on value proposition
- **`categories`**: Array of 1-3 categories:
  - `chatbots`, `note-taking`, `productivity`, `study`, `coding`, `design`, `no-code`, `browser-extensions`, `books`, `games`, `libraries`, `ai-prompts`, `resources`, `file-sharing`, `learning`
- **`tags`**: 2-5 relevant keywords
- **`url`**: Official website (must be HTTPS)
- **`icon`**: 1-3 letter abbreviation (uppercase)
- **`audience`**: Array with `students` and/or `developers`
- **`tier`**: `free`, `freemium`, or `paid`
- **`isPopular`**: Always `false` for new submissions
- **`upvotes`**: Always `0` for new submissions (real votes come from users)

#### 3. Validate your changes

```bash
pnpm validate-tools
```

This checks that your JSON is valid and follows the schema.

#### 4. Test locally

```bash
# Sync to local database
pnpm db:seed

# Start dev server
pnpm dev

# Verify the tool appears correctly
```

#### 5. Submit a Pull Request

- Create a branch: `git checkout -b add-tool-name`
- Commit: `git commit -m "Add [Tool Name] to catalog"`
- Push: `git push origin add-tool-name`
- Open a PR with:
  - **Title**: `Add [Tool Name]`
  - **Description**: Brief explanation of what the tool does and why it's valuable

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

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 10+
- PostgreSQL 14+
- Redis (optional; set `REDIS_URL` to exercise distributed rate limiting)

### Setup Steps

1. **Fork and clone**

```bash
git clone https://github.com/YOUR-USERNAME/iecho.git
cd iecho
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment**

Create `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/iecho"
REDIS_URL="redis://localhost:6379" # Optional: enables Redis-backed rate limiting
```

4. **Initialize database**

```bash
pnpm db:migrate
pnpm db:seed
```

5. **Start dev server**

```bash
pnpm dev
```

### Project Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Run migrations
pnpm db:seed          # Sync tools.json to DB
pnpm db:studio        # Open Drizzle Studio

# Quality
pnpm typecheck        # Run TypeScript checks
pnpm test:smoke       # Run API tests
pnpm validate-tools   # Validate tools.json
```

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
- Define types explicitly where inference isn't clear
- Avoid `any` - use `unknown` if needed
- Follow existing code patterns

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
