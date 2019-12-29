/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { linkColor, activeColor, focusButtonColor } from '../styles';

const listCss = css`
  display: flex;
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  border: 1px solid ${focusButtonColor};
  margin: 0 15px 20px 15px;
  border-radius: 8px;
  overflow: hidden;
`;

const listItemCss = css`
  display: block;
  flex: 1 0;
`;

const linkCss = css`
  text-decoration: none;
  display: block;
  text-align: center;
  font-weight: 600;
  padding: 7px;
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const inactiveLinkCss = css`
  ${linkCss}
  color: ${linkColor};

  &:active {
    color: ${activeColor}
  }
`;

const currentLinkCss = css`
  ${linkCss}
  color: #000;
  background: ${focusButtonColor};
`;

const Segment = ({ path, label }) => {
  const isMatch = useRouteMatch({ path, exact: true });
  return (
    <Link css={isMatch ? currentLinkCss : inactiveLinkCss} to={path}>
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
