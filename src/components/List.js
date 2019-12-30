import styled from '@emotion/styled';
import { listBorder } from '../styles';

export default styled.ul`
  list-style-type: none;
  border-top: ${listBorder};
  border-bottom: ${listBorder};
  margin: 0;
  padding: 0;
  max-width: 100vw;
  overflow: hidden;
`;
