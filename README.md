# Din Mægler - Real Estate Platform

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/BcRjmANr)

A modern TypeScript React application for a Danish real estate platform.

##  Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support
- **Styling**: CSS Modules
- **Package Manager**: npm

##  Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components for routing
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── utils/              # Utility functions and helpers
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

##  Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Features

- **Property Listings**: Browse and search real estate properties
- **TypeScript Support**: Full type safety and IntelliSense
- **Responsive Design**: Mobile-first responsive layout
- **Modern Architecture**: Component-based architecture with custom hooks
- **API Integration**: Service layer for external data fetching
- **Developer Experience**: Hot reload, linting, and type checking

## Configuration

The project uses several configuration files:

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build tool configuration
- `eslint.config.js` - ESLint linting rules
- `.editorconfig` - Editor configuration for consistent formatting

## Type Definitions

The project includes comprehensive TypeScript types for:

- Property data structures
- Real estate agent information
- API response formats
- Search filters and pagination

## API Integration

The application is structured to work with a REST API. Update the `VITE_API_URL` environment variable to point to your backend service.

Example API endpoints expected:
- `GET /api/properties` - List properties with optional filters
- `GET /api/properties/:id` - Get single property details
- `GET /api/agents` - List real estate agents
- `GET /api/agents/:id` - Get single agent details

## Styling

The project uses plain CSS with a component-based approach. Each component can have its own CSS file for scoped styling.

## Contributing

1. Follow the existing code style and TypeScript patterns
2. Run linting and type checking before committing
3. Use descriptive commit messages
4. Test your changes thoroughly

## License

Det er et pojekt for RTS CMK.
 
## Backend deployment

This repo includes a minimal auth server in `server/authServer.js`.

- Server env vars:
   - `PORT` or `AUTH_PORT`: port to listen on (most hosts set `PORT`).
   - `CORS_ORIGIN`: allowed origin(s) for CORS. Either a single URL or comma-separated list, or `*`.
   - `STORAGE_DIR`: directory for `usersStore.json` when the host provides a writable disk.

- Frontend env var:
   - `VITE_AUTH_API`: base URL of the deployed auth API, e.g. `https://your-backend.onrender.com`.

### Deploy on Render

1. Commit `render.yaml` and push.
2. Create a new Web Service on Render using this repo (it will read `render.yaml`).
3. Set env vars: `CORS_ORIGIN` to your frontend URL, `STORAGE_DIR` to `/var/data`.
4. After deploy, set `VITE_AUTH_API` in your frontend to the Render URL and redeploy frontend.

### Local run

- Start backend: `npm run auth-server`
- Start frontend: `npm run dev`