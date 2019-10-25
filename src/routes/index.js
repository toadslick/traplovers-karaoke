import RoomCreateRoute from './RoomCreateRoute';
import RoomEditRoute from './RoomEditRoute';
import RoomIndexRoute from './RoomIndexRoute';
import RoomViewRoute from './RoomViewRoute';
import RoomJoinRoute from './RoomJoinRoute';
import SongSearchRoute from './SongSearchRoute';

const routes = [
  { Component: RoomIndexRoute, path: '/' },
  { Component: RoomCreateRoute, path: '/room/new' },
  { Component: RoomViewRoute, path: '/room/:id' },
  { Component: RoomJoinRoute, path: '/room/:id/join' },
  { Component: RoomEditRoute, path: '/room/:id/edit' },
  { Component: SongSearchRoute, path: '/room/:id/songs' },
];

export default routes;
