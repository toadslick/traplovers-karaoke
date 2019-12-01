import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import { useHistory } from 'react-router-dom';

const CreateRoom = ({ firestore }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const redirectToRoom = roomId => {
    history.push(`/room/${roomId}`);
  };

  const sendRoomListing = data => {
    return firestore
      .collection('rooms')
      .add(data)
      .then(function(results) {
        return { roomId: results.id, roomName: data.name };
      })
      .catch(function(error) {
        throw new Error(`Error writing document: ${name}`, error);
      });
  };

  const sendPublicRoomListing = ({ roomId, roomName }) => {
    return firestore
      .collection('publicRoomListings')
      .add({
        roomId,
        roomName,
        sortKey: roomName.toLowerCase(),
      })
      .then(function() {
        return roomId;
      })
      .catch(function(error) {
        throw new Error(`Error writing document: ${roomName}`, error);
      });
  };

  const normalizeInput = () => {
    return { name: name.trim(), password };
  };

  const onFormSubmit = e => {
    e.preventDefault();
    sendRoomListing(normalizeInput())
      .then(sendPublicRoomListing)
      .then(redirectToRoom);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Name:
        <input
          onChange={e => setName(e.target.value)}
          type="text"
          value={name}
        />
      </label>
      <label>
        Password:
        <input
          onChange={e => setPassword(e.target.value)}
          type="text"
          value={password}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default withFirestore(CreateRoom);
