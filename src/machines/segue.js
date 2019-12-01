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

const startTimer = ctx => {
  ctx.stepDate = Date.now();
  ctx.paused = false;
  ctx.elapsed = 0;
  return ctx;
};

const advanceTimer = ctx => {
  const now = Date.now();
  if (!ctx.paused) {
    ctx.elapsed += now - ctx.stepDate;
  }
  ctx.stepDate = now;
  return ctx;
};

const timerExpired = ctx => ctx.elapsed >= ctx.limit;

export default createMachine('start', {
  start: state(
    immediate('interval', reduce(startTimer)) //
  ),
  interval: invoke(
    waitMachine(100), //
    transition('done', 'step')
  ),
  step: state(
    immediate('loop', reduce(advanceTimer)) //
  ),
  loop: state(
    immediate('done', guard(timerExpired)), //
    immediate('interval')
  ),
  done: state(),
});
