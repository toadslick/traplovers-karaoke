import { css } from '@emotion/core';

export const hoverButtonColor = '#333';
export const focusButtonColor = '#07c';
export const linkColor = '#0095ff';
export const activeColor = '#3af';
export const cancelColor = '#999';

export const commonButtonMixin = css`
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background: ${hoverButtonColor};
  }

  &:focus {
    background: ${focusButtonColor};
  }

  &:active {
    background: ${activeColor};
  }
`;

export const listItemMixin = (leftOffset = 0, paddingTop = '1px') => css`
  position: relative;

  & + & {
    padding-top: ${paddingTop};

    &:before {
      content: '';
      display: block;
      position: absolute;
      left: ${leftOffset};
      top: 0;
      right: 0;
      border-top: 1px solid ${hoverButtonColor};
    }
  }
`;

export const titleLinkCss = css`
  color: ${linkColor};
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  outline: none;
  margin-left: 15px;
  text-align: right;
  white-space: nowrap;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:active {
    color: ${activeColor};
  }
`;

export const titleLinkCancelCss = css`
  ${titleLinkCss}
  color: ${cancelColor};
`;
