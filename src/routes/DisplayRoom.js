import React, { useEffect, useCallback } from 'react';
import { withFirestore } from 'react-firestore';
import { useMachine } from '@xstate/react';
import YouTube from 'react-youtube';

import Unescape from '../components/Unescape';
import ProgressCircle from '../components/ProgressCircle';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import karaokeMachine from '../services/karaoke';

const iframeParams = {
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  modestbranding: 1,
};

const MARQUEE_HEIGHT = 50;

const videoStyles = {
  position: 'fixed',
  top: 0,
  bottom: MARQUEE_HEIGHT,
  left: 0,
  right: 0,
};

const coverStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const screenStyles = {
  position: 'fixed',
  top: 0,
  bottom: MARQUEE_HEIGHT,
  left: 0,
  right: 0,
  background: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
};

const segueSingerStyles = {
  fontWeight: 600,
  fontSize: 80,
  whiteSpace: 'nowrap',
  paddingRight: 50,
  paddingLeft: 50,
  textOverflow: 'ellipsis',
  textAlign: 'center',
};

const segueSongStyles = {
  fontWeight: 400,
  fontSize: 50,
  padding: 50,
  textAlign: 'center',
};

const marqueeStyles = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: MARQUEE_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  background: '#666',
  listStyleType: 'none',
  whiteSpace: 'nowrap',
  fontSize: 30,
  fontWeight: 600,
  color: '#fff',
};

const marqueeItemStyles = {
  marginLeft: 40,
};

const progressStyles = substate => ({
  transition: 'transform 1s, opacity 1s',
  transformOrigin: '50% 50%',
  transform: `scale(${substate === 'buffering' ? 1.5 : 1})`,
  opacity: substate === 'buffering' ? 0 : 1,
});

const DisplayRoom = ({ firestore, room: { id: roomId } }) => {
  const [current, send, service] = useMachine(
    karaokeMachine(firestore, roomId)
  );

  const {
    value: state,
    context: { currentSong, songs, segueProgress },
  } = current;

  const submachine = service.children.get(state);
  const substate = submachine && submachine.state.value;

  const onKeyDown = useCallback(
    ({ key }) => {
      if (key === ' ') {
        if (substate === 'playing') {
          send('PAUSE');
        } else if (substate === 'paused') {
          send('PLAY');
        }
      } else if (key === 'ArrowRight') {
        send('NEXT_SONG');
      }
    },
    [send, substate]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  // When the component is de-rendered, send the 'DONE' event to the machine.
  // This event should cause the machine to unsubscribe from any listeners.
  useEffect(() => {
    return () => {
      send('DONE');
    };
  }, [send]);

  return (
    <>
      <div style={videoStyles}>
        <YouTube
          className="youtube"
          containerClassName="youtube"
          onReady={({ target }) => send({ type: 'READY', player: target })}
          opts={iframeParams}
        />
      </div>

      <ol style={marqueeStyles}>
        {songs.map(({ id, singer }, index) => (
          <li key={id} style={marqueeItemStyles}>
            {index === 0 ? 'Next' : index}: {singer}
          </li>
        ))}
      </ol>

      {(state === 'segue' || substate === 'buffering') && (
        <div style={screenStyles}>
          <div style={segueSingerStyles}>{currentSong.singer}</div>
          <div style={segueSongStyles}>
            <Unescape>{currentSong.title}</Unescape>
          </div>
          <div style={progressStyles(substate)}>
            <ProgressCircle percent={segueProgress} />
          </div>
        </div>
      )}

      {state === 'empty' && (
        <div style={screenStyles}>
          <div style={segueSongStyles}>No Songs</div>
        </div>
      )}

      {state === 'loading' && (
        <div style={screenStyles}>
          <div style={segueSongStyles}>Loading</div>
        </div>
      )}

      <div
        onClick={() => {}}
        onKeyDown={() => {}}
        role="presentation"
        style={coverStyles}
      />
    </>
  );
};

export default withFirestore(withAuthorizedRoom(DisplayRoom));
