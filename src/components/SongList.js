import React from 'react';

const SongList = ({ songs }) => {
  return (
    <>
      <h2>Songs</h2>
      <ul>
        {songs.map(({ singer, id, title }) => (
          <li key={id}>
            <span>{singer}</span>
            {' - '}
            <a href={`https://www.youtube.com/watch?v=${id}`}>{title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default SongList;
