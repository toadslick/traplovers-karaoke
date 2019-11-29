import React from 'react';
import Unescape from './Unescape';
import FavoriteToggle from './FavoriteToggle';
import YouTubeThumbnail from './YouTubeThumbnail';

const SongListItem = ({ singer, title, ytId }) => (
  <li>
    <YouTubeThumbnail ytId={ytId} />
    <a href={`https://www.youtube.com/watch?v=${ytId}`}>
      <Unescape>{title}</Unescape>
    </a>
    <FavoriteToggle title={title} ytId={ytId} />
    <br />
    {singer}
  </li>
);

export default SongListItem;
