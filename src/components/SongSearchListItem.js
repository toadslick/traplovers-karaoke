import React from 'react';

const SongSearchListItem = ({ video }) => {
  const {
    id: { videoId: id },
    snippet: {
      title,
      thumbnails: {
        default: { url: thumbUrl, width: thumbWidth, height: thumbHeight },
      },
    },
  } = video;

  const onClick = e => {
    e.preventDefault();
    console.log('ADD VIDEO', id, title);
  };

  return (
    <li>
      <button onClick={onClick}>
        <img
          alt=""
          aria-hidden="true"
          height={thumbHeight}
          src={thumbUrl}
          width={thumbWidth}
        />
        <span>{title}</span>
      </button>
    </li>
  );
};

export default SongSearchListItem;
