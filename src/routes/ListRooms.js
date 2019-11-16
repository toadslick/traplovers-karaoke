import React from 'react';
import { Link } from 'react-router-dom';

const ListRooms = () => {
  return (
    <>
      <h1>TODO: List Rooms</h1>
      <p>
        <Link to="/room/new">New Room</Link>
      </p>
    </>
  );
};

export default ListRooms;
