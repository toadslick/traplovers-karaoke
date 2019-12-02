const parseQuerySnapshot = snapshot =>
  snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

// Whenever the Firebase selection of songs changes,
// this services sends an UPDATE_SONGS event to its parent,
// with an array of the new queue of songs.
export default query => () => sendParent => {
  const update = snapshot => {
    sendParent({
      type: 'UPDATE_SONGS',
      songs: parseQuerySnapshot(snapshot),
    });
  };

  query.get().then(update);

  // onSnapshot() returns a function to stop listening for events.
  // By returning that function from this service, this service can
  // stop listening when the parent machine reaches a final state.
  return query.onSnapshot(update);
};
