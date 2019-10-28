import React from 'react';
import { Link } from 'react-router-dom';

const ListRoomsRoute = () => {
  return (
    <>
      <h1>TODO: List Rooms</h1>
      <p>
        <Link to="/room/new">New Room</Link>
      </p>
    </>
  );
};

export default ListRoomsRoute;
