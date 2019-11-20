import React from 'react';
import { connect } from 'react-refetch';

import Loader from './Loader';
import SongSearchListItem from './SongSearchListItem';

const SongSearchList = ({ resultsFetch }) => {
  if (resultsFetch) {
    const { pending, rejected, fulfilled, value } = resultsFetch;

    // If the request is ongoing, display the loading indicator.
    if (pending) {
      return <Loader />;
      // Display an error message if the request has failed.
    } else if (rejected) {
      return <p>oh noes</p>;
      // If the request has succeeded and has results, display the search results.
    } else if (fulfilled && value.items && value.items.length) {
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

// Return different react-refetch configs depending on the current search query.
// If the search query is empty, return an empty result instead of making a request.
const buildFetchRequest = query => {
  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    const escapedQuery = encodeURI(`karaoke ${trimmedQuery}`);
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    // If react-refetch receives an object with `{ url, headers, etc }`
    // then it will make that HTTP request.
    return {
      url: `https://www.googleapis.com/youtube/v3/search?q=${escapedQuery}&key=${apiKey}&type=video&part=snippet&videoEmbeddable=true&maxResults=50`,
      headers: {
        Accept: 'application/json',
      },
    };
  }
  // If react-refetch receives an object with `{ value }`
  // then it will return that value instead of making a request.
  return {
    value: {
      items: [],
    },
  };
};

// This will add a `resultsFetch` prop to the SongSearchList component,
// with `pending`, `rejected`, and `fulfilled` booleans to know the state of the request
// and a `value` that is the result of the successful request.
export default connect(({ query }) => ({
  resultsFetch: buildFetchRequest(query),
}))(SongSearchList);
