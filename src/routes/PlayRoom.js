import React from 'react';

import withAuthorizedRoom from '../components/withAuthorizedRoom';
import Player from '../components/Player';

const PlayRoom = () => {
  return <Player />;
};

export default withAuthorizedRoom(PlayRoom);
