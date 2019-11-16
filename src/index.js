import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';

firebase.initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE_URL,
});

ReactDOM.render(<App />, document.getElementById('root'));
