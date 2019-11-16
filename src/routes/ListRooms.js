import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-firebase';

const ListRooms = ({ rooms = [] }) => {
  return (
    <>
      <h1>List Rooms</h1>
      <ul>
        {rooms.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <p>
        <Link to="/room/new">New Room</Link>
      </p>
    </>
  );
};

const firebaseProps = (props, ref) => ({
  rooms: 'rooms',
});

export default connect(firebaseProps)(ListRooms);
