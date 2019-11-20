import strings from '../strings';

const translate = (key, params) => {
  let string = null;

  if (params) {
    string = strings[key](params);
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
