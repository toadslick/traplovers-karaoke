import React from 'react';
import t from '../utils/translate';
import { withFirestore } from 'react-firestore';

const styles = {
  controlPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
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

const RoomControls = ({ firestore, roomId }) => {
  const onClick = command => event => {
    event.preventDefault();
    firestore.collection(`rooms/${roomId}/commands`).add({
      key: command,
      created: Date.now(),
    });
  };

  return (
    <div style={styles.controlPanel}>
      <button
        aria-label={t('play')}
        onClick={onClick('PLAY')}
        style={styles.button}
        type="button"
      >
        <span aria-hidden="true">▶️</span>
      </button>
      <button
        aria-label={t('pause')}
        onClick={onClick('PAUSE')}
        style={styles.button}
        type="button"
      >
        <span aria-hidden="true">⏸</span>
      </button>
      <button
        aria-label={t('nextSong')}
        onClick={onClick('NEXT_SONG')}
        style={styles.button}
        type="button"
      >
        <span aria-hidden="true">⏩</span>
      </button>
    </div>
  );
};

export default withFirestore(RoomControls);
