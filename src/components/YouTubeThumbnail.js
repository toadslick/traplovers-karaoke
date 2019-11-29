import React from 'react';
import { HD_VIDEO_RATIO } from '../utils/constants';

const YouTubeThumbnail = ({ ytId, width }) => {
  const url = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
  return (
    <img
      alt=""
      aria-hidden="true"
      height={width * HD_VIDEO_RATIO}
      src={url}
      style={{ objectFit: 'cover' }}
      width={width}
    />
  );
};

YouTubeThumbnail.defaultProps = {
  width: 120,
};

export default YouTubeThumbnail;
