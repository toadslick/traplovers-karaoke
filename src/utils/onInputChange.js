const onInputChange = setter => e => {
  setter(e.target.value);
};

export default onInputChange;
