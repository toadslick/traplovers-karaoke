/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import Unescape from './Unescape';
import FavoriteToggle from './FavoriteToggle';
import YouTubeThumbnail from './YouTubeThumbnail';
import { listItemMixin } from '../styles';
import t from '../utils/translate';

const liCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 0 10px 15px;
  box-sizing: border-box;
  max-width: 100vw;
  overflow: hidden;
  ${listItemMixin('130px', '11px')}
`;

const numberCss = css`
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  padding: 10px 10px 7px 15px;
  border-bottom-right-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  background: #000;
  line-height: 1;
  color: #bbb;
`;

const textContainerCss = css`
  flex: 1 0;
  color: #fff;
  font-size: 13px;
  padding: 0 0 0 15px;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SongListItem = ({ singer, title, ytId, index }) => (
  <li css={liCss}>
    <span css={numberCss}>{index === 0 ? t('next') : index + 1}</span>
    <YouTubeThumbnail ytId={ytId} />
    <span css={textContainerCss}>
      <Unescape>{title}</Unescape>
      <br />
      <strong>{singer}</strong>
    </span>
    <FavoriteToggle title={title} ytId={ytId} />
  </li>
);

export default SongListItem;
