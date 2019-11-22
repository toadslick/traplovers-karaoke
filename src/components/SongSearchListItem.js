import React, { useContext } from 'react';
import firebase from '@firebase/app';
import { withFirestore } from 'react-firestore';
import { useParams, useHistory } from 'react-router-dom';
import RoomAuthContext from '../contexts/RoomAuth';
import Unescape from './Unescape';
import { HD_VIDEO_RATIO } from '../utils/constants';

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

  // YouTube's `hqdefault` images always display in 4:3 aspect ratio with black bars
  // padding the space if the video is in a different aspect ratio.
  // To hide those bars on the top and bottom of images,
  // Here, we force the thumbnails to display in HD aspect ratio (16:9) and use the
  // `object-fit` CSS property to center the image and maintain it's proprotions.
  return (
    <li>
      <button onClick={onClick}>
        <img
          alt=""
          aria-hidden="true"
          height={thumbWidth * HD_VIDEO_RATIO}
          src={thumbUrl}
          style={{ objectFit: 'cover' }}
          width={thumbWidth}
        />
        <Unescape>{title}</Unescape>
      </button>
    </li>
  );
};

export default withFirestore(SongSearchListItem);
