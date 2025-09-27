# Music Listening Tracker

A React app for tracking and rating music albums you've listened to.

Must be logged into Vercel to view the application [here.](https://music-listening-tracker-34im6284u-metalandcoffees-projects.vercel.app/)

## Features

- **Album List** - View all tracked albums in a clean table
- **Add Albums** - Form to add new albums with artist, release date, genre, and rating
- **Responsive Design** - Works on desktop and mobile
- **Type Safe** - Full TypeScript implementation
- **Modern UI** - Built with Chakra UI v3

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
git clone <your-repo-url>
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

The app uses placeholder API functions in `src/services/albumService.ts`. Replace these with your backend API calls (Supabase, Firebase, etc.).

## License

MIT
