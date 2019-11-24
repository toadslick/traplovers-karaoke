import React from 'react';
import { Link } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import Loader from '../components/Loader';
import t from '../utils/translate';

const RoomListItem = ({ id, roomName, roomId }) => (
  <li key={id}>
    <Link to={`/room/${roomId}`}>{roomName}</Link>
  </li>
);

const ListRooms = () => (
  <>
    <h2>Rooms</h2>
    <FirestoreCollection
      path={'publicRoomListings'}
      render={({ isLoading, data }) => {
        return isLoading ? <Loader /> : <ul>{data.map(RoomListItem)}</ul>;
      }}
      sort="sortKey"
    />
    <Link to="/room/new">{t('addRoomLink')}</Link>
  </>
);

export default ListRooms;
