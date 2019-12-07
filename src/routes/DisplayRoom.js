import React, { useEffect, useCallback } from 'react';
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

const iframeParams = {
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  modestbranding: 1,
};

const videoStyles = state => {
  switch (state) {
    case 'video':
      return {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      };
    default:
      return {
        position: 'absolute',
        left: -9999,
      };
  }
};

const videoCoverStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
};

const getChildState = (state, service) => {
  const child = service.children.get(state);
  return child && child.state.value;
};

const DisplayRoom = ({ firestore, room: { id: roomId } }) => {
  const [current, send, service] = useMachine(
    karaokeMachine(firestore, roomId)
  );

  const {
    value: state,
    context: { currentSong, songs, segueProgress },
  } = current;

  const togglePlay = useCallback(() => {
    const childState = getChildState(state, service);
    if (childState === 'playing') {
      send('PAUSE');
    } else if (childState === 'paused') {
      send('PLAY');
    }
  }, [send, service, state]);

  const onKeyDown = useCallback(
    ({ key }) => {
      if (key === ' ') {
        togglePlay();
      } else if (key === 'ArrowRight') {
        send('NEXT_SONG');
      }
    },
    [send, togglePlay]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <>
      <h2>State</h2>
      <p>
        {state} > {getChildState(state, service)}
      </p>

      <h2>{state === 'segue' ? `Up Next` : 'Now Playing'}</h2>
      {currentSong ? <Song {...currentSong} /> : <p>no songs</p>}

      {state === 'segue' && <ProgressCircle percent={segueProgress} />}

      <div style={videoStyles(state)}>
        <div
          onClick={togglePlay}
          onKeyDown={() => {}}
          role="button"
          style={videoCoverStyles}
          tabIndex={0}
        />
        <YouTube
          className="youtube"
          containerClassName="youtube"
          onReady={({ target }) => send({ type: 'READY', player: target })}
          opts={iframeParams}
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
