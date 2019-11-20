import { createContext } from 'react';

const setRoomAuth = (name, id, password) => {
  localStorage.setItem('singerName', name);
  localStorage.setItem('roomID', id);
  localStorage.setItem('roomPassword', password);
};

const getRoomAuth = () => ({
  name: localStorage.getItem('singerName'),
  id: localStorage.getItem('roomID'),
  password: localStorage.getItem('roomPassword'),
});

const RoomAuth = createContext({ getRoomAuth, setRoomAuth });

export default RoomAuth;
