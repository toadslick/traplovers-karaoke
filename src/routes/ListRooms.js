import React from 'react';
import { Link } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import Loader from '../components/Loader';

const ListRooms = () => {
  return (
    <FirestoreCollection
      path={'publicRoomListings'}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : (
          <div>
            <h1>Rooms</h1>
            <ul>
              {data.map(({ id, roomName, roomId }) => (
                <li key={id}>
                  <Link to={`/room/${roomId}`}>{roomName}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
};

export default ListRooms;
