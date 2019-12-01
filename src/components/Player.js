import React from 'react';
import { useMachine } from 'react-robot';

import playerMachine from '../machines/player';
import Unescape from './Unescape';

const messages = ['pause', 'play', 'done', 'next'];

const Song = ({ singer, title, ytId, id }) => (
  <li key={id}>
    <span>{singer}</span>
    {` - ${ytId} - `}
    <Unescape>{title}</Unescape>
  </li>
);

const Player = ({ songs }) => {
  const [current, send] = useMachine(playerMachine, { songs });
  return (
    <>
      <p>current state: {current.name}</p>
      <p>current song:</p>
      <Song {...current.context.currentSong} />
      <p>queue:</p>
      <ol>{songs.map(Song)}</ol>
      {messages.map(msg => (
        <button key={msg} onClick={() => send(msg)}>
          {msg}
        </button>
      ))}
    </>
  );
};

export default Player;
