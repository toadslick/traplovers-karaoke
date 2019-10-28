import CreateRoomRoute from './CreateRoomRoute';
import EditRoomRoute from './EditRoomRoute';
import ListRoomsRoute from './ListRoomsRoute';
import ViewRoomRoute from './ViewRoomRoute';
import JoinRoomRoute from './JoinRoomRoute';
import SearchSongsRoute from './SearchSongsRoute';

const routes = [
  { Component: ListRoomsRoute, path: '/' },
  { Component: CreateRoomRoute, path: '/room/new' },
  { Component: ViewRoomRoute, path: '/room/:id' },
  { Component: JoinRoomRoute, path: '/room/:id/join' },
  { Component: EditRoomRoute, path: '/room/:id/edit' },
  { Component: SearchSongsRoute, path: '/room/:id/songs' },
];

export default routes;
