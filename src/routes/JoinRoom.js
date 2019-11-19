import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import RoomAuthContext from '../contexts/RoomAuth';

const JoinRoom = () => {
  const [password, setPassword] = useState('');
  const { setRoomAuth } = useContext(RoomAuthContext);
  const { id } = useParams();
  const history = useHistory();
  const inputRef = useRef(null);

  // When the form is submitted, set the authorized room's ID and password.
  // If the user got the password wrong, they'll be redirected to this form again.
  const onSubmit = e => {
    e.preventDefault();
    setRoomAuth(id, password);
    history.push(`/room/${id}`);
  };

  const onChange = e => {
    setPassword(e.target.value);
  };

  // Focus the input when the form is rendered.
  useEffect(() => {
    const { current: input } = inputRef;
    if (input) {
      input.focus();
    }
  }, [inputRef]);

  return (
    <>
      <h2>Join Room</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span>Enter password:</span>
          <input
            onChange={onChange}
            ref={inputRef}
            type="text"
            value={password}
          />
        </label>
        <button>Go</button>
      </form>
    </>
  );
};

export default JoinRoom;
