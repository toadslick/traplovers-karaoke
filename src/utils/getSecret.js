// A map of localStorage keys to name of their corresponding environment variable.
const secretKeys = {
  firebaseApiKey: 'REACT_APP_FIREBASE_API_KEY',
  firebaseProjectId: 'REACT_APP_FIREBASE_PROJECT_ID',
  youtubeApiKey: 'REACT_APP_YOUTUBE_API_KEY',
};

// Allow secrets to be defined in either `localStorage` or `.env.local`.
// If a secret can't be found, raise an exception.
// This allows the app to run remotely without requiring a backend to host the secrets.
const getSecret = key => {
  const localVar = localStorage.getItem(key);

  const envKey = secretKeys[key];
  const envVar = process.env[envKey];

  if (localVar) {
    return localVar;
  }

  if (envVar) {
    return envVar;
  }

  if (envKey) {
    throw new Error(
      `"${key}" must be defined in localStorage or "${envKey}" must be an environment variable.`
    );
  } else {
    throw new Error(`"${key}" must be defined in localStorage.`);
  }
};

// Immediately attempt to fetch a value for each of the `secretKeys`
// so that exceptions are raised for those values before the React app runs.
Object.keys(secretKeys).map(key => getSecret(key));

export default getSecret;
