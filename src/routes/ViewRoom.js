/** @jsx jsx */

import { Fragment } from 'react';
import { jsx } from '@emotion/core';

import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongList from '../components/SongList';
import Title from '../components/Title';
import RoomControls from '../components/RoomControls';
import { Link } from 'react-router-dom';
import t from '../utils/translate';
import { titleLinkCss } from '../styles';

const ViewRoom = ({ room: { id, name } }) => (
  <Fragment>
    <Title text={name}>
      <Link css={titleLinkCss} to={`/room/${id}/song/search`}>
        {t('roomAddSong')}
      </Link>
    </Title>
    <SongList roomId={id} />
    <RoomControls roomId={id} />
    <p>
      <Link to={`/room/${id}/play`}>{t('roomTvView')}</Link>
      <Link to={`/room/${id}/edit`}>{t('editRoomLink')}</Link>
    </p>
  </Fragment>
);

export default withAuthorizedRoom(ViewRoom);
