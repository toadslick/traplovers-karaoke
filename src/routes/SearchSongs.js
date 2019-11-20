import React, { useState, useRef, useEffect } from 'react';

import withAuthorizedRoom from '../components/withAuthorizedRoom';
import SongSearchResults from '../components/SongSearchResults';
import t from '../utils/translate';

const SearchSongs = ({ room }) => {
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
      <h1>{t('searchTitle', room.name)}</h1>
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
    </>
  );
};

export default withAuthorizedRoom(SearchSongs);
