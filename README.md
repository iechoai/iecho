# IechoAI - Curated Tools for Students & Developers

**IechoAI** is a modern web application that curates the best AI tools, productivity apps, and development resources tailored for students and developers. Built with Next.js 15, Drizzle ORM, and PostgreSQL.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black)](https://nextjs.org/)

---

## ✨ Features

- 🔍 **Smart Search & Filtering** - Find tools by category, audience, tier, and popularity
- 💾 **Save Your Favorites** - Collections sync across devices via API
- ⬆️ **Community Upvotes** - Rate-limited voting system with fingerprint tracking
- 📱 **Fully Responsive** - Beautiful UI with dark mode support
- ⚡ **High Performance** - Server-side rendering with optimized queries
- 🔒 **Secure & Rate-Limited** - Protected API endpoints with fingerprint-based throttling
- 🎨 **Modern Stack** - Next.js 15, React 19, Tailwind CSS 4, Drizzle ORM

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 10.x (recommended) or npm
- **PostgreSQL** 14+ (Neon, Railway, or local instance)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/iechoai/iecho.git
cd iecho
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Optional: Email notifications (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxx"
ADMIN_EMAIL="admin@example.com"

# Optional: Redis rate limiting (for production)
REDIS_URL="redis://localhost:6379"
```

4. **Run database migrations**

```bash
pnpm db:migrate
```

5. **Seed the database**

```bash
pnpm db:seed
```

6. **Start the development server**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm test:smoke` | Run API smoke tests |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:seed` | Sync tools from JSON |
| `pnpm db:studio` | Open database GUI |

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT © [IechoAI](LICENSE)
