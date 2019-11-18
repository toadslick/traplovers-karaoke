import React from 'react';

const SongList = ({ songs }) => {
  return (
    <>
      <h2>Songs</h2>
      <ul>
        {songs.map(songId => (
          <li key={songId}>
            <a href={`https://www.youtube.com/watch?v=${songId}`}>{songId}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default SongList;
