## Environment Variables

These must be defined in a `.env.local` file, which should not be committed to the repo.

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_YOUTUBE_API_KEY`

## To Do

- edit or delete room
- send `PLAY`, `PAUSE`, and `NEXT_SONG` commands from other device
  - maybe possible with Firestore collection listener?
- indeterminate loading spinner
- how to organize styles: `styled-components` or `emotion` libraries?
- set secrets via URL query params
- error page (or form) for when secrets not set
- lazy loading of routes via `React.Suspense`
- build and deploy script
- host remotely via `gh-pages` branch
