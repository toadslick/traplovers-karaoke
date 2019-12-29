/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import { commonButtonMixin } from '../styles';
import t from '../utils/translate';

const textCss = css`
  font-size: 14px;
  font-weight: normal;
  text-align: center;
  margin: 0;
  padding: 0;
  display: block;
`;

const linkCss = css`
  ${commonButtonMixin}
  color: #ddd;
  text-decoration: none;
  padding: 7px 15px;
  background: #222;
  display: block;
`;

const Header = () => (
  <header>
    <h1 css={textCss}>
      <Link css={linkCss} to="/">
        {t('appTitle')}
      </Link>
    </h1>
  </header>
);

export default Header;
