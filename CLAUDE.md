# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Telecom Calculator web application built with React 19, TypeScript, and Vite. It provides calculation tools for telecom engineers including transaction load calculations, concurrent calls capacity, and VoIP subscriber calculations.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 8810)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture

The application follows a standard React SPA architecture:

- **State Management**: Zustand store in `src/store/calculatorStore.ts` manages calculator states and results
- **Routing**: React Router DOM with pages in `src/pages/`
- **Calculations**: Core business logic in `src/utils/calculations.ts`
- **Sharing**: URL-based result sharing via `src/utils/sharing.ts`
- **Analytics**: Google Tag Manager integration through `src/utils/gtm.ts`

### Key Directories

- `src/pages/`: Page components (Landing, Calculators, Help)
- `src/components/`: Reusable UI components (InputField, CheckboxField, Layout)
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions for calculations and sharing

## Environment Configuration

Create a `.env` file from `.env.example`:
```
VITE_GTM_ID=your-google-tag-manager-id
```

## Deployment

The project includes Docker support and GCP deployment scripts:

```bash
# Build Docker image
docker build -t telecom-calc .

# Deploy to Google Cloud Platform
./deploy-gcp.sh
```

## Development Notes

- TypeScript strict mode is enabled - ensure all types are properly defined
- The development server runs on port 8810 (configured in vite.config.ts)
- All calculator logic should be pure functions in `src/utils/calculations.ts`
- State persistence and sharing is handled through URL parameters