import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongSearchResults from '../components/SongSearchResults';
import t from '../utils/translate';

const SearchSongs = ({ room: { name: roomName, id: roomId } }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState(query);

  const onSubmit = e => {
    e.preventDefault();
    setSubmittedQuery(query);
  };

  const onChange = e => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const { current: input } = inputRef;
    if (input) {
      input.focus();
    }
  }, [inputRef]);

  return (
    <>
      <h2>{t('searchTitle', roomName)}</h2>
      <form onSubmit={onSubmit}>
        <label>
          <span>{t('searchLabel')}</span>
          <input
            onChange={onChange}
            ref={inputRef}
            type="search"
            value={query}
          />
        </label>
        <button>{t('searchButton')}</button>
      </form>
      <SongSearchResults query={submittedQuery} />
      <p>
        <Link to={`/room/${roomId}`}>{t('cancel')}</Link>
      </p>
    </>
  );
};

export default withAuthorizedRoom(SearchSongs);
