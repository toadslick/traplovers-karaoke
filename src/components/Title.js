/** @jsx jsx */

import { css, jsx } from '@emotion/core';

const containerCss = css`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const textCss = css`
  font-weight: 600;
  font-size: 20px;
  display: block;
  line-height: 1.3;
  margin: 0;
`;

const Title = ({ text, children }) => (
  <div css={containerCss}>
    <h2 css={textCss}>{text}</h2>
    {children}
  </div>
);

export default Title;
