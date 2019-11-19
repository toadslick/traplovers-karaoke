import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';
import JoinRoom from './JoinRoom';
import ListRooms from './ListRooms';
import ViewRoom from './ViewRoom';
import SearchSongs from './SearchSongs';
import Playing from './Playing';

const routes = [
  { Component: ListRooms, path: '/' },
  { Component: CreateRoom, path: '/room/new' },
  { Component: JoinRoom, path: '/room/:id/join' },
  { Component: ViewRoom, path: '/room/:id' },
  { Component: Playing, path: '/room/:id/playing' },
  { Component: EditRoom, path: '/room/:id/edit' },
  { Component: SearchSongs, path: '/room/:id/search' },
];

export default routes;
