import React, { useContext } from 'react';
import { withFirestore } from 'react-firestore';
import { useParams, useHistory } from 'react-router-dom';
import RoomAuthContext from '../contexts/RoomAuth';
import Unescape from './Unescape';
import YouTubeThumbnail from './YouTubeThumbnail';
import FavoriteToggle from './FavoriteToggle';

const SongSearchListItem = ({ firestore, ytId, title }) => {
  const { getRoomAuth } = useContext(RoomAuthContext);
  const { id: roomId } = useParams();
  const history = useHistory();

  const onClick = e => {
    e.preventDefault();
    firestore.collection(`rooms/${roomId}/songs`).add({
      singer: getRoomAuth().name,
      ytId,
      created: Date.now(),
      title,
    });
    history.push(`/room/${roomId}`);
  };

  // YouTube's `hqdefault` images always display in 4:3 aspect ratio with black bars
  // padding the space if the video is in a different aspect ratio.
  // To hide those bars on the top and bottom of images,
  // Here, we force the thumbnails to display in HD aspect ratio (16:9) and use the
  // `object-fit` CSS property to center the image and maintain it's proprotions.
  return (
    <li>
      <button onClick={onClick}>
        <YouTubeThumbnail ytId={ytId} />
        <Unescape>{title}</Unescape>
      </button>
      <FavoriteToggle title={title} ytId={ytId} />
    </li>
  );
};

export default withFirestore(SongSearchListItem);
