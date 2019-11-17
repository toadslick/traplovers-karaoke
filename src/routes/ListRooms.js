import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-firebase';

const ListRooms = ({ rooms = {} }) => {
  const listItems = Object.keys(rooms).map(id => {
    const { name } = rooms[id];
    return (
      <li key={id}>
        <Link to={`/room/${id}`}>{name}</Link>
      </li>
    );
  });

  return (
    <>
      <h1>List Rooms</h1>
      <ul>{listItems}</ul>
      <p>
        <Link to="/room/new">New Room</Link>
      </p>
    </>
  );
};

const firebaseMap = () => ({
  rooms: 'rooms',
});

export default connect(firebaseMap)(ListRooms);
