/** @jsx jsx */

import { css, jsx } from '@emotion/core';

import { HD_VIDEO_RATIO } from '../utils/constants';

const imgCss = css`
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 0 1px #ffffff;
`;

const YouTubeThumbnail = ({ ytId, width }) => {
  const url = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
  return (
    <img
      alt=""
      aria-hidden="true"
      css={imgCss}
      height={width * HD_VIDEO_RATIO}
      src={url}
      width={width}
    />
  );
};

YouTubeThumbnail.defaultProps = {
  width: 100,
};

export default YouTubeThumbnail;
