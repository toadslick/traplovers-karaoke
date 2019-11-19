import React from 'react';
import RoomAuthContext from '../contexts/RoomAuth';

const setRoomAuth = (id, password) => {
  localStorage.setItem('roomID', id);
  localStorage.setItem('roomPassword', password);
};

const getRoomAuth = () => ({
  id: localStorage.getItem('roomID'),
  password: localStorage.getItem('roomPassword'),
});

const RoomAuthProvider = ({ children }) => {
  return (
    <RoomAuthContext.Provider value={{ getRoomAuth, setRoomAuth }}>
      {children}
    </RoomAuthContext.Provider>
  );
};

export default RoomAuthProvider;
