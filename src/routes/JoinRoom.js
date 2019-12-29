import React, { useState, useContext, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import onInputChange from '../utils/onInputChange';
import t from '../utils/translate';

import Loader from '../components/Loader';
import Title from '../components/Title';
import RoomAuthContext from '../contexts/RoomAuth';

const JoinRoom = () => {
  const { getRoomAuth, setRoomAuth } = useContext(RoomAuthContext);
  // Begin with the user's previously entered name already filled.
  const [name, setName] = useState(getRoomAuth().name || '');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // When the form is submitted, set the authorized room's ID and password.
  // If the user got the password wrong, they'll be redirected to this form again.
  const onSubmit = e => {
    e.preventDefault();
    setRoomAuth(name, id, password);
    history.push(`/room/${id}`);
  };

  // When the form is rendered,
  // If the user has already entered a name, focus the password input first.
  // Otherwise, focus the name input first.
  useEffect(() => {
    const { current: nameInput } = nameInputRef;
    const { current: passwordInput } = passwordInputRef;
    if (nameInput && passwordInput) {
      if (name) {
        nameInput.focus();
      } else {
        passwordInput.focus();
      }
    }
  }, [nameInputRef, passwordInputRef]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FirestoreCollection
      filter={['roomId', '==', id]}
      path={'publicRoomListings'}
      render={({ isLoading, data }) => {
        if (isLoading) {
          return <Loader />;
        }

        const roomName = data[0].roomName;

        return (
          <>
            <Title text={t('joinRoomTitle', roomName)} />
            <form onSubmit={onSubmit}>
              <label>
                <span>{t('joinRoomName')}</span>
                <input
                  onChange={onInputChange(setName)}
                  ref={nameInputRef}
                  type="text"
                  value={name}
                />
              </label>
              <label>
                <span>{t('joinRoomPassword')}</span>
                <input
                  onChange={onInputChange(setPassword)}
                  ref={passwordInputRef}
                  type="text"
                  value={password}
                />
              </label>
              <button>{t('joinRoomButton')}</button>
            </form>
          </>
        );
      }}
    />
  );
};

export default JoinRoom;
