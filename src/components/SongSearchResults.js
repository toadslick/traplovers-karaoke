import React from 'react';
import { connect } from 'react-refetch';

import Loader from './Loader';
import SongSearchListItem from './SongSearchListItem';

const SongSearchList = ({ resultsFetch }) => {
  if (resultsFetch) {
    const { pending, rejected, fulfilled, value } = resultsFetch;
    if (pending) {
      return <Loader />;
    } else if (rejected) {
      return <p>oh noes</p>;
    } else if (fulfilled && value.items.length) {
      return (
        <ul>
          {value.items.map(video => (
            <SongSearchListItem key={video.id.videoId} video={video} />
          ))}
        </ul>
      );
    }
  }
  return null;
};

const buildFetchRequest = query => {
  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    const escapedQuery = encodeURI(`karaoke ${trimmedQuery}`);
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    return {
      url: `https://www.googleapis.com/youtube/v3/search?q=${escapedQuery}&key=${apiKey}&type=video&part=snippet&videoEmbeddable=true&maxResults=50`,
      headers: {
        Accept: 'application/json',
      },
    };
  }
  // If the search query is empty, return a mocked empty set instead of performing a search
  return {
    value: {
      items: [],
    },
  };
};

export default connect(({ query }) => ({
  resultsFetch: buildFetchRequest(query),
}))(SongSearchList);
