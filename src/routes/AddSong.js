/** @jsx jsx */

import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import SearchSongs from './SearchSongs';
import FavoriteSongs from './FavoriteSongs';
import Title from '../components/Title';
import LinkSegmentControl from '../components/LinkSegmentControl';
import withAuthorizedRoom from '../components/withAuthorizedRoom';
import t from '../utils/translate';
import { titleLinkCancelCss } from '../styles';

const routes = [
  {
    Component: SearchSongs,
    path: `/room/:id/song/search`,
  },
  {
    Component: FavoriteSongs,
    path: `/room/:id/song/faves`,
  },
];

const AddSong = ({ room: { id: roomId } }) => {
  return (
    <Fragment>
      <Title text={t('addSongTitle')}>
        <Link css={titleLinkCancelCss} to={`/room/${roomId}`}>
          {t('cancel')}
        </Link>
      </Title>

      <LinkSegmentControl
        routes={[
          {
            path: `/room/${roomId}/song/search`,
            label: t('searchLink'),
          },
          {
            path: `/room/${roomId}/song/faves`,
            label: t('favoritesLink'),
          },
        ]}
      />

      <Switch>
        {routes.map(({ Component, path }) => (
          <Route exact={true} key={path} path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Fragment>
  );
};

export default withAuthorizedRoom(AddSong);
