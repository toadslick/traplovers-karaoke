import { createContext } from 'react';

const KEY = 'favoriteSongs';
// When the page first loads, fetch the existing favorites from localStorage.
// As long as the object is saved each time a song is added or removed,
// the objects will remain in sync.
const songs = JSON.parse(localStorage.getItem(KEY)) || {};

const saveSongs = obj => localStorage.setItem(KEY, JSON.stringify(obj));

// Add a song to the user's favorites.
const addSong = (ytId, title) => {
  songs[ytId] = title;
  saveSongs(songs);
};

// Remove a song from the user's favorites.
const removeSong = ytId => {
  delete songs[ytId];
  saveSongs(songs);
};

// Return true if a song is in the user's favorites.
const hasSong = ytId => {
  return !!songs[ytId];
};

// Return the user's total number of favorites.
const songCount = () => Object.keys(songs).length;

// Map through each song. Used to render a list of favorites, for example.
const mapSongs = fn =>
  Object.keys(songs).map((ytId, index) => fn(ytId, songs[ytId], index));

// As a safety measure, the entire `songs` object is NEVER exposed outside of this file.
// This prevents the object from accidentally getting mutated.
const FavoriteSongs = createContext({
  addSong,
  removeSong,
  hasSong,
  mapSongs,
  songCount,
});

export default FavoriteSongs;
