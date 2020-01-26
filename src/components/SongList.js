import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loader from './Loader';
import SongListItem from './SongListItem';
import withAuthorizedRoom from './withAuthorizedRoom';
import List from './List';
import t from '../utils/translate';

const SongList = ({ roomId }) => {
  return (
    <FirestoreCollection
      path={`rooms/${roomId}/songs`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : data.length ? (
          <List>
            {data.map((props, index) => (
              <SongListItem {...props} index={index} key={`${index}-${props.id}`} />
            ))}
          </List>
        ) : (
          <p>{t('songsEmptySet')}</p>
        );
      }}
      sort="created"
    />
  );
};
export default withAuthorizedRoom(SongList);
