import React, { useEffect, useCallback } from 'react';
import { withFirestore } from 'react-firestore';
import { useMachine } from '@xstate/react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

import Unescape from '../components/Unescape';
import OnMouseMove from '../components/OnMouseMove';
import ProgressCircle from '../components/ProgressCircle';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import karaokeMachine from '../services/karaoke';
import t from '../utils/translate';

const MARQUEE_HEIGHT = 50;

const styles = {
  video: {
    position: 'fixed',
    top: 0,
    bottom: MARQUEE_HEIGHT,
    left: 0,
    right: 0,
  },
  cover: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  screen: {
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
  },
  segueSinger: {
    fontWeight: 600,
    fontSize: 80,
    whiteSpace: 'nowrap',
    paddingRight: 50,
    paddingLeft: 50,
    textOverflow: 'ellipsis',
    textAlign: 'center',
  },
  segueSong: {
    fontWeight: 400,
    fontSize: 50,
    padding: 50,
    textAlign: 'center',
  },
  marquee: {
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
  },
  marqueeItem: {
    marginLeft: 40,
  },
  progress: substate => ({
    transition: 'transform 1s, opacity 1s',
    transformOrigin: '50% 50%',
    transform: `scale(${substate === 'buffering' ? 1.5 : 1})`,
    opacity: substate === 'buffering' ? 0 : 1,
  }),
  controlPanel: isVisible => ({
    position: 'fixed',
    right: 0,
    top: 0,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  button: {
    border: 'none',
    background: 'transparent',
    padding: 0,
    display: 'block',
    marginTop: 10,
    marginRight: 10,
    fontSize: 60,
    cursor: 'pointer',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    outline: 'none',
  },
};

const iframeParams = {
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  modestbranding: 1,
};

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
      <div style={styles.video}>
        <YouTube
          className="youtube"
          containerClassName="youtube"
          onReady={({ target }) => send({ type: 'READY', player: target })}
          opts={iframeParams}
        />
      </div>

      <ol style={styles.marquee}>
        {songs.map(({ id, singer }, index) => (
          <li key={id} style={styles.marqueeItem}>
            {index === 0 ? 'Next' : index}: {singer}
          </li>
        ))}
      </ol>

      {(state === 'segue' || substate === 'buffering') && (
        <div style={styles.screen}>
          <div style={styles.segueSinger}>{currentSong.singer}</div>
          <div style={styles.segueSong}>
            <Unescape>{currentSong.title}</Unescape>
          </div>
          <div style={styles.progress(substate)}>
            <ProgressCircle percent={segueProgress} />
          </div>
        </div>
      )}

      {state === 'empty' && (
        <div style={styles.screen}>
          <div style={styles.segueSong}>No Songs</div>
        </div>
      )}

      {state === 'loading' && (
        <div style={styles.screen}>
          <div style={styles.segueSong}>Loading</div>
        </div>
      )}

      <div
        onClick={() => {}}
        onKeyDown={() => {}}
        role="presentation"
        style={styles.cover}
      />

      <OnMouseMove bounceDuration={2000}>
        {didMove => (
          <div style={styles.controlPanel(didMove)}>
            <button
              aria-label={t('play')}
              onClick={() => send('PLAY')}
              style={styles.button}
              type="button"
            >
              <span aria-hidden="true">▶️</span>
            </button>
            <button
              aria-label={t('pause')}
              onClick={() => send('PAUSE')}
              style={styles.button}
              type="button"
            >
              <span aria-hidden="true">⏸</span>
            </button>
            <button
              aria-label={t('nextSong')}
              onClick={() => send('NEXT_SONG')}
              style={styles.button}
              type="button"
            >
              <span aria-hidden="true">⏩</span>
            </button>
            <Link
              aria-label={t('exitRoom')}
              style={styles.button}
              title={t('exitRoom')}
              to={`/room/${roomId}`}
            >
              <span aria-hidden="true">⏏️</span>
            </Link>
          </div>
        )}
      </OnMouseMove>
    </>
  );
};

export default withFirestore(withAuthorizedRoom(DisplayRoom));
