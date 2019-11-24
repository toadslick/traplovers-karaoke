import React from 'react';
import Unescape from './Unescape';
import { FirestoreCollection } from 'react-firestore';
import Loader from './Loader';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import t from '../utils/translate';

const SongList = ({ roomId }) => {
  return (
    <FirestoreCollection
      path={`rooms/${roomId}/songs`}
      render={({ isLoading, data }) => {
        return isLoading ? (
          <Loader />
        ) : (
          <>
            <h2>Songs</h2>
            {data.length ? (
              <ul>
                {data.map(({ singer, title, ytId, id }) => (
                  <li key={id}>
                    <span>{singer}</span>
                    {' - '}
                    <a href={`https://www.youtube.com/watch?v=${ytId}`}>
                      <Unescape>{title}</Unescape>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t('songsEmptySet')}</p>
            )}
          </>
        );
      }}
      sort="created"
    />
  );
};
export default withAuthorizedRoom(SongList);
