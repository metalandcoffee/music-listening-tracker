# Challenge: Build a Music Listening Tracker with Monthly Categorization

## Scenario
You're building a personal music discovery app where users can track albums they've listened to and organize their listening history by month.

## Requirements

### Core Features
- Create a simple form to input music listening data:
  - Band/Artist name
  - Album name  
  - Release date
  - Whether you liked it (thumbs up/down or rating)
- Implement proper form validation and input sanitization to prevent XSS attacks and ensure data integrity
- Implement a data storage system (can use local storage, state, or mock database)
- Display the tracked albums in a table/list format categorized by month
- Group entries by the month of the album's release date (not when added to tracker)
- Include filtering or sorting options (e.g., by liked/disliked, by artist, chronological)
- Add a simple dashboard showing listening statistics (total albums, liked vs disliked ratio, most active month, etc.)

### Bonus Features
- Add the ability to edit or remove entries
- Include album artwork fetching from a music API

## Security & Data Validation
- Sanitize all user inputs to prevent malicious code injection
- Validate date formats and ensure release dates are reasonable (not in the future, not before music existed)
- Trim whitespace and handle edge cases in text inputs
- Implement client-side validation with appropriate error messages

## UI Considerations
- Monthly sections with collapsible/expandable views (organized by release date)
- Visual indicators for liked vs disliked albums
- Clean, music-focused design aesthetic
- Responsive layout for mobile and desktop

## Success Criteria
Your app should allow users to easily track their music listening habits, provide meaningful insights into their musical preferences over time, and maintain secure, clean data handling practices.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
Notes
Supabase - "Postgres Development Platform" BaaS (backend-as-a-service) solution built on top of PostgreSQL.