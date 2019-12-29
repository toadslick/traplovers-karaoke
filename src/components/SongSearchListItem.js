/** @jsx jsx */

import { useContext } from 'react';
import { withFirestore } from 'react-firestore';
import { css, jsx } from '@emotion/core';
import { useParams, useHistory } from 'react-router-dom';

import RoomAuthContext from '../contexts/RoomAuth';
import Unescape from './Unescape';
import YouTubeThumbnail from './YouTubeThumbnail';
import FavoriteToggle from './FavoriteToggle';
import { commonButtonMixin, listItemMixin } from '../styles';

const liCss = css`
  display: flex;
  flex-direction: row;
  ${listItemMixin('130px')}
`;

const buttonCss = css`
  ${commonButtonMixin}
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
  padding: 10px 0 10px 15px;
  flex: 1 0;
`;

const spanCss = css`
  color: #fff;
  font-size: 13px;
  padding: 0 15px;
  line-height: 1.5;
`;

const SongSearchListItem = ({ firestore, ytId, title }) => {
  const { getRoomAuth } = useContext(RoomAuthContext);
  const { id: roomId } = useParams();
  const history = useHistory();

  const onClick = e => {
    e.preventDefault();
    firestore.collection(`rooms/${roomId}/songs`).add({
      singer: getRoomAuth().name,
      ytId,
      created: Date.now(),
      title,
    });
    history.push(`/room/${roomId}`);
  };

  // YouTube's `hqdefault` images always display in 4:3 aspect ratio with black bars
  // padding the space if the video is in a different aspect ratio.
  // To hide those bars on the top and bottom of images,
  // Here, we force the thumbnails to display in HD aspect ratio (16:9) and use the
  // `object-fit` CSS property to center the image and maintain it's proprotions.
  return (
    <li css={liCss}>
      <button css={buttonCss} onClick={onClick}>
        <YouTubeThumbnail ytId={ytId} />
        <span css={spanCss}>
          <Unescape>{title}</Unescape>
        </span>
      </button>
      <FavoriteToggle title={title} ytId={ytId} />
    </li>
  );
};

export default withFirestore(SongSearchListItem);
