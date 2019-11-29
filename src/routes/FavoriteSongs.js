import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoriteSongsContext from '../contexts/FavoriteSongs';
import SongSearchListItem from '../components/SongSearchListItem';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import t from '../utils/translate';

const FavoriteSongs = ({ room: { id: roomId } }) => {
  const { songCount, mapSongs } = useContext(FavoriteSongsContext);
  return (
    <>
      <h2>{t('favoritesTitle')}</h2>
      {songCount() ? (
        <ul>
          {mapSongs((ytId, title) => (
            <SongSearchListItem key={ytId} title={title} ytId={ytId} />
          ))}
        </ul>
      ) : (
        <p>{t('favoritesEmpty')}</p>
      )}
      <p>
        <Link to={`/room/${roomId}`}>{t('cancel')}</Link>
      </p>
    </>
  );
};

export default withAuthorizedRoom(FavoriteSongs);
