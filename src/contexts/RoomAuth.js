import { createContext } from 'react';

import animals from '../utils/animals';
import t from '../utils/translate';

const randomAnimalName = () => {
  const ani = animals[Math.floor(Math.random() * animals.length)];
  return t('animalName', ani);
};

const setRoomAuth = (name, id, password) => {
  localStorage.setItem('singerName', name.trim() || randomAnimalName());
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
