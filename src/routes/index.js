import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';
import JoinRoom from './JoinRoom';
import ListRooms from './ListRooms';
import ViewRoom from './ViewRoom';
import AddSong from './AddSong';
import DisplayRoom from './DisplayRoom';

const routes = [
  { Component: ListRooms, path: '/', exact: true },
  { Component: CreateRoom, path: '/room/new', exact: true },
  { Component: JoinRoom, path: '/room/:id/join', exact: true },
  { Component: ViewRoom, path: '/room/:id', exact: true },
  { Component: DisplayRoom, path: '/room/:id/play', exact: true },
  { Component: EditRoom, path: '/room/:id/edit', exact: true },
  { Component: AddSong, path: '/room/:id/song', exact: false },
];

export default routes;
