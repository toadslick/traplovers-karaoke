/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { commonButtonMixin } from '../styles';

const mainColor = '#07c';

const listCss = css`
  display: flex;
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  margin: 0 15px 20px 15px;
  border: 1px solid ${mainColor};
  border-radius: 6px;
  overflow: hidden;
`;

const listItemCss = css`
  display: block;
  flex: 1 0;

  & + & {
    border-left: 1px solid ${mainColor};
  }
`;

const linkCss = css`
  text-decoration: none;
  display: block;
  text-align: center;
  font-weight: 600;
  padding: 7px;
  color: #fff;
`;

const notCurrentLinkCss = css`
  ${linkCss}
  ${commonButtonMixin}
`;

const currentLinkCss = css`
  ${linkCss}
  background: ${mainColor};
`;

const Segment = ({ path, label }) => {
  const isMatch = useRouteMatch({ path, exact: true });
  return isMatch ? (
    <span css={currentLinkCss}>{label}</span>
  ) : (
    <Link css={notCurrentLinkCss} to={path}>
      {label}
    </Link>
  );
};

const LinkSegmentControl = ({ routes }) => {
  return (
    <ul css={listCss}>
      {routes.map(props => (
        <li css={listItemCss} key={props.path}>
          <Segment {...props} />
        </li>
      ))}
    </ul>
  );
};

export default LinkSegmentControl;
