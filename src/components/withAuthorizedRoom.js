import React, { useContext } from 'react';
import firebase from '@firebase/app';
import { FirestoreCollection } from 'react-firestore';
import { Redirect, useParams } from 'react-router-dom';

import RoomAuthContext from '../contexts/RoomAuth';
import Loader from '../components/Loader';

// Fetches the room based on the current `id` and `password` params.
// If the stored `id` and `password` don't match a room, redirect to the password prompt.
// If they do match, render the given component with a `room` prop that contains the room document.
const withAuthorizedRoom = Component => props => {
  const { getRoomAuth } = useContext(RoomAuthContext);
  const { id: roomId } = useParams();
  const { id: currentId, password: currentPassword } = getRoomAuth();

  const redirect = <Redirect to={`/room/${roomId}/join`} />;

  if (roomId !== currentId) {
    return redirect;
  }

  return (
    <FirestoreCollection
      filter={[
        [firebase.firestore.FieldPath.documentId(), '==', currentId],
        ['password', '==', currentPassword],
      ]}
      path={'rooms'}
      render={({ isLoading, data }) => {
        if (isLoading) {
          return <Loader />;
        }

        if (!data.length) {
          return redirect;
        }

        return <Component room={data[0]} {...props} />;
      }}
    />
  );
};

export default withAuthorizedRoom;
