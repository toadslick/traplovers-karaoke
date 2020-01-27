import React, { useState, useContext } from 'react';
import { withFirestore } from 'react-firestore';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import RoomAuthContext from '../contexts/RoomAuth';
import { useHistory } from 'react-router-dom';

const EditRoom = ({ firestore, room }) => {
  // pass in the existing name/pw per roomID?
  // was going to use useParams, but think this is best
  const [roomName, setRoomName] = useState(room.name);
  const [password, setPassword] = useState(room.password);
  const { setRoomAuth } = useContext(RoomAuthContext);
  const history = useHistory();

  const redirectToRoom = roomId => {
    history.push(`/room/${roomId}`);
  };

  const updateRoomListings = data => {
    firestore
      .collection('rooms')
      .doc(room.id)
      .set(data);
    firestore
      .collection('publicRoomListings')
      .where('roomId', '==', room.id)
      .get()
      .then(snapshot => {
        const publicRoomListingId = snapshot.docs[0].id;
        firestore
          .collection('publicRoomListings')
          .doc(publicRoomListingId)
          .set({
            roomId: room.id,
            roomName,
            sortKey: roomName.toLowerCase(),
          });
        setRoomAuth(roomName, room.id, password);
        redirectToRoom(room.id);
      });
  };

  const normalizeInput = () => {
    return { name: roomName.trim(), password };
  };

  const onFormSubmit = e => {
    e.preventDefault();
    // update the current user's login, so they don't have to log in again
    // after changing the password
    updateRoomListings(normalizeInput());
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          New Room Name:
          <input
            onChange={e => setRoomName(e.target.value)}
            type="text"
            value={roomName}
          />
        </label>
        <label>
          New Password:
          <input
            onChange={e => setPassword(e.target.value)}
            type="text"
            value={password}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default withAuthorizedRoom(withFirestore(EditRoom));
