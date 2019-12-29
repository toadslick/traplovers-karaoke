/** @jsx jsx */

import { useContext, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import FavoriteSongsContext from '../contexts/FavoriteSongs';
import { commonButtonMixin } from '../styles';

const divCss = css`
  padding: 7px 12px;
  display: flex;
  align-items: center;
`;

const buttonCss = css`
  ${commonButtonMixin}
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  font-size: 24px;
  line-height: 1;
`;

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

  return (
    <div css={divCss}>
      <button css={buttonCss} onClick={onClick}>
        {isFav ? (
          <MdFavorite color="#ff4dc7" />
        ) : (
          <MdFavoriteBorder color="#aaa" />
        )}
      </button>
    </div>
  );
};

export default FavoriteToggle;
