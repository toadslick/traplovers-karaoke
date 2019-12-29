/** @jsx jsx */

import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { FirestoreCollection } from 'react-firestore';

import Title from '../components/Title';
import Loader from '../components/Loader';
import List from '../components/List';
import t from '../utils/translate';
import { commonButtonMixin, listItemMixin, titleLinkCss } from '../styles';

const listItemCss = listItemMixin('15px');

const linkCss = css`
  ${commonButtonMixin}
  padding: 15px 15px;
  display: block;
  color: #fff;
  text-decoration: none;
`;

const RoomListItem = ({ id, roomName, roomId }) => (
  <li css={listItemCss} key={id}>
    <Link css={linkCss} to={`/room/${roomId}`}>
      {roomName}
    </Link>
  </li>
);

const ListRooms = () => (
  <Fragment>
    <Title text="Rooms">
      <Link css={titleLinkCss} to="/room/new">
        {t('addRoomLink')}
      </Link>
    </Title>
    <FirestoreCollection
      path={'publicRoomListings'}
      render={({ isLoading, data }) => {
        return isLoading ? <Loader /> : <List>{data.map(RoomListItem)}</List>;
      }}
      sort="sortKey"
    />
  </Fragment>
);

export default ListRooms;
