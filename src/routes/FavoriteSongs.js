import React, { useContext } from 'react';

import FavoriteSongsContext from '../contexts/FavoriteSongs';
import SongSearchListItem from '../components/SongSearchListItem';
import List from '../components/List';
import t from '../utils/translate';

const FavoriteSongs = () => {
  const { songCount, mapSongs } = useContext(FavoriteSongsContext);
  return (
    <>
      {songCount() ? (
        <List>
          {mapSongs((ytId, title) => (
            <SongSearchListItem key={ytId} title={title} ytId={ytId} />
          ))}
        </List>
      ) : (
        <p>{t('favoritesEmpty')}</p>
      )}
    </>
  );
};

export default FavoriteSongs;
