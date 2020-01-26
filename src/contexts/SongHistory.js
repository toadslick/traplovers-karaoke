import { createContext } from 'react';

const KEY = 'songHistory';
// When the page first loads, fetch the existing history from localStorage.
// As long as the object is saved each time a song is added or removed,
// the objects will remain in sync.
const songs = JSON.parse(localStorage.getItem(KEY)) || [];

const saveSongs = obj => localStorage.setItem(KEY, JSON.stringify(obj));

// Add a song to the user's history.
const addSong = (ytId, title) => {
  songs.unshift({ ytId, title });
  saveSongs(songs);
};

// Return the user's total number of history.
const songCount = () => songs.length;

const mapSongs = fn => songs.map(song => fn(song.ytId, song.title));

// As a safety measure, the entire `songs` object is NEVER exposed outside of this file.
// This prevents the object from accidentally getting mutated.
const SongHistory = createContext({
  addSong,
  songCount,
  mapSongs,
});

export default SongHistory;
