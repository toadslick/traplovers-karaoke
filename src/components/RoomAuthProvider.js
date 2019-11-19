import React from 'react';
import RoomAuthContext from '../contexts/RoomAuth';

const setRoomAuth = (id, password) => {
  localStorage.set('roomID', id);
  localStorage.set('roomPassword', password);
};

const getRoomAuth = () => ({
  id: localStorage.get('roomID'),
  password: localStorage.get('roomPassword'),
});

const RoomAuthProvider = ({ children }) => {
  return (
    <RoomAuthContext.Provider value={{ getRoomAuth, setRoomAuth }}>
      {children}
    </RoomAuthContext.Provider>
  );
};

export default RoomAuthProvider;
