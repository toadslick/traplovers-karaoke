import { useState, useEffect, useCallback } from 'react';

// Informs child components of whether or not the mouse has recently moved.
//
// The bounceDuration represents the amount of time during which
// the mouse must not move before this component informs its children
// that mouseDidMove is false. Whenever the mouse moves, the bounceTimeout
// is cancelled and restarted.
//
// The sleepDuration represents the amount of time that must pass after
// a mouse event before this component will listen for other mouse events.
// This is to increase performance by reducing the number of times that
// this component updates and re-renders its children.

const OnMouseMove = ({ bounceDuration, children, sleepDuration }) => {
  const [didMove, setDidMove] = useState(false);
  const [bounceTimeout, setBounceTimeout] = useState(null);
  const [isSleeping, setIsSleeping] = useState(false);

  const onMove = useCallback(() => {
    // If currently sleeping, ignore this mouse event and do nothing.
    if (isSleeping) {
      return;
    }

    // If not sleeping, sleep after this event.
    setIsSleeping(true);
    setTimeout(() => setIsSleeping(false), sleepDuration);

    // "Bounce" the time until didMove is set to false by cancelling the
    // current bounceTimeout and replacing it with a new timeout.
    setDidMove(true);
    clearTimeout(bounceTimeout);
    setBounceTimeout(setTimeout(() => setDidMove(false), bounceDuration));
  }, [sleepDuration, isSleeping, bounceTimeout, bounceDuration]);

  useEffect(() => {
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [onMove]);

  return children(didMove);
};

OnMouseMove.defaultProps = {
  bounceDuration: 1000,
  sleepDuration: 200,
};

export default OnMouseMove;
