# Short Linker Frontend

A modern, production-ready web interface for the Short Linker service. Built with React, TypeScript, and Vite, following Feature-Sliced Design (FSD) principles.

## Features

- **URL Shortening** - Quickly create short links with a clean interface
- **User Dashboard** - Manage your links, view history, and track performance
- **Authentication** - Secure sign-up and sign-in flows
- **Link Analytics** - Interactive charts showing link usage over time
- **Responsive Design** - Fully optimized for desktop and mobile devices
- **Modern UI** - Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **TanStack Query (React Query)** - Data fetching and state management
- **Zustand** - Lightweight state management
- **React Router 7** - Routing
- **React Hook Form & Zod** - Form handling and validation
- **Recharts** - Data visualization
- **shadcn/ui** - High-quality accessible components

## Architecture

This project follows **Feature-Sliced Design (FSD)**, which organizes code into layers:

- `app/` - Global providers, routing, and styles
- `views/` - Page-level components
- `widgets/` - Complex self-contained UI blocks (e.g., Header, LinksTable)
- `features/` - User-facing actions (e.g., signinByEmail, createLink)
- `entities/` - Business logic and data models (e.g., user, link)
- `shared/` - Reusable UI components, API clients, and utilities

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/short-linker-front.git
cd short-linker-front
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080
```

The `VITE_API_URL` should point to your running backend service.

### 4. Run the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Development

### Linting and Formatting

```bash
# Run ESLint
pnpm lint

# Format code with Prettier
pnpm exec prettier --write .
```

### Build for Production

```bash
pnpm build
```

The production-ready files will be generated in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
```

## License

This project is open source and available under the [MIT License](LICENSE.md).
