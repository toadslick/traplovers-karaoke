import React from 'react';
import { useParams } from 'react-router-dom';
import { FirestoreDocument } from 'react-firestore';
import Loader from '../components/Loader';
import SongList from '../components/SongList';
import AddSong from '../components/AddSong';

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
              <SongList songs={data.songs} />
            ) : (
              <p>no songs :(</p>
            )}
            <AddSong roomId={roomId} />
          </div>
        );
      }}
    />
  );
};

export default ViewRoom;
