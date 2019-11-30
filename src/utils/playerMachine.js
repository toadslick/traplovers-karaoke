import {
  createMachine,
  state,
  transition,
  immediate,
  guard,
  reduce,
  invoke,
} from 'robot3';

const shiftSong = context => {
  context.currentSong = context.songs.shift() || null;
  return context;
};

const hasCurrentSong = context => !!context.currentSong;

const wait = duration => () =>
  new Promise(resolve => setTimeout(resolve, duration));

export default createMachine('nextSong', {
  playingSong: state(
    transition('pause', 'pausedSong'),
    transition('next', 'nextSong', reduce(shiftSong)),
    transition('done', 'playingSegue')
  ),
  pausedSong: state(
    transition('play', 'playingSong'),
    transition('next', 'nextSong', reduce(shiftSong))
  ),
  playingSegue: state(
    transition('pause', 'pausedSegue'),
    transition('next', 'nextSong', reduce(shiftSong)),
    transition('done', 'playingSong')
  ),
  pausedSegue: state(
    transition('play', 'playingSegue'),
    transition('next', 'nextSong', reduce(shiftSong))
  ),
  nextSong: state(
    immediate('playingSegue', guard(hasCurrentSong)),
    immediate('empty')
  ),
  // While empty, the machine polls the playlist to see if any songs have been added.
  // It does this by waiting 500 milliseconds and then transitioning to the `nextSong` state.
  // If the playlist is still empty at the point, it will return to the `empty` state and wait again.
  empty: invoke(wait(500), transition('done', 'nextSong', reduce(shiftSong))),
});
