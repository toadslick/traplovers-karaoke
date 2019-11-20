import React, { useContext } from 'react';
import firebase from '@firebase/app';
import { withFirestore } from 'react-firestore';
import { useParams, useHistory } from 'react-router-dom';
import RoomAuthContext from '../contexts/RoomAuth';

const SongSearchListItem = ({ firestore, video }) => {
  const { getRoomAuth } = useContext(RoomAuthContext);
  const { id: roomId } = useParams();
  const history = useHistory();

  const {
    id: { videoId },
    snippet: {
      title,
      thumbnails: {
        default: { url: thumbUrl, width: thumbWidth, height: thumbHeight },
      },
    },
  } = video;

  const onClick = e => {
    e.preventDefault();
    const room = firestore.collection('rooms').doc(roomId);
    room.update({
      songs: firebase.firestore.FieldValue.arrayUnion({
        singer: getRoomAuth().name,
        id: videoId,
        title,
      }),
    });
    history.push(`/room/${roomId}`);
  };

  return (
    <li>
      <button onClick={onClick}>
        <img
          alt=""
          aria-hidden="true"
          height={thumbHeight}
          src={thumbUrl}
          width={thumbWidth}
        />
        <span>{title}</span>
      </button>
    </li>
  );
};

export default withFirestore(SongSearchListItem);
