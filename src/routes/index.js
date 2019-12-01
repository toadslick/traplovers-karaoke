import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';
import JoinRoom from './JoinRoom';
import ListRooms from './ListRooms';
import ViewRoom from './ViewRoom';
import SearchSongs from './SearchSongs';
import PlayRoom from './PlayRoom';

const routes = [
  { Component: ListRooms, path: '/' },
  { Component: CreateRoom, path: '/room/new' },
  { Component: JoinRoom, path: '/room/:id/join' },
  { Component: ViewRoom, path: '/room/:id' },
  { Component: PlayRoom, path: '/room/:id/play' },
  { Component: EditRoom, path: '/room/:id/edit' },
  { Component: SearchSongs, path: '/room/:id/search' },
];

export default routes;
