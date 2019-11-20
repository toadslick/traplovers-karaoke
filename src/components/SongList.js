import React from 'react';
import Unescape from './Unescape';

const SongList = ({ songs }) => {
  return (
    <ul>
      {songs.map(({ singer, id, title }) => (
        <li key={id}>
          <span>{singer}</span>
          {' - '}
          <a href={`https://www.youtube.com/watch?v=${id}`}>
            <Unescape>{title}</Unescape>
          </a>
        </li>
      ))}
    </ul>
  );
};
export default SongList;
