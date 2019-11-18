import React from 'react';
import { Link } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';
import Loader from '../components/Loader';

const ListRooms = () => {
  return (
    <FirestoreCollection
      path={'rooms'}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : (
          <div>
            <h1>Rooms</h1>
            <ul>
              {data.map(({ name, id }) => (
                <li key={id}>
                  <Link to={`/room/${id}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    />
  );
};

export default ListRooms;
