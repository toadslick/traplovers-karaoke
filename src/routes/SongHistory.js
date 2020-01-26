import React, { useContext } from 'react';

import SongHistoryContext from '../contexts/SongHistory';
import SongSearchListItem from '../components/SongSearchListItem';
import List from '../components/List';
import t from '../utils/translate';

const SongHistory = () => {
  const { songCount, mapSongs } = useContext(SongHistoryContext);
  return (
    <>
      {songCount() ? (
        <List>
          {mapSongs((ytId, title) => (
            <SongSearchListItem key={ytId} title={title} ytId={ytId} />
          ))}
        </List>
      ) : (
        <p>{t('historyEmpty')}</p>
      )}
    </>
  );
};

export default SongHistory;