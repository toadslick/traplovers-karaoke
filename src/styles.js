import { css } from '@emotion/core';

export const hoverColor = '#333';
export const linkColor = '#3af';
export const cancelColor = '#999';

export const listBorder = `1px solid #333`;

export const commonButtonMixin = css`
  border: none;
  cursor: pointer;

  &:hover {
    background: ${hoverColor};
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
      border-top: ${listBorder};
    }
  }
`;

export const titleLinkCss = css`
  color: ${linkColor};
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 15px;
  text-align: right;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const titleLinkCancelCss = css`
  ${titleLinkCss}
  color: ${cancelColor};
`;
