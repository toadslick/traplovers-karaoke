import React from 'react';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongList from '../components/SongList';
import { Link } from 'react-router-dom';
import t from '../utils/translate';

const ViewRoom = ({ room: { id, name } }) => (
  <>
    <h2>{name}</h2>
    <SongList roomId={id} />
    <p>
      <Link to={`/room/${id}/play`}>{t('roomTvView')}</Link>
    </p>
    <p>
      <Link to={`/room/${id}/search`}>{t('roomAddSong')}</Link>
    </p>
    <p>
      <Link to={`/room/${id}/favorites`}>{t('roomAddFavorite')}</Link>
    </p>
  </>
);

export default withAuthorizedRoom(ViewRoom);
