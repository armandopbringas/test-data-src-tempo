# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React SSR (Server-Side Rendering) application built with Vite that integrates with Contentful CMS. The project uses TypeScript and implements a custom Express server for handling both development and production environments.

## Architecture

### Entry Points
- `src/entry-server.tsx`: Server-side rendering entry point that fetches data from Contentful
- `src/entry-client.tsx`: Client-side hydration entry point
- `server.js`: Express server that handles both dev and production modes

### Data Flow
- Server-side: Data is fetched from Contentful during SSR via `getHomepage()` in `src/services/contentfulservice.ts`
- Client-side: If no SSR data is available, the app falls back to client-side data fetching
- Contentful integration uses GraphQL API through custom client in `src/services/contentfulClient.ts`

### Key Components
- `App.tsx`: Main app component that handles data fetching and rendering
- `IndexSectionInfo`: Component for displaying content sections with image/text layout
- Contentful service layer provides typed interfaces for CMS data

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build client only
npm run build:client

# Build server only
npm run build:server

# Preview production build
npm run preview
```

## Environment Configuration

The application uses Vite environment variables for Contentful:
- `CONTENTFUL_SPACE_ID`: Contentful space identifier
- `CONTENTFUL_ACCESS_TOKEN`: Contentful access token
- `CONTENTFUL_ENVIRONMENT`: Contentful environment (defaults to 'master')

## GraphQL Integration

The project uses Contentful's GraphQL API with a custom query in `src/graphql/queries/homepage.ts` that fetches:
- Homepage content with rich text and embedded assets
- Animated slides collection
- Journal posts
- Volunteer opportunities
- Case studies and resource links

## TypeScript Configuration

- Main config: `tsconfig.json` with strict mode enabled
- Node config: `tsconfig.node.json` for server-side code
- Uses ES2022 target with bundler module resolution