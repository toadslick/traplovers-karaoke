import React, { useContext, useState } from 'react';
import FavoriteSongsContext from '../contexts/FavoriteSongs';

const FavoriteToggle = ({ ytId, title }) => {
  const { addSong, removeSong, hasSong } = useContext(FavoriteSongsContext);
  const [isFav, setIsFav] = useState(hasSong(ytId));
  const onClick = () => {
    if (isFav) {
      removeSong(ytId);
    } else {
      addSong(ytId, title);
    }
    setIsFav(!isFav);
  };
  return <button onClick={onClick}>{isFav ? '★' : '☆'}</button>;
};

export default FavoriteToggle;
