import React from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from 'react-firestore';
import Loader from '../components/Loader';

const ViewRoom = () => {
  const roomId = useParams().id;
  return (
    <FirestoreDocument
      path={`rooms/${roomId}`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : (
          <div>
            <h1>{data.name}</h1>

            {data.songs && data.songs.length ? (
              <>
                <h2>songs</h2>
                <ul>
                  {data.songs.map(songId => (
                    <li key={songId}>
                      <a href={`https://www.youtube.com/watch?v=${songId}`}>
                        {songId}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>no songs :(</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ViewRoom;
