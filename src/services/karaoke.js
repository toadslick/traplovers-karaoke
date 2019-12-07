import { Machine, assign, forwardTo } from 'xstate';

import segueMachine from './segue';
import videoMachine from './video';
import songsService from './songs';
import playerService from './player';

const CONFIG = {
  id: 'karaoke',
  initial: 'loading',
  context: {
    songs: [], // The queue of songs waiting to be played.
    currentSong: null, // The current songs being played.
    player: null, // The YouTube iframe player.
    segueProgress: 0, // How complete the current segue is, from 0 to 1.
  },
  states: {
    // The machine begins in the "loading" state until the YouTube player has
    // downloaded and is ready to play a video. When the player is ready, it
    // should sent a READY event to this machine with a reference to the player.
    loading: {
      on: {
        READY: {
          actions: [
            // After receiving the player reference from the event,
            // save it to the context so that it can be passed to other machines.
            assign({ player: (_, { player }) => player }),
            // Forward this event to the player service so that it can send
            // events to this machine whenever the player state changes.
            forwardTo('player'),
          ],
          target: 'next',
        },
      },
    },

    // The "segue" state represents a pause between videos.
    // This pause can be used to display information about the next song,
    // such as who as singing it. The segue is its own machine.
    segue: {
      invoke: {
        src: 'segue',
        // When the segue completes, begin playing the video.
        onDone: {
          target: 'video',
        },
      },
      on: {
        // While in the "segue" state, PLAY and PAUSE events are sent to the segue.
        PAUSE: {
          actions: forwardTo('segue'),
        },
        PLAY: {
          actions: forwardTo('segue'),
        },
        // Allow skipping to the next song in the queue.
        NEXT_SONG: {
          target: 'next',
        },
        // The segue machine sends SEGUE_PROGRESS events to this parent machine,
        // with a percent of how much time remains in the segue.
        // This is because the useMachine() hook will only re-render
        // when events are sent to this machine, and we want the component to
        // re-render to update the progress meter of time remaining.
        SEGUE_PROGRESS: {
          actions: assign({ segueProgress: (_, { percent }) => percent }),
        },
      },
    },

    // The "video" state represents the actively playing or paused video,
    // and is a separate machine.
    video: {
      invoke: {
        src: 'video',
        data: {
          player: ({ player }) => player,
        },
      },
      on: {
        // Allow skipping to the next song in the queue.
        NEXT_SONG: {
          target: 'next',
        },
        // While in the "video" state, PLAY and PAUSE events are sent to the segue.
        PAUSE: {
          actions: forwardTo('video'),
        },
        PLAY: {
          actions: forwardTo('video'),
        },
        // When the player indicates that the current video has finished,
        // exit this state and begin the segue of the next video.
        PLAYER_ENDED: {
          target: 'next',
        },
        // If the player encounters an error,
        // immediately begin the segue of the next video.
        PLAYER_ERROR: {
          target: 'next',
        },
        // Forward YouTube playing and paused events to the video machine
        // so that it can update its state.
        PLAYER_PLAYING: {
          actions: forwardTo('video'),
        },
        PLAYER_PAUSED: {
          actions: forwardTo('video'),
        },
        PLAYER_BUFFERING: {
          actions: forwardTo('video'),
        },
      },
    },

    // The "next" state immediate resolves to the "segue" state if there are
    // any songs left in the queue, or the "empty" state if no songs remain.
    next: {
      entry: 'shiftSong',
      on: {
        '': [
          {
            target: 'segue',
            cond: ({ currentSong }) => !!currentSong,
            // As soon as the segue begins, the next video is loaded into the player.
            actions: 'cueVideo',
          },
          {
            target: 'empty',
            actions: 'clearVideo',
          },
        ],
      },
    },

    // Tne "empty" state represents an empty playlist with zero songs.
    // Rather than remain permanently in this state, the machine transitions
    // to the "next" state after one second to check if any songs were added.
    // If there are still no songs, the machine will return to this "empty" state.
    empty: {
      after: {
        1000: {
          target: 'next',
        },
      },
    },
  },

  invoke: [
    // This service listens to Firebase for songs added to this room.
    // When songs are added or removed, this service sends the UPDATE_SONGS event
    // to instruct this machine to update its songs list.
    {
      src: 'songs',
    },

    // This service represents the YouTube iframe player.
    // It sends events to this machine whenevr the player's state changes.
    {
      src: 'player',
    },
  ],

  on: {
    // When songs are added or removed from Firebase, the songs service will
    //send the UPDATE_SONGS event. Store the new list of songs in the context.
    UPDATE_SONGS: {
      actions: assign({ songs: (_, { songs }) => songs }),
    },
  },
};

const playerMachine = (firestore, roomId) => {
  const collection = firestore.collection(`rooms/${roomId}/songs`);
  const query = collection.orderBy('created');

  return Machine(CONFIG, {
    actions: {
      // Takes the first song in the queue and sets it to the current song.
      // Then update Firebase with the current song deleted from the queue.
      shiftSong: assign({
        currentSong: ({ songs }) => {
          const nextSong = songs.shift();
          if (nextSong && nextSong.id) {
            collection.doc(nextSong.id).delete();
          }
          return nextSong;
        },
      }),

      // Load the current song into the YouTube player.
      cueVideo: ({ player, currentSong }) => {
        player.cueVideoById(currentSong.ytId);
      },

      // If the queue is empty, clear the current video by
      // attempting to load a video with a blank ID.
      clearVideo: ({ player }) => {
        if (player.getVideoData().title !== '') {
          player.cueVideoById('');
        }
      },
    },

    services: {
      segue: segueMachine,
      video: videoMachine,
      songs: songsService(query),
      player: playerService,
    },
  });
};

export default playerMachine;
