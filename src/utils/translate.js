import strings from '../strings';

const translate = key => {
  const string = strings[key];
  if (string) {
    return string;
  } else {
    throw new Error(`The string ${key} could not be found.`);
  }
};

export default translate;
