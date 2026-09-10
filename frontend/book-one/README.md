# OpenBook: Book One

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.7-149eca?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Package manager](https://img.shields.io/badge/pnpm-recommended-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

Book One is the first OpenBook frontend: a Next.js application for browsing and managing a personal collection of books, chapters, pages, and lines. It provides a dark book workspace with tree navigation, search, bookmarks, data forms, and authenticated user actions. The project also includes a Swagger UI page for inspecting the connected API.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Application routes](#application-routes)
- [Project structure](#project-structure)
- [Development notes](#development-notes)

## Features

| Area | Description |
| --- | --- |
| Book workspace | Displays the user's books and their nested chapter, page, and line data. |
| Tree navigation | Selects book content and opens the relevant information panel. |
| Bookmarks | Loads and marks bookmarked pages or lines in the content tree. |
| Forms | Supports login, book creation, child-resource creation, and data updates. |
| API integration | Uses Axios services with an optional bearer token from the `authToken` cookie. |
| API documentation | Renders the configured OpenAPI definition through Swagger UI. |

## Technology

| Category | Tools |
| --- | --- |
| Framework | Next.js 16 with the App Router and webpack development mode |
| Language | TypeScript 5 with strict checking |
| UI | React 19, Radix UI, Material UI, Tailwind CSS 4, styled-components |
| Forms and validation | React Hook Form and Zod |
| Networking | Axios and axios-mock-adapter |
| Testing | Jest 30, Testing Library, jsdom, and V8 coverage |
| Quality | ESLint 9 and SonarQube Scanner |

## Prerequisites

Install the following before setting up the project:

| Tool | Recommended version | Purpose |
| --- | --- | --- |
| Node.js | 20 or newer | Runs Next.js and the frontend toolchain. |
| pnpm | 9 or newer | Installs dependencies from `pnpm-lock.yaml` and runs scripts. |
| OpenBook API | A running local or remote instance | Supplies books, users, bookmarks, and related data. |

Check the installed tools:

```bash
node --version
pnpm --version
```

## Installation

From the repository root, move into the frontend application:

```bash
cd frontend/book-one
```

Install the locked dependency set:

```bash
pnpm install --frozen-lockfile
```

Create a local environment file. The values below are examples; use the URL and OpenAPI document location for your API instance:

```bash
cat > .env.local <<'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_SWAGGER_URL=http://localhost:8080/v3/api-docs
EOF
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The main workspace is available at [/book-one](http://localhost:3000/book-one), and the API reference is available at [/api-doc](http://localhost:3000/api-doc).

### Alternative package managers

The package manifest also supports the equivalent npm commands:

```bash
npm install
npm run dev
```

Use pnpm for reproducible installs because the repository tracks `pnpm-lock.yaml`.

## Environment variables

| Variable | Required | Used by | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes for API-backed features | Axios client | Base URL for frontend API requests. Because it is public, do not put secrets in this value. |
| `NEXT_SWAGGER_URL` | Yes for `/api-doc` | Swagger UI page | URL of the OpenAPI/Swagger definition rendered by the API documentation page. |

Next.js loads `.env.local` for local development. Do not commit credentials or private tokens to environment files. Authentication is currently read from the browser's `authToken` cookie and sent as a bearer token when present.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server with webpack. |
| `pnpm build` | Creates a production build. |
| `pnpm start` | Serves the existing production build. Run `pnpm build` first. |
| `pnpm lint` | Runs ESLint across the project. |
| `pnpm test` | Runs the Jest test suite. |

Runs SonarQube analysis using `sonar-project.properties`:

```bash
pnpm dlx sonarqube-scanner "-Dsonar.host.url=http://localhost:9000" "-Dsonar.projectKey=openbook_frontend_book-one" "-Dsonar.projectName=openbook_frontend_book-one" "-Dsonar.token=<token>"
```

Useful verification sequence:

```bash
pnpm lint
pnpm test
pnpm build
```

The service test can switch to its Axios mock setup with:

```bash
USE_MOCK=true pnpm test
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/book-one` | Main authenticated book workspace. |
| `/api-doc` | Swagger UI for the API definition configured by `NEXT_SWAGGER_URL`. |
| `/proxy` | GET route that fetches and rewrites remote HTML for the client. |

## Project structure

```text
book-one/
├── app/                    # App Router pages, metadata, and API route handlers
│   ├── api-doc/            # Swagger UI page
│   ├── book-one/           # Main Book One workspace
│   ├── proxy/              # API proxy route
│   ├── layout.tsx          # Root layout, fonts, metadata, and global styles
│   └── page.tsx            # Root page
├── components/
│   ├── forms/              # Login, book, child, and data forms
│   ├── layout/             # Header, cover, content, registry, hub, and sidebar
│   └── ui/                 # Reusable controls, cards, search, and tree components
├── hooks/                  # Reusable client-side hooks
├── lib/
│   ├── api/                # Configured and mocked Axios clients
│   └── *.ts                # Utilities, transformations, and error helpers
├── services/               # Typed API service classes and service mapping
├── styles/                 # Global CSS
├── types/                  # Book, bookmark, tree, user, and user-book types
├── __tests__/              # Jest tests
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── proxy.ts                # Request logging for `/api/*`
├── package.json            # Dependencies and npm scripts
├── pnpm-lock.yaml          # Locked pnpm dependency graph
├── components.json         # UI component generator configuration
└── tsconfig.json           # Strict TypeScript and `@/*` path alias configuration
```

## Development notes

- Use the `@/` path alias for imports from the project root, for example `@/services/book-service`.
- API services live in `services/` and share the Axios client in `lib/api/api-axios.ts`.
- The request proxy currently logs requests matching `/api/:path*` and then forwards them.
- The project uses the Next.js App Router. Add page-level experiences under `app/` and reusable UI under `components/`.

## Further reading

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [pnpm documentation](https://pnpm.io/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
