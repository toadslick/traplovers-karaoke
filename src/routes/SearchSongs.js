import React, { useState, useRef, useEffect } from 'react';

import SongSearchResults from '../components/SongSearchResults';
import t from '../utils/translate';

const SearchSongs = () => {
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

export default SearchSongs;
