import { Machine, assign, sendParent } from 'xstate';

// This machine represents a timer that can be paused or unpaused.
// When the timer reaches its limit, the machine transitions to its "done" state,
// a final state that indicates the segue has completed.
const CONFIG = {
  id: 'segue',
  initial: 'playing',
  context: {
    limit: 10000, // The duration of the segue (ten seconds)
    elapsed: 0, // The amount of time that has elapsed since the segue began.
    stepDate: null, // The time that the last "tick" was measured.
  },
  states: {
    // The "playing" state represents the unpaused timer.
    // Every 200 milliseconds it updates the time remaining in the segue
    // by returning to the same state, triggering the same actions.
    playing: {
      entry: ['setStepDate', 'updateProgress'],
      exit: 'incrementElapsed',
      after: {
        200: {
          target: 'playing',
        },
      },
      on: {
        // If the time limit has been exceeded, immediately transition
        // to the "done" state instead of waiting for the tick to end.
        '': {
          target: 'done',
          cond: 'limitExceeded',
        },
        // If the segue receives a PAUSE event, it will call the
        // `incrementElapsed` exit action just like if the tick had ended.
        PAUSE: {
          target: 'paused',
        },
      },
    },
    paused: {
      on: {
        PLAY: {
          target: 'playing',
        },
      },
    },
    done: {
      type: 'final',
    },
  },
};

export default Machine(CONFIG, {
  actions: {
    // When beginning the 200ms tick, set the date at which the tick begins,
    // and update the parent machine by sending a SEGUE_PROGRESS event.
    setStepDate: assign({
      stepDate: () => Date.now(),
    }),

    // At the end of the 200ms tick, compare the start date to the current date,
    // and add that much time to the `elapsed` value.
    // Dates are compared instead of assuming that exactly 200ms have passed,
    // because JavaScript timeouts don't fire precisely when intended.
    // This also accounts for when a segue is paused in the middle of a tick.
    incrementElapsed: assign({
      elapsed: ({ stepDate, elapsed }) => elapsed + (Date.now() - stepDate),
    }),

    // Update the parent machine with a SEGUE_PROGRESS event after each tick.
    updateProgress: sendParent(({ limit, elapsed }) => ({
      type: 'SEGUE_PROGRESS',
      percent: elapsed / limit,
    })),
  },

  guards: {
    limitExceeded: ({ limit, elapsed }) => elapsed >= limit,
  },
});
