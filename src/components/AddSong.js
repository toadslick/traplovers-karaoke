import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import firebase from '@firebase/app';

const AddSong = ({ firestore, roomId }) => {
  const [songId, setSongId] = useState('');

  const addSong = e => {
    e.preventDefault();
    const room = firestore.collection('rooms').doc(roomId);
    if (songId.trim()) {
      room.update({
        songs: firebase.firestore.FieldValue.arrayUnion(songId),
      });
    }
    setSongId('');
  };

  return (
    <form onSubmit={addSong}>
      <label>
        Video ID:
        <input
          onChange={e => setSongId(e.target.value)}
          type="text"
          value={songId}
        />
      </label>
      <input type="submit" value="Add Song" />
    </form>
  );
};

export default withFirestore(AddSong);
