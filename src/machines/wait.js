// Returns a function that, when called, returns a promise
// that resolves after the specified number of milliseconds.
//
// This is equivalent to a state machine that will
// end in a `done` state after the specified amount of time.
const waitMachine = duration => () =>
  new Promise(resolve => setTimeout(resolve, duration));

export default waitMachine;
