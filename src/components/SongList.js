import React from 'react';
import { FirestoreCollection } from 'react-firestore';
import Loader from './Loader';
import SongListItem from './SongListItem';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import t from '../utils/translate';

const SongList = ({ roomId }) => {
  return (
    <FirestoreCollection
      path={`rooms/${roomId}/songs`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : data.length ? (
          <ul>
            {data.map(props => (
              <SongListItem {...props} key={props.id} />
            ))}
          </ul>
        ) : (
          <p>{t('songsEmptySet')}</p>
        );
      }}
      sort="created"
    />
  );
};
export default withAuthorizedRoom(SongList);
