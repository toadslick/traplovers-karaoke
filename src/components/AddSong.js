import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import firebase from '@firebase/app';

const AddSong = ({ firestore, roomId }) => {
  const [songId, setSongId] = useState('');

  const addSong = e => {
    e.preventDefault();
    const room = firestore.collection('rooms').doc(roomId);
    room.update({
      songs: firebase.firestore.FieldValue.arrayUnion(songId),
    });
  };

  return (
    <form onChange={e => setSongId(e.target.value)} onSubmit={addSong}>
      <label>
        Video ID: <input type="text" />
      </label>
      <input type="submit" value="Add Song" />
    </form>
  );
};

export default withFirestore(AddSong);
