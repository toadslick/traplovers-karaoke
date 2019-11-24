import React from 'react';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongList from '../components/SongList';
import { Link } from 'react-router-dom';
import t from '../utils/translate';

const ViewRoom = ({ room: { id, name } }) => (
  <>
    <h2>{name}</h2>
    <SongList roomId={id} />
    <Link to={`/room/${id}/search`}>{t('addSong')}</Link>
  </>
);

export default withAuthorizedRoom(ViewRoom);
