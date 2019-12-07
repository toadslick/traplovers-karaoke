import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import { FirestoreProvider } from 'react-firestore';

import getSecret from './utils/getSecret';
import App from './App';

import './index.scss';

const config = {
  apiKey: getSecret('firebaseApiKey'),
  projectId: getSecret('firebaseProjectId'),
};

firebase.initializeApp(config);
firebase.auth().signInAnonymously();

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById('root')
);
