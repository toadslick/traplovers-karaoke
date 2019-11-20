import React from 'react';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongList from '../components/SongList';
import { Link } from 'react-router-dom';
import t from '../utils/translate';

const ViewRoom = ({ room: { id, name, songs } }) => (
  <>
    <h2>{name}</h2>
    {songs && songs.length ? (
      <SongList songs={songs} />
    ) : (
      <p>{t('songsEmptySet')}</p>
    )}
    <Link to={`/room/${id}/search`}>{t('addSong')}</Link>
  </>
);

export default withAuthorizedRoom(ViewRoom);
