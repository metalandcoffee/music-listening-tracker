# Music Listening Tracker

A React app for tracking and rating music albums you've listened to.

Must be logged into Vercel to view the application [here.](https://music-listening-tracker.vercel.app/)

## Features

- **Album List** - View all tracked albums in a clean table
- **Add Albums** - Form to add new albums with artist, release date, genre, and rating
- **Album Artwork** - Album Artwork is fetched on add and cached in dB.
- **Responsive Design** - Works on desktop and mobile
- **Type Safe** - Full TypeScript implementation
- **Modern UI** - Built with Chakra UI v3
- **Local State Management** - Album list updates in-memory after create/update/delete operations
- **Change Detection** - Edit operations only trigger API calls when form data differs from original values
- **Reduced Network Requests** - Strategic caching and state updates minimize server communication

## Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Chakra UI v3** - Component library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:metalandcoffee/music-listening-tracker.git
cd music-listening-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typegen      # Generate Chakra UI types
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── services/       # API service functions
├── types/          # TypeScript interfaces
├── utils/          # Utility functions
├── constants/      # App constants
└── theme/          # Chakra UI theme
```

## API Integration

The app integrates with two main services:

**Supabase**

Album storage - All album data stored in Supabase database

**Last.fm API**

Album artwork - Automatically fetches cover art when adding albums

Fallback handling - Graceful degradation when artwork unavailable

## License

MIT
