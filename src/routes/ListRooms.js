import React from 'react';
import { Link } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import Loader from '../components/Loader';

const ListRooms = () => {
  const renderRoomList = ({ id, roomName, roomId }) => (
    <li key={id}>
      <Link to={`/room/${roomId}`}>{roomName}</Link>
    </li>
  );

  return (
    <>
      <h2>Rooms</h2>
      <FirestoreCollection
        path={'publicRoomListings'}
        render={({ isLoading, data }) => {
          return isLoading ? <Loader /> : <ul>{data.map(renderRoomList)}</ul>;
        }}
        sort="sortKey"
      />
    </>
  );
};

export default ListRooms;
