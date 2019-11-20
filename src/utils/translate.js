import strings from '../strings';

const translate = (key, params) => {
  let string = null;

  if (params) {
    if (typeof strings[key] === 'function') {
      string = strings[key](params);
    } else {
      throw new Error(
        `The string "${key}" must be a function when called with a second argument.`
      );
    }
  } else {
    string = strings[key];
  }

  if (string) {
    return string;
  } else {
    throw new Error(`The string "${key}" could not be found.`);
  }
};

export default translate;
