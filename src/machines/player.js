import {
  createMachine,
  state,
  transition,
  immediate,
  guard,
  reduce,
  invoke,
} from 'robot3';

import waitMachine from './wait';
import segueMachine from './segue';

const shiftSong = ctx => {
  ctx.currentSong = ctx.songs.shift();
  return ctx;
};

const hasCurrentSong = ctx => !!ctx.currentSong;

export default createMachine('next', {
  playing: state(
    //
    transition('pause', 'paused'),
    transition('skip', 'next'),
    transition('done', 'segue')
  ),

  paused: state(
    //
    transition('play', 'playing'),
    transition('skip', 'next')
  ),

  segue: invoke(
    //
    segueMachine,
    transition('done', 'playing')
  ),

  next: state(
    // The first item in `songs` is removed from the array and set as `currentSong`.
    // If no songs are left then `currentSong` will be null.
    immediate('startSong', reduce(shiftSong))
  ),

  start: state(
    // If a currentSong is set, being playing it.
    // Otherwise, transition to the empty state.
    immediate('playingSegue', guard(hasCurrentSong)),
    immediate('empty')
  ),

  empty: invoke(
    // While empty, the machine polls the playlist to see if any songs have been added.
    // It does this by waiting 500 milliseconds and then transitioning to the `next` state.
    // If the playlist is still empty at the point, it will return to the `empty` state and wait again.
    waitMachine(500),
    transition('done', 'next')
  ),
});
