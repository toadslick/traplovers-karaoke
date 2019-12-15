import parseQuerySnapshot from '../utils/parseQuerySnapshot';

export default query => () => sendParent => {
  const update = snapshot => {
    const commands = parseQuerySnapshot(snapshot);
    if (commands.length) {
      sendParent(commands[0].key);
    }
  };

  query.get().then(update);
  return query.onSnapshot(update);
};
