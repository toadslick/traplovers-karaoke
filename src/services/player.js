const STATES = {
  [-1]: 'PLAYER_LOADING',
  0: 'PLAYER_ENDED',
  1: 'PLAYER_PLAYING',
  2: 'PLAYER_PAUSED',
  3: 'PLAYER_BUFFERING',
  5: 'PLAYER_CUED',
};

// This service does nothing until it recieves a READY event with
// a reference to the YouTube player. Then it will listen to events
// from the player and pass those to the parent machine.
export default () => (sendParent, onEvent) => {
  const onStateChange = ({ data }) => sendParent(STATES[data]);
  const onError = () => sendParent('PLAYER_ERROR');

  onEvent(({ type, player }) => {
    if (type === 'READY') {
      player.addEventListener('onStateChange', onStateChange);
      player.addEventListener('onError', onError);
    }
  });
};
