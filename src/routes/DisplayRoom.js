import React from 'react';
import { withFirestore } from 'react-firestore';
import { useMachine } from '@xstate/react';
import YouTube from 'react-youtube';

import Unescape from '../components/Unescape';
import ProgressCircle from '../components/ProgressCircle';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import karaokeMachine from '../services/karaoke';

const Song = ({ singer, ytId, title, id }) => (
  <p key={id}>
    {singer} - {ytId}
    <br />
    <Unescape>{title}</Unescape>
  </p>
);

const DisplayRoom = ({ firestore, room: { id: roomId } }) => {
  const [current, send] = useMachine(karaokeMachine(firestore, roomId));

  const {
    value: state,
    context: { currentSong, songs, segueProgress },
  } = current;

  const videoStyle =
    state === 'video' ? {} : { position: 'absolute', left: -9999 };

  return (
    <>
      <h2>State</h2>
      <p>{state}</p>

      <h2>{state === 'segue' ? `Up Next` : 'Now Playing'}</h2>
      {currentSong ? <Song {...currentSong} /> : <p>no songs</p>}

      {state === 'segue' && <ProgressCircle percent={segueProgress} />}

      <div style={videoStyle}>
        <YouTube
          onReady={({ target }) => send({ type: 'READY', player: target })}
          opts={{
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            modestbranding: 1,
          }}
        />
      </div>

      <h2>Song Queue</h2>
      {songs.map(Song)}

      <fieldset>
        <button onClick={() => send('PLAY')}>Play</button>
        <button onClick={() => send('PAUSE')}>Pause</button>
        <button onClick={() => send('NEXT_SONG')}>Next</button>
      </fieldset>
    </>
  );
};

export default withFirestore(withAuthorizedRoom(DisplayRoom));
