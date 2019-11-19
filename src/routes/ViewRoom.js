import React from 'react';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongList from '../components/SongList';
import AddSong from '../components/AddSong';

const ViewRoom = ({ room: { id, name, songs } }) => (
  <>
    <h2>{name}</h2>
    {songs && songs.length ? <SongList songs={songs} /> : <p>no songs :(</p>}
    <AddSong roomId={id} />
  </>
);

export default withAuthorizedRoom(ViewRoom);
