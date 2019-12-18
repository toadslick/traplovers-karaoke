const SECRETS_CONFIG = [
  {
    localStorageKey: 'firebaseApiKey',
    envKey: 'REACT_APP_FIREBASE_API_KEY',
    queryParamKey: 'a',
  },
  {
    localStorageKey: 'firebaseProjectId',
    envKey: 'REACT_APP_FIREBASE_PROJECT_ID',
    queryParamKey: 'b',
  },
  {
    localStorageKey: 'youtubeApiKey',
    envKey: 'REACT_APP_YOUTUBE_API_KEY',
    queryParamKey: 'c',
  },
];

const configByLocalStorageKey = {};
const queryParams = new URLSearchParams(window.location.search);

// Allow secrets to be defined in either `localStorage` or `.env.local`.
// If a secret can't be found, raise an exception.
// This allows the app to run remotely without requiring a backend to host the secrets.
const getSecret = localStorageKey => {
  const config = configByLocalStorageKey[localStorageKey];

  if (!config) {
    throw new Error(
      `"${localStorageKey}" is not defined in the SECRETS_CONFIG.`
    );
  }

  const { envKey, queryParamKey } = config;
  const localVar = localStorage.getItem(localStorageKey);
  const envVar = process.env[envKey];

  if (localVar) {
    return localVar;
  }

  if (envVar) {
    return envVar;
  }

  throw new Error(
    `"${localStorageKey}" must be defined in localStorage, "${queryParamKey}" must be defined in the query string, or "${envKey}" must be defined as an environment variable.`
  );
};

SECRETS_CONFIG.forEach(config => {
  const { localStorageKey, queryParamKey } = config;

  // When the app first loads, save any secrets to localStorage
  // that are defined in query params.
  const param = queryParams.get(queryParamKey);
  if (param) {
    localStorage.setItem(localStorageKey, param);
  }

  // Create a dictionary of secrets by their localStorage key,
  // which is how they will be referenced in the rest of the app.
  configByLocalStorageKey[localStorageKey] = config;
});

export default getSecret;
