## Environment Variables

These must be defined in a `.env.local` file, which should not be committed to the repo.

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_YOUTUBE_API_KEY`

## To Do

- edit or delete room
- send `PLAY`, `PAUSE`, and `NEXT_SONG` commands from other device
  - maybe possible with Firestore collection listener?
- Only one computer can do TV view
- indeterminate loading spinner
- how to organize styles: `styled-components` or `emotion` libraries?
- set secrets via URL query params
- error page (or form) for when secrets not set
- lazy loading of routes via `React.Suspense`
- build and deploy script
- host remotely via `gh-pages` branch
- Your history can be shown based on songs played documents from firebase

Every person in the room will have a play and pause button regardless of the state of the room
