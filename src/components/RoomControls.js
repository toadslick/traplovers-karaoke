/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { withFirestore } from 'react-firestore';
import { MdFastForward, MdPause, MdPlayArrow } from 'react-icons/md';

import t from '../utils/translate';
import { commonButtonMixin } from '../styles';

const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 20px;
`;

const buttonCss = css`
  background: #222;
  display: block;
  padding: 10px;
  margin: 0;
  font-size: 40px;
  height: 60px;
  width: 60px;
  line-height: 40px;
  border-radius: 30px;
  ${commonButtonMixin}

  & + & {
    margin-left: 20px;
  }
`;

const RoomControls = ({ firestore, roomId }) => {
  const onClick = command => event => {
    event.preventDefault();
    const collection = firestore.collection(`rooms/${roomId}/commands`);
    collection.get().then(snapshot => {
      snapshot.docs.map(({ id }) => collection.doc(id).delete());
      collection.add({
        key: command,
        created: Date.now(),
      });
    });
  };

  return (
    <div css={containerCss}>
      <button
        css={buttonCss}
        onClick={onClick('PLAY')}
        title={t('play')}
        type="button"
      >
        <span aria-hidden="true">
          <MdPlayArrow color="#fff" />
        </span>
      </button>
      <button
        css={buttonCss}
        onClick={onClick('PAUSE')}
        title={t('pause')}
        type="button"
      >
        <span aria-hidden="true">
          <MdPause color="#fff" />
        </span>
      </button>
      <button
        css={buttonCss}
        onClick={onClick('NEXT_SONG')}
        title={t('nextSong')}
        type="button"
      >
        <span aria-hidden="true">
          <MdFastForward color="#fff" />
        </span>
      </button>
    </div>
  );
};

export default withFirestore(RoomControls);
