import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import RoomAuthContext from '../contexts/RoomAuth';

const JoinRoom = () => {
  const [password, setPassword] = useState('');
  const { setRoomAuth } = useContext(RoomAuthContext);
  const { id } = useParams();

  const onSubmit = e => {
    e.preventDefault();
    setRoomAuth(id, password);
  };

  const onChange = e => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h2>Join Room</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span>Enter password:</span>
          <input onChange={onChange} type="text" value={password} />
        </label>
        <button>Go</button>
      </form>
    </>
  );
};

export default JoinRoom;
