import { Machine } from 'xstate';

// This machine represents an actively playing or paused video.
const CONFIG = {
  id: 'video',
  initial: 'start',
  context: {
    player: null,
  },
  states: {
    // When the video machine is initialized, begin playing the video.
    start: {
      on: {
        '': {
          target: 'playing',
          actions: 'playVideo',
        },
      },
    },

    // While playing, the video may be paused.
    playing: {
      on: {
        // PAUSE events are manually triggered by our UI.
        PAUSE: {
          actions: 'pauseVideo',
        },
        // PLAYER_PAUSED events are sent by the YouTube player.
        PLAYER_PAUSED: {
          target: 'paused',
        },
      },
    },

    // While paused, the video may be played.
    paused: {
      on: {
        // PLAY events are manually triggered by our UI.
        PLAY: {
          actions: 'playVideo',
        },
        // PLAYER_PLAYING events are sent by the YouTube player.
        PLAYER_PLAYING: {
          target: 'playing',
        },
      },
    },
  },
};

export default Machine(CONFIG, {
  // Send play and pause commands to the player.
  // The player will then send PLAYER_PLAYING or PLAYER_PAUSED events,
  // which are used to update the state of this machine.
  actions: {
    playVideo: ({ player }) => player.playVideo(),
    pauseVideo: ({ player }) => player.pauseVideo(),
  },
});
